"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// Type definitions for Pyodide
interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<unknown>;
  runPython: (code: string) => unknown;
  globals: {
    get: (name: string) => unknown;
    set: (name: string, value: unknown) => void;
  };
  setStdout: (options: { batched: (text: string) => void }) => void;
  setStderr: (options: { batched: (text: string) => void }) => void;
}

declare global {
  interface Window {
    loadPyodide?: (config?: { indexURL?: string }) => Promise<PyodideInterface>;
  }
}

export type PyodideStatus = "idle" | "loading" | "ready" | "error";

export interface PyodideState {
  status: PyodideStatus;
  error: string | null;
  pyodide: PyodideInterface | null;
}

export interface UsePyodideReturn extends PyodideState {
  runCode: (code: string, timeoutMs?: number) => Promise<ExecutionResult>;
  isReady: boolean;
  isLoading: boolean;
}

export interface ExecutionResult {
  success: boolean;
  output: string;
  error: string | null;
  returnValue: unknown;
}

// CDN URL for Pyodide
const PYODIDE_CDN = "https://cdn.jsdelivr.net/pyodide/v0.27.0/full/";

// Singleton to prevent multiple Pyodide loads
let pyodideInstance: PyodideInterface | null = null;
let pyodideLoadPromise: Promise<PyodideInterface> | null = null;

async function loadPyodideScript(): Promise<void> {
  if (typeof window === "undefined") return;
  // Check if loadPyodide is already loaded (not just declared)
  if (typeof window.loadPyodide === "function") return;

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `${PYODIDE_CDN}pyodide.js`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Pyodide script"));
    document.head.appendChild(script);
  });
}

async function initPyodide(): Promise<PyodideInterface> {
  if (pyodideInstance) return pyodideInstance;

  if (pyodideLoadPromise) return pyodideLoadPromise;

  pyodideLoadPromise = (async () => {
    await loadPyodideScript();

    // Safety check for loadPyodide
    if (!window.loadPyodide) {
      throw new Error("Pyodide script loaded but window.loadPyodide is not available");
    }

    const pyodide = await window.loadPyodide({
      indexURL: PYODIDE_CDN,
    });
    pyodideInstance = pyodide;
    return pyodide;
  })();

  return pyodideLoadPromise;
}

export function usePyodide(): UsePyodideReturn {
  const [state, setState] = useState<PyodideState>({
    status: "idle",
    error: null,
    pyodide: null,
  });

  const outputRef = useRef<string[]>([]);
  const errorRef = useRef<string[]>([]);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setState((prev) => ({ ...prev, status: "loading" }));

      try {
        const pyodide = await initPyodide();

        if (!mounted) return;

        setState({
          status: "ready",
          error: null,
          pyodide,
        });
      } catch (err) {
        if (!mounted) return;
        setState({
          status: "error",
          error: err instanceof Error ? err.message : "Failed to load Python runtime",
          pyodide: null,
        });
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  const runCode = useCallback(
    async (code: string, timeoutMs: number = 10000): Promise<ExecutionResult> => {
      if (!state.pyodide) {
        return {
          success: false,
          output: "",
          error: "Python runtime not loaded yet",
          returnValue: undefined,
        };
      }

      // Reset output buffers
      outputRef.current = [];
      errorRef.current = [];

      // Set up stdout/stderr capture
      state.pyodide.setStdout({
        batched: (text: string) => {
          outputRef.current.push(text);
        },
      });

      state.pyodide.setStderr({
        batched: (text: string) => {
          errorRef.current.push(text);
        },
      });

      // Create a timeout promise
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error(`Execution timed out after ${timeoutMs / 1000} seconds. Your code might have an infinite loop.`));
        }, timeoutMs);
      });

      try {
        // Run the code with timeout
        const resultPromise = state.pyodide.runPythonAsync(code);
        const result = await Promise.race([resultPromise, timeoutPromise]);

        return {
          success: true,
          output: outputRef.current.join(""),
          error: errorRef.current.length > 0 ? errorRef.current.join("") : null,
          returnValue: result,
        };
      } catch (err) {
        // Parse Python errors for better messages
        let errorMessage = err instanceof Error ? err.message : String(err);

        // Extract just the relevant part of Python tracebacks
        if (errorMessage.includes("Traceback")) {
          const lines = errorMessage.split("\n");
          const errorLine = lines.find(
            (line) =>
              line.includes("Error:") ||
              line.includes("Exception:") ||
              line.startsWith("    ")
          );
          if (errorLine) {
            // Get the last few lines which contain the actual error
            const relevantLines = lines.slice(-3).join("\n");
            errorMessage = relevantLines;
          }
        }

        return {
          success: false,
          output: outputRef.current.join(""),
          error: errorMessage,
          returnValue: undefined,
        };
      }
    },
    [state.pyodide]
  );

  return {
    ...state,
    runCode,
    isReady: state.status === "ready",
    isLoading: state.status === "loading",
  };
}

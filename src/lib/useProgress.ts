"use client";

import { useProgress as useGlobalProgress } from "../context/ProgressContext";

/**
 * Compatibility wrapper for the legacy useProgress hook.
 * Redirects all calls to the new global ProgressContext.
 */
export function useProgress() {
  const context = useGlobalProgress();

  return {
    ...context,
    // Provide legacy-compatible names if needed
    // (Most should match as I kept them consistent during consolidation)
    markComplete: context.markTopicComplete,
    markIncomplete: context.markTopicIncomplete,
    isComplete: context.isTopicComplete,
  };
}

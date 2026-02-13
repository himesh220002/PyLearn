"use client";

import { useCallback } from "react";
import Editor from "@monaco-editor/react";

type PythonEditorProps = {
  value: string;
  onChange?: (value: string) => void;
  height?: string | number;
  readOnly?: boolean;
};

export function PythonEditor({
  value,
  onChange,
  height = "100%",
  readOnly = false,
}: PythonEditorProps) {
  const handleChange = useCallback(
    (newValue?: string) => {
      if (onChange && typeof newValue === "string") {
        onChange(newValue);
      }
    },
    [onChange]
  );

  return (
    <Editor
      height={height}
      defaultLanguage="python"
      theme="vs-dark"
      value={value}
      onChange={handleChange}
      options={{
        readOnly,
        minimap: { enabled: false },
        fontSize: 14,
        smoothScrolling: true,
        scrollBeyondLastLine: false,
        wordWrap: "on",
      }}
    />
  );
}


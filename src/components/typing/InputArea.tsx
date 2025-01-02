import React from "react";

interface InputAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled: boolean;
  fontSize: number;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export const InputArea: React.FC<InputAreaProps> = ({
  value,
  onChange,
  disabled,
  fontSize,
  onKeyDown,
  inputRef,
}) => {
  return (
    <textarea
      ref={inputRef}
      value={value}
      onKeyDown={onKeyDown}
      onChange={onChange}
      disabled={disabled}
      style={{ fontSize: `${fontSize}px` }}
      className="w-full h-48 p-4 rounded-lg shadow font-mono resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
      placeholder={disabled ? "Test completed!" : "Start typing..."}
      autoCapitalize="off"
      autoComplete="off"
      autoCorrect="off"
      spellCheck="false"
      autoFocus
    />
  );
};

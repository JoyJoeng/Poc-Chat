"use client";

import { useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [text, setText] = useState("");

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="border-t border-[var(--ig-border)] bg-white px-3 flex items-center gap-2"
      style={{
        height: "calc(var(--ig-input-height) + var(--ig-safe-bottom))",
        paddingBottom: "var(--ig-safe-bottom)",
      }}
    >
      <div className="flex-1 flex items-center bg-[var(--ig-input-bg)] rounded-full pl-4 pr-1.5 py-1.5 min-h-[44px]">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="메세지 보내기"
          disabled={disabled}
          className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-[var(--ig-text-secondary)] disabled:opacity-50 min-w-0"
        />
        {text.trim() ? (
          <button
            type="button"
            onClick={handleSend}
            disabled={disabled}
            aria-label="보내기"
            className="shrink-0 flex items-center justify-center h-8 min-w-[44px] px-3 rounded-full bg-[var(--ig-send-purple)] hover:bg-[var(--ig-send-purple-hover)] active:scale-[0.97] transition-all disabled:opacity-50"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M1.1 21.8 23.8 12 1.1 2.2l-.004 8 13.8 1.8-13.8 1.8z"
                fill="white"
              />
            </svg>
          </button>
        ) : null}
      </div>
    </div>
  );
}

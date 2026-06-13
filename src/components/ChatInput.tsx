"use client";

import { useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  dark?: boolean;
}

export default function ChatInput({ onSend, disabled, dark = false }: ChatInputProps) {
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
      className={`border-t px-3 flex items-center gap-2 ${
        dark ? "border-[#333] bg-black" : "border-[var(--ig-border)] bg-white"
      }`}
      style={{
        height: "calc(var(--ig-input-height) + var(--ig-safe-bottom))",
        paddingBottom: "var(--ig-safe-bottom)",
      }}
    >
      <div
        className={`flex-1 flex items-center rounded-full pl-4 pr-1.5 py-1.5 min-h-[44px] ${
          dark ? "bg-[#262626]" : "bg-[var(--ig-input-bg)]"
        }`}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            dark
              ? "메세지 보내기, *는 행동으로 표현됩니다."
              : "메세지 보내기"
          }
          disabled={disabled}
          className={`flex-1 bg-transparent text-[15px] outline-none disabled:opacity-50 min-w-0 ${
            dark
              ? "text-white placeholder:text-[#777]"
              : "placeholder:text-[var(--ig-text-secondary)]"
          }`}
        />
        {text.trim() ? (
          <button
            type="button"
            onClick={handleSend}
            disabled={disabled}
            aria-label="보내기"
            className={`shrink-0 flex items-center justify-center h-8 min-w-[44px] px-3 rounded-full active:scale-[0.97] transition-all disabled:opacity-50 ${
              dark
                ? "bg-[var(--ig-story-send-bg)] hover:bg-[var(--ig-story-send-hover)]"
                : "bg-[var(--ig-send-purple)] hover:bg-[var(--ig-send-purple-hover)]"
            }`}
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

"use client";

import { useState, useRef, useEffect } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

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
      <button
        className="p-1 text-[var(--ig-text)] shrink-0"
        aria-label="카메라"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="12"
            cy="13"
            r="4"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </button>

      <div className="flex-1 flex items-center bg-[var(--ig-input-bg)] rounded-full px-4 py-2 min-h-[44px]">
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="메시지 보내기..."
          disabled={disabled}
          className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-[var(--ig-text-secondary)] disabled:opacity-50"
        />
        {text.trim() ? (
          <button
            onClick={handleSend}
            disabled={disabled}
            className="text-[var(--ig-blue)] font-semibold text-[15px] shrink-0 ml-2 disabled:opacity-50"
          >
            보내기
          </button>
        ) : (
          <div className="flex items-center gap-3 ml-2 shrink-0">
            <button className="text-[var(--ig-text)]" aria-label="음성 메시지">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <button className="text-[var(--ig-text)]" aria-label="사진">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle
                  cx="8.5"
                  cy="8.5"
                  r="1.5"
                  fill="currentColor"
                />
                <path
                  d="M21 15l-5-5L5 21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="text-[var(--ig-text)]" aria-label="스티커">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M8 14s1.5 2 4 2 4-2 4-2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="9" cy="9" r="1" fill="currentColor" />
                <circle cx="15" cy="9" r="1" fill="currentColor" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {!text.trim() && (
        <button className="p-1 text-[var(--ig-text)] shrink-0" aria-label="좋아요">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

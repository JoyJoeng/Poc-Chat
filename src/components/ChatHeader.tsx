"use client";

import Link from "next/link";
import Avatar from "./Avatar";

interface ChatHeaderProps {
  characterId: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  isOnline: boolean;
}

export default function ChatHeader({
  characterId,
  username,
  displayName,
  avatarUrl,
  isOnline,
}: ChatHeaderProps) {
  return (
    <header
      className="flex items-center justify-between px-2 border-b border-[var(--ig-border)] bg-white"
      style={{ height: "var(--ig-header-height)" }}
    >
      <div className="flex items-center gap-1 min-w-0 flex-1">
        <Link
          href="/"
          className="p-2 -ml-1 text-[var(--ig-text)] hover:opacity-70 transition-opacity"
          aria-label="뒤로 가기"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        <Link
          href={`/profile/${characterId}`}
          className="flex items-center gap-3 min-w-0 hover:opacity-80 transition-opacity"
        >
          <Avatar
            src={avatarUrl}
            alt={displayName}
            size="sm"
            showOnline
            isOnline={isOnline}
          />
          <div className="min-w-0">
            <p className="text-[15px] font-semibold truncate leading-tight">
              {username}
            </p>
            <p className="text-xs text-[var(--ig-text-secondary)] leading-tight">
              {isOnline ? "Active now" : "Active 2h ago"}
            </p>
          </div>
        </Link>
      </div>

      <div className="flex items-center shrink-0">
        <button
          className="p-2 text-[var(--ig-text)] hover:opacity-70 transition-opacity"
          aria-label="음성 통화"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          className="p-2 text-[var(--ig-text)] hover:opacity-70 transition-opacity"
          aria-label="영상 통화"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M23 7l-7 5 7 5V7z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="1"
              y="5"
              width="15"
              height="14"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </button>
        <button
          className="p-2 text-[var(--ig-text)] hover:opacity-70 transition-opacity"
          aria-label="정보"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="5" r="1.5" fill="currentColor" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            <circle cx="12" cy="19" r="1.5" fill="currentColor" />
          </svg>
        </button>
      </div>
    </header>
  );
}

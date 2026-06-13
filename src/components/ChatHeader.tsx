"use client";

import Link from "next/link";
import Avatar from "./Avatar";

interface ChatHeaderProps {
  characterId: string;
  username: string;
  displayName: string;
  storyLabel: string;
  avatarUrl: string;
  isOnline: boolean;
  onReset: () => void;
  resetDisabled?: boolean;
  isStoryMode?: boolean;
}

export default function ChatHeader({
  characterId,
  username,
  displayName,
  storyLabel,
  avatarUrl,
  isOnline,
  onReset,
  resetDisabled = false,
  isStoryMode = false,
}: ChatHeaderProps) {
  return (
    <header
      className={`shrink-0 flex items-center justify-between px-2 border-b h-[var(--ig-header-height)] min-h-[var(--ig-header-height)] max-h-[var(--ig-header-height)] ${
        isStoryMode
          ? "border-[#333] bg-black"
          : "border-[var(--ig-border)] bg-white"
      }`}
    >
      <div className="flex items-center gap-1 min-w-0 flex-1">
        <Link
          href="/"
          className={`p-2 -ml-1 hover:opacity-70 transition-opacity ${
            isStoryMode ? "text-white" : "text-[var(--ig-text)]"
          }`}
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
            size="xs"
            showOnline={!isStoryMode}
            isOnline={isOnline}
          />
          {isStoryMode ? (
            <p className="min-w-0 text-[15px] font-semibold truncate leading-none text-white">
              {storyLabel}
            </p>
          ) : (
            <div className="min-w-0 h-[34px] flex flex-col justify-center">
              <p className="text-[15px] font-semibold truncate leading-tight">
                {username}
              </p>
              <p className="text-xs text-[var(--ig-text-secondary)] leading-tight">
                {isOnline ? "Active now" : "Active 2h ago"}
              </p>
            </div>
          )}
        </Link>
      </div>

      <button
        type="button"
        onClick={onReset}
        disabled={resetDisabled}
        aria-label="대화 초기화"
        className={`shrink-0 flex items-center gap-1.5 mr-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors disabled:opacity-40 disabled:pointer-events-none ${
          isStoryMode
            ? "bg-[#262626] text-white hover:bg-[#333] active:bg-[#3a3a3a]"
            : "bg-[#efefef] text-[var(--ig-text)] hover:bg-[#e4e4e4] active:bg-[#dcdcdc]"
        }`}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
        대화 초기화
      </button>
    </header>
  );
}

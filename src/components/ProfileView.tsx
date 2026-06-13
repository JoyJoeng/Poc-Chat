"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { Character, ProfilePost } from "@/types";

interface ProfileViewProps {
  character: Character;
}

type ProfileTab = "grid" | "reels" | "tagged";

function formatCount(n: number): string {
  return n.toLocaleString("ko-KR");
}

function PostGrid({
  characterId,
  posts,
}: {
  characterId: string;
  posts: { post: ProfilePost; index: number }[];
}) {
  return (
    <div className="grid grid-cols-3 gap-[2px] w-full">
      {posts.map(({ post, index }) => (
        <Link
          key={index}
          href={`/profile/${characterId}/p/${index}`}
          className="relative aspect-square bg-gray-100 overflow-hidden active:opacity-80"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.imageUrl}
            alt={`게시물 ${index + 1}`}
            className="w-full h-full object-cover"
          />
          {post.isCarousel && (
            <div className="absolute top-2 right-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="white"
                className="drop-shadow"
              >
                <rect x="3" y="6" width="14" height="14" rx="1" opacity="0.9" />
                <rect x="7" y="4" width="14" height="14" rx="1" opacity="0.7" />
              </svg>
            </div>
          )}
          {post.isReel && (
            <div className="absolute top-2 right-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="white"
                className="drop-shadow"
              >
                <rect x="2" y="2" width="20" height="20" rx="3" opacity="0.8" />
                <path d="M10 8l6 4-6 4V8z" />
              </svg>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}

function TabEmptyState({
  icon,
  message,
}: {
  icon: ReactNode;
  message: string;
}) {
  return (
    <div className="w-full bg-white py-20">
      <div className="flex flex-col items-center justify-center px-8">
        <div className="w-[62px] h-[62px] rounded-full border-2 border-[var(--ig-text)] flex items-center justify-center mb-4">
          {icon}
        </div>
        <p className="text-[20px] font-bold text-[var(--ig-text)] text-center">
          {message}
        </p>
      </div>
    </div>
  );
}

const REELS_EMPTY_ICON = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 14l4 2-4 2v-4z" fill="currentColor" />
  </svg>
);

const TAGGED_EMPTY_ICON = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 8a3 3 0 100 6 3 3 0 000-6z" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M7 18c0-2.5 2.2-4 5-4s5 1.5 5 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default function ProfileView({ character }: ProfileViewProps) {
  const { profile } = character;
  const [activeTab, setActiveTab] = useState<ProfileTab>("grid");

  const allPosts = profile.posts.map((post, index) => ({ post, index }));

  const tabs = [
    {
      id: "grid" as const,
      label: "게시물",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
          <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
          <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
          <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      id: "reels" as const,
      label: "릴스",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" />
          <path d="M2 8.5h20M8 2v6M16 2v6" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 14l4 2-4 2v-4z" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: "tagged" as const,
      label: "태그됨",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 8a3 3 0 100 6 3 3 0 000-6z" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M7 18c0-2.5 2.2-4 5-4s5 1.5 5 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full w-full bg-white">
      <header
        className="flex items-center justify-center w-full px-4 border-b border-[var(--ig-border)] shrink-0"
        style={{ height: "var(--ig-header-height)" }}
      >
        <h1 className="text-[16px] font-semibold truncate">{profile.username}</h1>
      </header>

      <div className="flex-1 w-full overflow-y-auto hide-scrollbar">
        <div
          className={`w-full px-4 pb-3 ${profile.noteBubble ? "pt-9" : "pt-5"}`}
        >
          <div className="flex items-start gap-8 w-full">
            {/* 프로필 사진 */}
            <div className="relative shrink-0">
              {profile.noteBubble && (
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap">
                  <div className="relative bg-white border border-[var(--ig-border)] rounded-2xl px-2.5 py-1 shadow-sm">
                    <p className="text-[11px] text-[var(--ig-text)]">
                      {profile.noteBubble}
                    </p>
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-r border-b border-[var(--ig-border)] rotate-45" />
                  </div>
                </div>
              )}
              <div className="relative w-[77px] h-[77px]">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#efefef]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={profile.avatarUrl}
                    alt={profile.username}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* 이름 + 통계 */}
            <div className="flex-1 min-w-0 pt-0.5">
              <p className="text-[15px] font-bold leading-tight">
                {character.displayName}
              </p>
              <div className="grid grid-cols-3 w-full mt-3">
                <div>
                  <p className="text-[16px] font-semibold leading-tight">
                    {formatCount(profile.postCount)}
                  </p>
                  <p className="text-[13px] text-[var(--ig-text)] mt-0.5">게시물</p>
                </div>
                <div>
                  <p className="text-[16px] font-semibold leading-tight">
                    {formatCount(profile.followerCount)}
                  </p>
                  <p className="text-[13px] text-[var(--ig-text)] mt-0.5">팔로워</p>
                </div>
                <div>
                  <p className="text-[16px] font-semibold leading-tight">
                    {formatCount(profile.followingCount)}
                  </p>
                  <p className="text-[13px] text-[var(--ig-text)] mt-0.5">팔로잉</p>
                </div>
              </div>
            </div>
          </div>

          {(profile.occupation || profile.bio || profile.linkText) && (
            <div className="mt-3">
              {profile.occupation && (
                <p className="text-[14px] text-[var(--ig-text-secondary)] leading-snug">
                  {profile.occupation}
                </p>
              )}
              {profile.bio && (
                <p
                  className={`text-[14px] text-[var(--ig-text)] whitespace-pre-line leading-snug ${
                    profile.occupation ? "mt-0.5" : ""
                  }`}
                >
                  {profile.bio}
                </p>
              )}
              {profile.linkText && (
                <div className="flex items-center gap-1 mt-1">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-[var(--ig-blue)] shrink-0"
                  >
                    <path
                      d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[14px] font-semibold text-[var(--ig-blue)]">
                    {profile.linkText}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 px-4 pb-3 w-full">
          <button className="flex-1 h-[30px] bg-[var(--ig-blue)] text-white text-[14px] font-semibold rounded-lg">
            팔로우
          </button>
          <Link
            href={`/chat/${character.id}`}
            className="flex-1 h-[30px] bg-[#efefef] text-[var(--ig-text)] text-[14px] font-semibold rounded-lg flex items-center justify-center"
          >
            메시지
          </Link>
          <button
            className="w-[30px] h-[30px] bg-[#efefef] rounded-lg flex items-center justify-center shrink-0"
            aria-label="사람 찾기"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
              <path
                d="M19 8v6M22 11h-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="flex w-full border-t border-[var(--ig-border)] bg-white">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center py-3 border-b-2 ${
                activeTab === tab.id
                  ? "border-[var(--ig-text)] text-[var(--ig-text)]"
                  : "border-transparent text-[var(--ig-text-secondary)]"
              }`}
              aria-label={tab.label}
            >
              {tab.icon}
            </button>
          ))}
        </div>

        <div className="w-full">
          {activeTab === "grid" && (
            <PostGrid characterId={character.id} posts={allPosts} />
          )}
          {activeTab === "reels" && (
            <TabEmptyState icon={REELS_EMPTY_ICON} message="릴스 없음" />
          )}
          {activeTab === "tagged" && (
            <TabEmptyState icon={TAGGED_EMPTY_ICON} message="사진 없음" />
          )}
        </div>
      </div>
    </div>
  );
}

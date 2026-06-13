"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { Character } from "@/types";

interface PostDetailViewProps {
  character: Character;
  postIndex: number;
}

function formatLikeCount(n: number): string {
  return n.toLocaleString("ko-KR");
}

export default function PostDetailView({
  character,
  postIndex,
}: PostDetailViewProps) {
  const { profile } = character;
  const post = profile.posts[postIndex];
  const images = post.images?.length ? post.images : [post.imageUrl];
  const [imageIndex, setImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);

  const likeCount = (post.likeCount ?? 0) + (liked ? 1 : 0);

  const goToImage = useCallback(
    (direction: "prev" | "next") => {
      setImageIndex((current) => {
        if (direction === "prev") return Math.max(0, current - 1);
        return Math.min(images.length - 1, current + 1);
      });
    },
    [images.length]
  );

  if (!post) return null;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* 헤더 */}
      <header
        className="flex items-center px-2 border-b border-[var(--ig-border)] shrink-0"
        style={{ height: "var(--ig-header-height)" }}
      >
        <Link
          href={`/profile/${character.id}`}
          className="p-2 text-[var(--ig-text)]"
          aria-label="뒤로"
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
          href={`/profile/${character.id}`}
          className="flex items-center gap-2 min-w-0"
        >
          <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-200 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.avatarUrl}
              alt={profile.username}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-[14px] font-semibold truncate">
            {profile.username}
          </span>
        </Link>
      </header>

      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {/* 이미지 */}
        <div className="relative w-full aspect-square bg-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[imageIndex]}
            alt={`게시물 ${postIndex + 1}`}
            className="w-full h-full object-contain"
          />

          {images.length > 1 && imageIndex > 0 && (
            <button
              onClick={() => goToImage("prev")}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/80 rounded-full flex items-center justify-center shadow"
              aria-label="이전 사진"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
          {images.length > 1 && imageIndex < images.length - 1 && (
            <button
              onClick={() => goToImage("next")}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/80 rounded-full flex items-center justify-center shadow"
              aria-label="다음 사진"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18l6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}

          {images.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${
                    i === imageIndex ? "bg-[var(--ig-blue)]" : "bg-white/60"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* 좋아요 버튼 */}
        <div className="px-3 py-2.5">
          <button onClick={() => setLiked(!liked)} aria-label="좋아요">
            {liked ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#ed4956">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            )}
          </button>
        </div>

        {/* 좋아요 수 */}
        {likeCount > 0 && (
          <p className="px-3 text-[14px] font-semibold">
            좋아요 {formatLikeCount(likeCount)}개
          </p>
        )}

        {/* 캡션 */}
        {post.caption && (
          <p className="px-3 pt-1.5 text-[14px] leading-snug">
            <span className="font-semibold mr-1.5">{profile.username}</span>
            {post.caption}
          </p>
        )}

        {/* 댓글 */}
        {post.comments && post.comments.length > 0 && (
          <div className="px-3 pt-2 pb-1 space-y-1">
            {post.comments.map((comment, i) => (
              <p key={i} className="text-[14px] leading-snug">
                <span className="font-semibold mr-1.5">{comment.username}</span>
                {comment.text}
              </p>
            ))}
          </div>
        )}

        {/* 게시 시간 */}
        {post.postedAt && (
          <p className="px-3 pt-2 pb-4 text-[11px] text-[var(--ig-text-secondary)] uppercase tracking-wide">
            {post.postedAt}
          </p>
        )}
      </div>
    </div>
  );
}

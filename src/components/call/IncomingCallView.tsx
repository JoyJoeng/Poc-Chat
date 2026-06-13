"use client";

interface IncomingCallViewProps {
  username: string;
  displayName: string;
  avatarUrl: string;
  onDecline: () => void;
  onAccept: () => void;
  responseDisabled?: boolean;
}

export default function IncomingCallView({
  username,
  displayName,
  avatarUrl,
  onDecline,
  onAccept,
  responseDisabled = false,
}: IncomingCallViewProps) {
  return (
    <div className="absolute inset-0 z-50">
      {/* DM 창 위 어둡고 흐릿한 오버레이 — 상호작용 차단 */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xl"
        aria-hidden
      />

      {/* 가려진 화면 중앙 안내 문구 */}
      <div className="absolute inset-0 z-[5] flex items-center justify-center px-8 pointer-events-none">
        <p className="max-w-[280px] text-center text-sm font-semibold leading-relaxed text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.75)]">
          안내문구가 들어갈 자리
        </p>
      </div>

      {/* 상단 플로팅 수신 전화 배너 */}
      <div className="absolute top-3 left-3 right-3 z-10">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-full bg-[#1c1c1e]/92 shadow-[0_8px_32px_rgba(0,0,0,0.45)] border border-white/10">
          <div className="relative shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarUrl}
              alt={displayName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="absolute -bottom-0.5 -right-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-white ring-1 ring-black/10">
              <svg width="10" height="10" viewBox="0 0 24 24" aria-hidden>
                <defs>
                  <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#feda75" />
                    <stop offset="25%" stopColor="#fa7e1e" />
                    <stop offset="50%" stopColor="#d62976" />
                    <stop offset="75%" stopColor="#962fbf" />
                    <stop offset="100%" stopColor="#4f5bd5" />
                  </linearGradient>
                </defs>
                <rect width="24" height="24" rx="6" fill="url(#ig-grad)" />
                <circle cx="12" cy="12" r="4.5" fill="none" stroke="white" strokeWidth="2" />
                <circle cx="17.2" cy="6.8" r="1.2" fill="white" />
              </svg>
            </span>
          </div>

          <div className="flex-1 min-w-0 text-white">
            <p className="text-[13px] leading-tight text-white/90">
              Instagram Video
            </p>
            <p className="text-[15px] font-semibold leading-tight truncate">
              [{username}] {displayName.split(" ").pop()}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onDecline}
              disabled={responseDisabled}
              aria-label="거절"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-[#ff3b30] hover:bg-[#e6352b] transition-colors disabled:opacity-50"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={onAccept}
              disabled={responseDisabled}
              aria-label="수락"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-[#007aff] hover:bg-[#0066d6] transition-colors disabled:opacity-50"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M5 13l4 4L19 7"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

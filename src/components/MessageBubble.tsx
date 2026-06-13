import { Message } from "@/types";

interface MessageBubbleProps {
  message: Message;
  showAvatar?: boolean;
  avatarUrl?: string;
  avatarAlt?: string;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("ko-KR", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default function MessageBubble({
  message,
  showAvatar = false,
  avatarUrl,
  avatarAlt,
}: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`message-enter flex items-end gap-2 px-4 ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {!isUser && (
        <div className="w-7 shrink-0">
          {showAvatar && avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
              alt={avatarAlt ?? ""}
              className="w-7 h-7 rounded-full object-cover"
            />
          ) : (
            <div className="w-7" />
          )}
        </div>
      )}

      <div
        className={`max-w-[75%] flex flex-col ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`px-4 py-2.5 rounded-[22px] text-[15px] leading-[1.35] break-words ${
            isUser
              ? "bg-[var(--ig-send-purple)] text-white rounded-br-[4px]"
              : "bg-[var(--ig-bubble-received)] text-[var(--ig-text)] rounded-bl-[4px]"
          } ${message.status === "sending" ? "opacity-60" : ""}`}
        >
          {message.content}
        </div>
        {message.status === "error" && (
          <span className="text-xs text-red-500 mt-1">전송 실패 · 탭하여 재시도</span>
        )}
      </div>
    </div>
  );
}

export function TimestampDivider({
  label,
  dark = false,
}: {
  label: string;
  dark?: boolean;
}) {
  return (
    <div className="flex justify-center py-4">
      <span
        className={`text-xs font-medium ${
          dark ? "text-[#666]" : "text-[var(--ig-text-secondary)]"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export function formatDateDivider(date: Date): string {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return "오늘";
  if (date.toDateString() === yesterday.toDateString()) return "어제";

  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

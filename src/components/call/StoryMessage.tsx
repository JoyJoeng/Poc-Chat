import { Message } from "@/types";
import { parseUserStoryMessage } from "@/lib/features/call/story-parser";

interface StoryActionLineProps {
  message: Message;
}

export function StoryActionLine({ message }: StoryActionLineProps) {
  return (
    <div className="message-enter px-4">
      <div className="flex items-start gap-2">
        <div className="w-7 shrink-0" />
        <p className="max-w-[75%] text-[15px] leading-relaxed text-[#9a9a9a] whitespace-pre-line">
          {message.content}
        </p>
      </div>
    </div>
  );
}

interface StoryDialogueBubbleProps {
  message: Message;
  showAvatar: boolean;
  avatarUrl: string;
  avatarAlt: string;
  characterLabel: string;
}

export function StoryDialogueBubble({
  message,
  showAvatar,
  avatarUrl,
  avatarAlt,
  characterLabel,
}: StoryDialogueBubbleProps) {
  return (
    <div className="message-enter px-4">
      <div className="flex items-end gap-2">
        <div className="w-7 shrink-0">
          {showAvatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
              alt={avatarAlt}
              className="w-7 h-7 rounded-full object-cover"
            />
          ) : (
            <div className="w-7" />
          )}
        </div>
        <div className="max-w-[75%] flex flex-col items-start">
          {showAvatar && (
            <p className="text-[13px] font-semibold text-white mb-1 ml-1">
              {characterLabel}
            </p>
          )}
          <div
            className={`px-4 py-2.5 rounded-[22px] rounded-bl-[4px] text-[15px] leading-[1.35] break-words bg-[var(--ig-story-bubble)] text-white ${
              message.status === "sending" ? "opacity-60" : ""
            }`}
          >
            {message.content}
          </div>
        </div>
      </div>
    </div>
  );
}

export function StoryModeDivider() {
  return (
    <div className="px-4 py-5">
      <div className="border-t border-[#555]" />
    </div>
  );
}

interface StoryUserMessageProps {
  message: Message;
}

export function StoryUserMessage({ message }: StoryUserMessageProps) {
  const segments = parseUserStoryMessage(message.content);

  return (
    <div className="message-enter px-4 flex flex-col items-end gap-1.5">
      {segments.map((segment, index) =>
        segment.type === "action" ? (
          <p
            key={index}
            className="max-w-[75%] text-[15px] leading-relaxed text-[#9a9a9a] text-right whitespace-pre-line"
          >
            {segment.content}
          </p>
        ) : (
          <div
            key={index}
            className={`max-w-[75%] px-4 py-2.5 rounded-[22px] rounded-br-[4px] text-[15px] leading-[1.35] break-words bg-[var(--ig-story-bubble-user)] text-white ${
              message.status === "sending" ? "opacity-60" : ""
            }`}
          >
            {segment.content}
          </div>
        )
      )}
      {message.status === "error" && (
        <span className="text-xs text-red-500 mt-1">전송 실패 · 탭하여 재시도</span>
      )}
    </div>
  );
}

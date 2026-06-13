interface TypingIndicatorProps {
  dark?: boolean;
  className?: string;
}

export default function TypingIndicator({
  dark = false,
  className = "",
}: TypingIndicatorProps) {
  return (
    <div
      className={`flex items-end gap-2 px-4 message-enter ${className}`}
    >
      <div className="w-7" />
      <div
        className={`rounded-[22px] rounded-bl-[4px] px-4 py-3 flex items-center gap-1 ${
          dark ? "bg-[#262626]" : "bg-[var(--ig-bubble-received)]"
        }`}
      >
        <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full" />
        <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full" />
        <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full" />
      </div>
    </div>
  );
}

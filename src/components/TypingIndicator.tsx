export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 px-4 message-enter">
      <div className="w-7" />
      <div className="bg-[var(--ig-bubble-received)] rounded-[22px] rounded-bl-[4px] px-4 py-3 flex items-center gap-1">
        <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full" />
        <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full" />
        <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full" />
      </div>
    </div>
  );
}

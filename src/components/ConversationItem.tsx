import Link from "next/link";
import Avatar from "./Avatar";
import { Character } from "@/types";

interface ConversationItemProps {
  character: Character;
  lastMessage?: string;
  lastMessageTime?: string;
  unread?: boolean;
}

export default function ConversationItem({
  character,
  lastMessage = "메시지를내보세요!",
  lastMessageTime = "지금",
  unread = false,
}: ConversationItemProps) {
  return (
    <Link
      href={`/chat/${character.id}`}
      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 active:bg-gray-100 transition-colors"
    >
      <Avatar
        src={character.profile.avatarUrl}
        alt={character.displayName}
        size="md"
        showOnline
        isOnline={character.isOnline}
      />

      <div className="flex-1 min-w-0 border-b border-[var(--ig-border)] pb-3 -mb-px">
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-[15px] truncate">
            {character.profile.username}
          </span>
          <span
            className={`text-xs shrink-0 ${
              unread ? "text-[var(--ig-blue)] font-semibold" : "text-[var(--ig-text-secondary)]"
            }`}
          >
            {lastMessageTime}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <p
            className={`text-sm truncate ${
              unread
                ? "text-[var(--ig-text)] font-semibold"
                : "text-[var(--ig-text-secondary)]"
            }`}
          >
            {lastMessage}
          </p>
          {unread && (
            <span className="w-2 h-2 bg-[var(--ig-blue)] rounded-full shrink-0" />
          )}
        </div>
      </div>
    </Link>
  );
}

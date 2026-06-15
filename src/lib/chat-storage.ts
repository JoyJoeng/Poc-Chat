import { Message } from "@/types";

const STORAGE_PREFIX = "dm-messages:";

type StoredMessage = Omit<Message, "timestamp"> & { timestamp: string };

function storageKey(characterId: string) {
  return `${STORAGE_PREFIX}${characterId}`;
}

export function loadChatMessages(characterId: string): Message[] | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = sessionStorage.getItem(storageKey(characterId));
    if (!raw) return null;

    const parsed = JSON.parse(raw) as StoredMessage[];
    return parsed.map((message) => ({
      ...message,
      timestamp: new Date(message.timestamp),
    }));
  } catch {
    return null;
  }
}

export function saveChatMessages(characterId: string, messages: Message[]) {
  if (typeof window === "undefined") return;

  try {
    const toStore = messages
      .filter((message) => message.status !== "sending")
      .map((message) => ({
        ...message,
        timestamp: message.timestamp.toISOString(),
      }));

    sessionStorage.setItem(storageKey(characterId), JSON.stringify(toStore));
  } catch {
    // storage quota 등 무시
  }
}

export function clearChatMessages(characterId: string) {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.removeItem(storageKey(characterId));
  } catch {
    // 무시
  }
}

export function createWelcomeMessages(welcomeMessages?: string[]): Message[] {
  if (!welcomeMessages?.length) return [];

  const now = Date.now();
  return welcomeMessages.map((content, index) => ({
    id: `${now}-welcome-${index}`,
    role: "assistant" as const,
    content,
    timestamp: new Date(now - (welcomeMessages.length - index) * 45_000),
    status: "sent" as const,
  }));
}

export function getInitialChatMessages(
  characterId: string,
  welcomeMessages?: string[]
): Message[] {
  const stored = loadChatMessages(characterId);

  // 유저가 아직 보낸 메시지가 없으면 welcomeMessages 설정을 항상 최신으로 반영
  if (stored && stored.length > 0) {
    const hasUserMessage = stored.some((message) => message.role === "user");
    if (hasUserMessage) return stored;
  }

  return createWelcomeMessages(welcomeMessages);
}

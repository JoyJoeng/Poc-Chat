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

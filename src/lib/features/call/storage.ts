import type { CallChatMessage } from "./config";

const INTERACTIONS_PREFIX = "call-interactions:";
const TRIGGERED_PREFIX = "call-triggered:";
const INCOMING_PREFIX = "call-incoming:";
const STORY_MODE_PREFIX = "call-story-mode:";
const API_HISTORY_PREFIX = "call-api-history:";

function interactionsKey(characterId: string) {
  return `${INTERACTIONS_PREFIX}${characterId}`;
}

function triggeredKey(characterId: string) {
  return `${TRIGGERED_PREFIX}${characterId}`;
}

function incomingKey(characterId: string) {
  return `${INCOMING_PREFIX}${characterId}`;
}

function storyModeKey(characterId: string) {
  return `${STORY_MODE_PREFIX}${characterId}`;
}

function apiHistoryKey(characterId: string) {
  return `${API_HISTORY_PREFIX}${characterId}`;
}

export function getInteractionCount(characterId: string): number {
  if (typeof window === "undefined") return 0;

  try {
    const raw = sessionStorage.getItem(interactionsKey(characterId));
    return raw ? Number.parseInt(raw, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

export function setInteractionCount(characterId: string, count: number) {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.setItem(interactionsKey(characterId), String(count));
  } catch {
    // 무시
  }
}

export function incrementInteractionCount(characterId: string): number {
  const next = getInteractionCount(characterId) + 1;
  setInteractionCount(characterId, next);
  return next;
}

export function isCallTriggered(characterId: string): boolean {
  if (typeof window === "undefined") return false;

  try {
    return sessionStorage.getItem(triggeredKey(characterId)) === "1";
  } catch {
    return false;
  }
}

export function setCallTriggered(characterId: string) {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.setItem(triggeredKey(characterId), "1");
  } catch {
    // 무시
  }
}

export function isIncomingCallActive(characterId: string): boolean {
  if (typeof window === "undefined") return false;

  try {
    return sessionStorage.getItem(incomingKey(characterId)) === "1";
  } catch {
    return false;
  }
}

export function setIncomingCallActive(characterId: string, active: boolean) {
  if (typeof window === "undefined") return;

  try {
    if (active) {
      sessionStorage.setItem(incomingKey(characterId), "1");
    } else {
      sessionStorage.removeItem(incomingKey(characterId));
    }
  } catch {
    // 무시
  }
}

export function isStoryModeActive(characterId: string): boolean {
  if (typeof window === "undefined") return false;

  try {
    return sessionStorage.getItem(storyModeKey(characterId)) === "1";
  } catch {
    return false;
  }
}

export function setStoryModeActive(characterId: string, active: boolean) {
  if (typeof window === "undefined") return;

  try {
    if (active) {
      sessionStorage.setItem(storyModeKey(characterId), "1");
    } else {
      sessionStorage.removeItem(storyModeKey(characterId));
    }
  } catch {
    // 무시
  }
}

export function setCallApiHistory(
  characterId: string,
  history: CallChatMessage[]
) {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.setItem(apiHistoryKey(characterId), JSON.stringify(history));
  } catch {
    // 무시
  }
}

export function getCallApiHistory(characterId: string): CallChatMessage[] | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = sessionStorage.getItem(apiHistoryKey(characterId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CallChatMessage[];
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function clearCallState(characterId: string) {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.removeItem(interactionsKey(characterId));
    sessionStorage.removeItem(triggeredKey(characterId));
    sessionStorage.removeItem(incomingKey(characterId));
    sessionStorage.removeItem(storyModeKey(characterId));
    sessionStorage.removeItem(apiHistoryKey(characterId));
  } catch {
    // 무시
  }
}

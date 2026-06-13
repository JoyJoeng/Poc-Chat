import type { CallUserResponse } from "./config";

type ChatHistoryItem = { role: "user" | "assistant"; content: string };

async function fetchCallApiReply(
  characterId: string,
  messages: ChatHistoryItem[],
  mode: "call-trigger" | "call-response",
  callResponse?: CallUserResponse
): Promise<string> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      characterId,
      messages,
      mode,
      ...(callResponse ? { callResponse } : {}),
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "전화 API 요청 실패");
  }

  return data.reply;
}

export async function fetchCallTriggerReply(
  characterId: string,
  messages: ChatHistoryItem[]
): Promise<string> {
  return fetchCallApiReply(characterId, messages, "call-trigger");
}

export async function fetchCallResponseReply(
  characterId: string,
  messages: ChatHistoryItem[],
  callResponse: CallUserResponse
): Promise<string> {
  return fetchCallApiReply(characterId, messages, "call-response", callResponse);
}

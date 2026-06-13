import { CALL_TRIGGER_MESSAGE, callFeatureConfig, isCallFeatureEnabled, type CallChatMessage } from "./config";
import { getInteractionCount, incrementInteractionCount, isCallTriggered } from "./storage";

export type { CallChatMessage };

export interface CallTriggerContext {
  characterId: string;
  interactionCount: number;
}

/** call-trigger API에 실제로 전달된 대화 + logerstart + 캐릭터 응답 */
export function buildCallTriggerApiHistory(
  visibleHistory: CallChatMessage[],
  assistantParts: string[]
): CallChatMessage[] {
  return [
    ...visibleHistory,
    { role: "user", content: CALL_TRIGGER_MESSAGE },
    ...assistantParts.map((content) => ({
      role: "assistant" as const,
      content,
    })),
  ];
}

/** 유저 메시지 → API 응답 → 캐릭터 메시지 표시까지 완료된 DM 상호작용 1회 기록 */
export function recordCompletedDmInteraction(characterId: string): {
  interactionCount: number;
  shouldTriggerCall: boolean;
} {
  if (!isCallFeatureEnabled() || isCallTriggered(characterId)) {
    return {
      interactionCount: getInteractionCount(characterId),
      shouldTriggerCall: false,
    };
  }

  const interactionCount = incrementInteractionCount(characterId);

  return {
    interactionCount,
    shouldTriggerCall:
      interactionCount >= callFeatureConfig.interactionThreshold,
  };
}

/** 이번 상호작용 완료 후 전화 트리거를 실행할지 판단 */
export function shouldTriggerCall({
  characterId,
  interactionCount,
}: CallTriggerContext): boolean {
  if (!isCallFeatureEnabled()) return false;
  if (isCallTriggered(characterId)) return false;
  return interactionCount >= callFeatureConfig.interactionThreshold;
}

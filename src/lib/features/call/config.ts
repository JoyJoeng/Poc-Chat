/**
 * call 기능 설정
 *
 * 최종 배포에서 기능을 제외하려면:
 * 1. `HARDCODED_ENABLED` 를 false 로 변경하거나
 * 2. `.env.local` 에 NEXT_PUBLIC_FEATURE_CALL_ENABLED=false 설정
 */
const HARDCODED_ENABLED = true;

/** API에 숨겨서 보내는 트리거 메시지 (유저 UI 비노출) */
export const CALL_TRIGGER_MESSAGE = "logerstart";

/** 전화 거절/수락 시 API에 숨겨서 보내는 메시지 (유저 UI 비노출) */
export const CALL_DECLINE_MESSAGE = "no";
export const CALL_ACCEPT_MESSAGE = "yes";

export type CallUserResponse = "no" | "yes";

export type CallChatMessage = { role: "user" | "assistant"; content: string };

/** 확인용 디버그 명령 — DM 입력 시 즉시 call 이벤트 실행 */
export const CALL_DEBUG_COMMAND = "/triger";

export const callFeatureConfig = {
  /** 상호작용 N회: 유저 메시지 전송 → API 응답 → 캐릭터 메시지 표시 완료 시 1 증가. 테스트용 임시 2회 */
  interactionThreshold: Number(
    process.env.NEXT_PUBLIC_CALL_INTERACTION_THRESHOLD ?? 2
  ),
  triggerMessage: CALL_TRIGGER_MESSAGE,
} as const;

export function isCallFeatureEnabled(): boolean {
  const env = process.env.NEXT_PUBLIC_FEATURE_CALL_ENABLED;
  if (env === "false") return false;
  if (env === "true") return true;
  return HARDCODED_ENABLED;
}

/**
 * 앱 기능 플래그 (최종 배포 시 포함 여부 선택)
 *
 * - DM 채팅: NEXT_PUBLIC_ENABLE_DM_CHAT
 * - call(전화): src/lib/features/call/config.ts 의 HARDCODED_ENABLED
 *               또는 NEXT_PUBLIC_FEATURE_CALL_ENABLED
 */

export function isDmChatEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_DM_CHAT !== "false";
}

export {
  callFeatureConfig,
  CALL_TRIGGER_MESSAGE,
  CALL_DEBUG_COMMAND,
  isCallFeatureEnabled,
  shouldTriggerCall,
} from "./features/call";

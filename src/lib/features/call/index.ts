export {
  callFeatureConfig,
  CALL_TRIGGER_MESSAGE,
  CALL_DEBUG_COMMAND,
  isCallFeatureEnabled,
} from "./config";

export {
  clearCallState,
  getInteractionCount,
  getCallApiHistory,
  incrementInteractionCount,
  isCallTriggered,
  isIncomingCallActive,
  isStoryModeActive,
  setCallTriggered,
  setCallApiHistory,
  setIncomingCallActive,
  setStoryModeActive,
  setInteractionCount,
} from "./storage";

export { fetchCallTriggerReply, fetchCallResponseReply } from "./trigger";

export { parseStoryReply, parseUserStoryMessage, type StorySegment } from "./story-parser";
export type { UserStorySegment } from "./story-parser";

export {
  buildCallTriggerApiHistory,
  recordCompletedDmInteraction,
  shouldTriggerCall,
  type CallChatMessage,
  type CallTriggerContext,
} from "./logic";

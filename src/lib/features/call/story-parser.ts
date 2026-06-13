export type StorySegmentType = "action" | "dialogue";

export interface StorySegment {
  type: StorySegmentType;
  content: string;
}

/** '행동' / "대사" 형식의 응답을 순서대로 파싱 (따옴표는 제거) */
export function parseStoryReply(reply: string): StorySegment[] {
  const segments: StorySegment[] = [];
  const regex = /'([^']*)'|"([^"]*)"/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(reply)) !== null) {
    if (match[1] !== undefined && match[1].trim()) {
      segments.push({ type: "action", content: match[1].trim() });
    } else if (match[2] !== undefined && match[2].trim()) {
      segments.push({ type: "dialogue", content: match[2].trim() });
    }
  }

  return segments;
}

export type UserStorySegmentType = "action" | "text";

export interface UserStorySegment {
  type: UserStorySegmentType;
  content: string;
}

/** 유저 메시지에서 *행동* 구간 파싱 (별표는 제거) */
export function parseUserStoryMessage(text: string): UserStorySegment[] {
  const segments: UserStorySegment[] = [];
  const regex = /\*([^*]+)\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const before = text.slice(lastIndex, match.index).trim();
    if (before) segments.push({ type: "text", content: before });
    if (match[1].trim()) {
      segments.push({ type: "action", content: match[1].trim() });
    }
    lastIndex = regex.lastIndex;
  }

  const rest = text.slice(lastIndex).trim();
  if (rest) segments.push({ type: "text", content: rest });

  if (segments.length === 0 && text.trim()) {
    segments.push({ type: "text", content: text.trim() });
  }

  return segments;
}

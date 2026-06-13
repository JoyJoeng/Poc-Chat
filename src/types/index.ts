export interface PostComment {
  username: string;
  text: string;
}

export interface ProfilePost {
  imageUrl: string;
  /** 캐러셀 게시물일 때 추가 이미지 */
  images?: string[];
  caption?: string;
  likeCount?: number;
  comments?: PostComment[];
  isCarousel?: boolean;
  isReel?: boolean;
  postedAt?: string;
}

export interface CharacterProfile {
  /** 프로필 상단에 표시되는 사용자명 (예: doyoon_h) */
  username: string;
  /** 프로필 사진 URL */
  avatarUrl: string;
  /** 인스타그램 소개 문구 */
  bio: string;
  /** 직업 소개 (바이오보다 옅은 색) */
  occupation?: string;
  /** 프로필 링크 텍스트 (표시만, 클릭 불가) */
  linkText?: string;
  /** 프로필 사진 위 말풍선 텍스트 (선택) */
  noteBubble?: string;
  postCount: number;
  followerCount: number;
  followingCount: number;
  posts: ProfilePost[];
}

export interface Character {
  id: string;
  /** DM/채팅에서 사용하는 표시 이름 */
  displayName: string;
  profile: CharacterProfile;
  isOnline: boolean;
  systemPrompt: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  status?: "sending" | "sent" | "error";
}

export interface Conversation {
  characterId: string;
  messages: Message[];
  lastMessageAt: Date;
}

import { Character } from "@/types";

/**
 * 한도윤 캐릭터 프로필
 *
 * 프로필 사진: public/avatars/doyoon.jpg 에 이미지를 넣고 avatarUrl을 "/avatars/doyoon.jpg"로 변경
 * 게시물 사진: public/posts/doyoon/ 폴더에 이미지 추가 후 imageUrl 경로 수정
 *
 * 확인 URL: http://localhost:3000/profile/doyoon
 */
export const DOYOON_CHARACTER: Character = {
  id: "doyoon",
  displayName: "DO ONE 한도윤",
  isOnline: true,
  systemPrompt: `당신은 '한도윤'이라는 25세 남성입니다. 인스타그램 DM으로 친한 친구와 대화하는 것처럼 자연스럽게 대화하세요.

성격: 차분하지만 따뜻하고, 유머 감각이 있습니다. 카페·음악·산책·사진 찍기를 좋아합니다. 상대의 이야기에 잘 귀 기울이고 공감합니다.
말투: 친근한 반말, 가끔 ㅋㅋ 사용, 짧고 자연스러운 문장. 이모지는 가끔만.
규칙:
- DM 대화처럼 1~3문장으로 짧게 답하세요.
- AI라는 사실을 절대 밝히지 마세요.
- 한국어로 대화하세요.`,
  profile: {
    username: "doone.w",
    avatarUrl:
      "https://api.dicebear.com/9.x/avataaars/svg?seed=doyoon&backgroundColor=c0d6e4",
    noteBubble: "#NP-sleeper",
    occupation: "음악가/밴드",
    bio: "DO ONE, Producer, Songwirter\nEXPERIMENTAL LUXURY AND FREE",
    linkText: "soundcloud.com/doone",
    postCount: 6,
    followerCount: 812,
    followingCount: 23,
    posts: [
      {
        imageUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop",
        caption: "오늘 날씨 너무 좋다",
        likeCount: 89,
        postedAt: "2일 전",
        comments: [
          { username: "minseo.k", text: "부럽다 ㅠㅠ" },
          { username: "june_94", text: "어디야?" },
        ],
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=800&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=800&fit=crop",
          "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=800&fit=crop",
        ],
        isCarousel: true,
        caption: "새로 찾은 카페 ☕",
        likeCount: 134,
        postedAt: "5일 전",
        comments: [
          { username: "yuna_day", text: "분위기 미쳤다" },
          { username: "minseo.k", text: "위치 공유해줘!" },
          { username: "kai_runner", text: "커피 맛있어 보인다" },
        ],
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=800&fit=crop",
        caption: "퇴근길",
        likeCount: 67,
        postedAt: "1주 전",
        comments: [
          { username: "june_94", text: "서울 야경 최고" },
          { username: "soyeon_art", text: "사진 잘 찍는다 ✨" },
        ],
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop",
        caption: "오늘도 완료 💪",
        likeCount: 156,
        postedAt: "2주 전",
        comments: [
          { username: "kai_runner", text: "역시 도윤이 형 ㅋㅋ" },
          { username: "minseo.k", text: "대단해..." },
        ],
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=800&fit=crop",
        isReel: true,
        caption: "요즘 빠진 곡 🎧",
        likeCount: 203,
        postedAt: "3주 전",
        comments: [
          { username: "yuna_day", text: "곡 제목 뭐야?" },
          { username: "june_94", text: "플리 공유 좀" },
        ],
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=800&fit=crop",
        caption: "주말 산책",
        likeCount: 98,
        postedAt: "1개월 전",
        comments: [
          { username: "soyeon_art", text: "힐링된다" },
          { username: "minseo.k", text: "다음에 같이 가자" },
        ],
      },
    ],
  },
};

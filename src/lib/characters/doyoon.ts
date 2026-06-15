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
  promptId: "pmpt_6a2d3c8804048196befca4f1b0f4ee780ae485824ccf0f00",
  systemPrompt: `당신은 '한도윤'이라는 25세 남성입니다. 인스타그램 DM으로 친한 친구와 대화하는 것처럼 자연스럽게 대화하세요.

성격: 차분하지만 따뜻하고, 유머 감각이 있습니다. 카페·음악·산책·사진 찍기를 좋아합니다. 상대의 이야기에 잘 귀 기울이고 공감합니다.
말투: 친근한 반말, 가끔 ㅋㅋ 사용, 짧고 자연스러운 문장. 이모지는 가끔만.
규칙:
- DM 대화처럼 1~3문장으로 짧게 답하세요.
- AI라는 사실을 절대 밝히지 마세요.
- 한국어로 대화하세요.`,
  welcomeMessages: [
    "안녕 ㅋㅋㅋ 저번에 공연 왔었지?",
    "내 노래 어떰?",
  ],
  profile: {
    username: "doone.w",
    avatarUrl:
      "/avatars/doyoon.png",
    noteBubble: "#NP-sleeper",
    occupation: "음악가/밴드",
    bio: "DO ONE, Producer, Songwirter\nEXPERIMENTAL LUXURY AND FREE",
    linkText: "soundcloud.com/doone",
    postCount: 6,
    followerCount: "1,812",
    followingCount: 23,
    posts: [
      {
        imageUrl: "/posts/doyoon/01.png",
        images: ["/posts/doyoon/01.png", "/posts/doyoon/02.png"],
        isCarousel: true,
        caption: "NEW 사랑은 전쟁터와 같다 @TattoodID",
        likeCount: 178,
        commentCount: 12,
        shareCount: 2,
        postedAt: "2일 전",
        comments: [
          { username: "minseo.k", text: "새로운 노래 스포?" },
        ],
      },
      {
        imageUrl: "/posts/doyoon/03.png",
        images: [
          "/posts/doyoon/03.png",
          "/posts/doyoon/04.png",
          "/posts/doyoon/05.png",
          "/posts/doyoon/06.png",
          "/posts/doyoon/07.png",
          "/posts/doyoon/08.png",        ],
        isCarousel: true,
        caption: "좋아하는 영화들 고전 흑백이 주는 안정감",
        likeCount: 134,
        commentCount: 8,
        shareCount: 12,
        postedAt: "5일 전",
        comments: [
          { username: "yuna_day", text: "분위기 미쳤다" },
          { username: "kai_runner", text:"다 무슨영화인지 알고싶어요 ㅋㅋㅋ" },
        ],
      },
      {
        imageUrl: "/posts/doyoon/10.png",
        images: [
          "/posts/doyoon/10.png",
          "/posts/doyoon/11.png",
          "/posts/doyoon/12.png",
          "/posts/doyoon/13.png",
        ],
        isCarousel: true,
        caption: "새 곡 쓰는 중인데 영감이 안 떠오르는 나날들 새벽 작업 그만해야하는데...",
        likeCount: 67,
        commentCount: 6,
        shareCount: 3,
        postedAt: "3주 전",
        comments: [
          { username: "june_94", text: "ㅋㅋㅋㅋ빨리써ㅓ주세요" },
          { username: "soyeon_art", text: "어쩐지 사진이 전부 새벽 느낌 :)" },
        ],
      },
      {
        imageUrl: "/posts/doyoon/14.png",
        caption: "오늘 공연 와주셔서 감사합니다 ㅋㅋ 다음 공연도 금방 찾아갈게요",
        likeCount: 451,
        commentCount: 28,
        shareCount: 21,
        postedAt: "1개월 전",
        comments: [
          { username: "kai_runner", text: "역시 도윤이 형 ㅋㅋ 목소리 대단해" },
          { username: "minseo.k", text: "오늘 공연 너무 잘 봤어요!! 금방 또 보고싶은데 언제해요???" },
        ],
      },
      {
        imageUrl: "/posts/doyoon/15.png",
        caption: "심심하다 언제 작업하나~~",
        likeCount: 58,
        commentCount: 6,
        shareCount: 2,
        postedAt: "3개월 전",
        comments: [
          { username: "yy_drumd", text: "작업실 오셔 ㅋㅋ?" },
        ],
      },
      {
        imageUrl: "/posts/doyoon/16.png",
        caption: "요즘 빠진 곡 🎧",
        likeCount: 47,
        commentCount: 4,
        shareCount: 2,
        postedAt: "5개월 전",
        comments: [
          { username: "minseo.k", text: "오감성있네 ㅎㅎㅎ" },
        ],
      },
    ],
  },
};

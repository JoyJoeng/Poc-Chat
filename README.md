# PoC Chat — 가상 캐릭터 DM

인스타그램 UI로 가상 캐릭터 프로필을 보여주고, DM 채팅으로 대화하는 모바일 웹 앱입니다.

## 기능

- 인스타그램 스타일 프로필·게시물 UI
- DM 채팅 (ChatGPT API + OpenAI Prompt ID) — **기능 플래그로 켜기/끄기 가능**
- 모바일 전용 디자인 (데스크톱에서는 폰 프레임으로 표시)
- Vercel 배포 지원

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하세요.

```bash
cp .env.example .env.local
```

```env
OPENAI_API_KEY=sk-your-openai-api-key-here
OPENAI_PROMPT_ID=pmpt_your-prompt-id-here

# DM 채팅 (true: 활성화, false: 프로필만)
NEXT_PUBLIC_ENABLE_DM_CHAT=true
```

### 3. 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000/profile/doyoon](http://localhost:3000/profile/doyoon) 에서 확인하세요.

## 기능 플래그: DM 채팅

DM 채팅을 최종 버전에 넣을지 말지 선택할 수 있도록 환경 변수로 분리해 두었습니다.

| 설정 | 동작 |
|------|------|
| `NEXT_PUBLIC_ENABLE_DM_CHAT=true` (기본) | 프로필 + 메시지 버튼 + DM 채팅 |
| `NEXT_PUBLIC_ENABLE_DM_CHAT=false` | 프로필만 표시 (메시지 버튼·채팅 페이지·API 비활성) |

설정 파일: `src/lib/features.ts`

## Vercel 배포

1. [Vercel](https://vercel.com)에 GitHub 저장소 `JoyJoeng/Poc-Chat`을 연결합니다.
2. **Environment Variables**에 아래 값을 추가합니다.

| 변수 | 필수 | 설명 |
|------|------|------|
| `OPENAI_API_KEY` | DM 사용 시 | OpenAI API 키 |
| `OPENAI_PROMPT_ID` | DM 사용 시 | 한도윤 Prompt ID |
| `NEXT_PUBLIC_ENABLE_DM_CHAT` | 선택 | `true` 또는 `false` (기본: 활성) |

3. Deploy를 클릭합니다.

또는 Vercel CLI:

```bash
npx vercel
```

## 캐릭터 수정

`src/lib/characters/doyoon.ts`에서 프로필·게시물·`promptId`를 수정할 수 있습니다.

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **AI**: OpenAI Responses API + Prompt ID
- **Deploy**: Vercel

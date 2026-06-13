# PoC Chat — 가상 캐릭터 DM

인스타그램 DM UI로 가상 캐릭터와 대화하는 모바일 웹 앱입니다.

## 기능

- 인스타그램과 동일한 DM UI (대화 목록, 채팅 화면, 메시지 버블)
- ChatGPT API 기반 가상 캐릭터 대화 (3명의 캐릭터)
- 모바일 전용 디자인 (데스크톱에서는 폰 프레임으로 표시)
- Vercel 배포 지원

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 OpenAI API 키를 설정하세요.

```bash
cp .env.example .env.local
```

```env
OPENAI_API_KEY=sk-your-openai-api-key-here
```

### 3. 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인하세요.

## Vercel 배포

1. [Vercel](https://vercel.com)에 GitHub 저장소를 연결합니다.
2. 프로젝트 설정에서 Environment Variables에 `OPENAI_API_KEY`를 추가합니다.
3. Deploy를 클릭합니다.

또는 Vercel CLI로 배포:

```bash
npx vercel
```

## 캐릭터 추가

`src/lib/characters.ts`에서 캐릭터를 추가하거나 수정할 수 있습니다.

- `systemPrompt`: 캐릭터 성격과 말투를 정의
- `username`, `displayName`, `bio`: UI에 표시되는 정보

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **AI**: OpenAI GPT-4o-mini
- **Deploy**: Vercel

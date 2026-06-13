import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getCharacterById } from "@/lib/characters";

type ChatMessage = { role: "user" | "assistant"; content: string };

function resolvePromptId(character: { promptId?: string }): string | undefined {
  return character.promptId ?? process.env.OPENAI_PROMPT_ID;
}

function toResponseInput(messages: ChatMessage[]) {
  return messages.map((message) => ({
    role: message.role,
    content: message.content,
  }));
}

async function createReplyWithPrompt(
  openai: OpenAI,
  promptId: string,
  messages: ChatMessage[]
) {
  const response = await openai.responses.create({
    prompt: { id: promptId },
    input: toResponseInput(messages),
  } as OpenAI.Responses.ResponseCreateParamsNonStreaming);

  return response.output_text?.trim();
}

async function createReplyWithSystemPrompt(
  openai: OpenAI,
  systemPrompt: string,
  messages: ChatMessage[]
) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      ...messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    ],
    max_tokens: 300,
    temperature: 0.9,
  });

  return completion.choices[0]?.message?.content?.trim();
}

export async function POST(request: NextRequest) {
  try {
    const { characterId, messages } = await request.json();

    if (!characterId || !messages?.length) {
      return NextResponse.json(
        { error: "characterId와 messages가 필요합니다." },
        { status: 400 }
      );
    }

    const character = getCharacterById(characterId);
    if (!character) {
      return NextResponse.json(
        { error: "캐릭터를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API 키가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const chatMessages = messages.map(
      (message: { role: string; content: string }) => ({
        role: message.role as "user" | "assistant",
        content: message.content,
      })
    );

    const promptId = resolvePromptId(character);
    const reply = promptId
      ? await createReplyWithPrompt(openai, promptId, chatMessages)
      : await createReplyWithSystemPrompt(
          openai,
          character.systemPrompt,
          chatMessages
        );

    if (!reply) {
      return NextResponse.json(
        { error: "응답을 생성하지 못했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "메시지 전송에 실패했습니다." },
      { status: 500 }
    );
  }
}

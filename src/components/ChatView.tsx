"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ChatHeader from "@/components/ChatHeader";
import ChatInput from "@/components/ChatInput";
import MessageBubble, {
  TimestampDivider,
  formatDateDivider,
} from "@/components/MessageBubble";
import TypingIndicator from "@/components/TypingIndicator";
import Avatar from "@/components/Avatar";
import { Character, Message } from "@/types";

interface ChatViewProps {
  character: Character;
  initialMessages?: Message[];
}

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function ChatView({
  character,
  initialMessages = [],
}: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // 첫 방문 시 캐릭터 인사 메시지
  useEffect(() => {
    if (messages.length === 0) {
      const greeting: Message = {
        id: generateId(),
        role: "assistant",
        content: getGreeting(character.id),
        timestamp: new Date(),
        status: "sent",
      };
      setMessages([greeting]);
    }
  }, [character.id, messages.length]);

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content,
      timestamp: new Date(),
      status: "sending",
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setIsTyping(true);

    try {
      const history = [...messages, userMessage]
        .filter((m) => m.status !== "error")
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          characterId: character.id,
          messages: history,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "전송 실패");
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.id === userMessage.id ? { ...m, status: "sent" } : m
        )
      );

      // 타이핑 딜레이로 자연스러운 느낌
      await new Promise((r) => setTimeout(r, 800 + Math.random() * 1200));

      const assistantMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: data.reply,
        timestamp: new Date(),
        status: "sent",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === userMessage.id ? { ...m, status: "error" } : m
        )
      );
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  // 날짜 구분선 렌더링
  const renderMessages = () => {
    const elements: React.ReactNode[] = [];
    let lastDate = "";

    messages.forEach((message, index) => {
      const dateStr = formatDateDivider(message.timestamp);
      if (dateStr !== lastDate) {
        elements.push(
          <TimestampDivider key={`date-${dateStr}`} label={dateStr} />
        );
        lastDate = dateStr;
      }

      const prevMessage = messages[index - 1];
      const showAvatar =
        message.role === "assistant" &&
        (!prevMessage || prevMessage.role !== "assistant");

      elements.push(
        <div key={message.id} className="py-0.5">
          <MessageBubble
            message={message}
            showAvatar={showAvatar}
            avatarUrl={character.profile.avatarUrl}
            avatarAlt={character.displayName}
          />
        </div>
      );
    });

    return elements;
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <ChatHeader
        characterId={character.id}
        username={character.profile.username}
        displayName={character.displayName}
        avatarUrl={character.profile.avatarUrl}
        isOnline={character.isOnline}
      />

      {/* 프로필 섹션 (인스타 DM 스타일) */}
      <div className="flex flex-col items-center py-6 px-4 border-b border-[var(--ig-border)] shrink-0">
        <Avatar
          src={character.profile.avatarUrl}
          alt={character.displayName}
          size="lg"
        />
        <p className="mt-3 font-semibold text-base">{character.profile.username}</p>
        <p className="text-sm text-[var(--ig-text-secondary)] mt-0.5">
          {character.displayName} · Instagram
        </p>
        <p className="text-sm text-[var(--ig-text-secondary)] mt-1 text-center whitespace-pre-line">
          {character.profile.bio}
        </p>
        <Link
          href={`/profile/${character.id}`}
          className="mt-3 text-sm font-semibold text-[var(--ig-blue)]"
        >
          프로필 보기
        </Link>
      </div>

      {/* 메시지 영역 */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto hide-scrollbar py-3"
      >
        {renderMessages()}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={handleSend} disabled={isLoading} />
    </div>
  );
}

function getGreeting(characterId: string): string {
  const greetings: Record<string, string> = {
    doyoon: "야, 뭐해? 오늘 하루 어땠어",
  };
  return greetings[characterId] ?? "안녕! 반가워 😊";
}

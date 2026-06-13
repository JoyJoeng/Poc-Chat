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
import { loadChatMessages, saveChatMessages, clearChatMessages } from "@/lib/chat-storage";

interface ChatViewProps {
  character: Character;
  initialMessages?: Message[];
}

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function splitReplyMessages(reply: string): string[] {
  return reply
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

async function delay(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export default function ChatView({
  character,
  initialMessages = [],
}: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // 세션 저장소에서 대화 복원 (탭/창 닫기 전까지 유지)
  useEffect(() => {
    const stored = loadChatMessages(character.id);
    setMessages(stored ?? []);
    setIsHydrated(true);
  }, [character.id]);

  useEffect(() => {
    if (!isHydrated) return;
    saveChatMessages(character.id, messages);
  }, [character.id, messages, isHydrated]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleReset = () => {
    clearChatMessages(character.id);
    setMessages([]);
    setIsTyping(false);
    setIsLoading(false);
  };

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

      const parts = splitReplyMessages(data.reply);
      if (parts.length === 0) {
        throw new Error("응답을 생성하지 못했습니다.");
      }

      for (let i = 0; i < parts.length; i++) {
        const typingDelay =
          i === 0 ? 800 + Math.random() * 1200 : 400 + Math.random() * 600;
        await delay(typingDelay);

        const assistantMessage: Message = {
          id: generateId(),
          role: "assistant",
          content: parts[i],
          timestamp: new Date(),
          status: "sent",
        };

        setMessages((prev) => [...prev, assistantMessage]);
      }
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
      const nextMessage = messages[index + 1];
      const showAvatar =
        message.role === "assistant" &&
        (!nextMessage || nextMessage.role !== "assistant");

      const isRoleSwitch =
        prevMessage && prevMessage.role !== message.role;
      const isConsecutiveAssistant =
        prevMessage?.role === "assistant" && message.role === "assistant";

      let spacingClass = "mt-0.5";
      if (isRoleSwitch) spacingClass = "mt-4";
      else if (isConsecutiveAssistant) spacingClass = "mt-1.5";

      elements.push(
        <div key={message.id} className={spacingClass}>
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
        onReset={handleReset}
        resetDisabled={isLoading}
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
        <Link
          href={`/profile/${character.id}`}
          className="mt-4 px-4 py-1.5 bg-[#efefef] text-[var(--ig-text)] text-sm font-semibold rounded-lg hover:bg-[#e4e4e4] transition-colors"
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

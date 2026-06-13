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
import IncomingCallView from "@/components/call/IncomingCallView";
import {
  StoryActionLine,
  StoryDialogueBubble,
  StoryModeDivider,
  StoryUserMessage,
} from "@/components/call/StoryMessage";
import { Character, Message } from "@/types";
import { loadChatMessages, saveChatMessages, clearChatMessages } from "@/lib/chat-storage";
import {
  buildCallTriggerApiHistory,
  clearCallState,
  CALL_DEBUG_COMMAND,
  fetchCallTriggerReply,
  fetchCallResponseReply,
  getCallApiHistory,
  isCallFeatureEnabled,
  isIncomingCallActive,
  isStoryModeActive,
  parseStoryReply,
  recordCompletedDmInteraction,
  setCallApiHistory,
  setCallTriggered,
  setIncomingCallActive,
  setStoryModeActive,
} from "@/lib/features/call";

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

async function deliverAssistantReplies(
  parts: string[],
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  options?: { skipFirstTypingDelay?: boolean }
) {
  for (let i = 0; i < parts.length; i++) {
    const typingDelay =
      i === 0 && options?.skipFirstTypingDelay
        ? 0
        : i === 0
          ? 800 + Math.random() * 1200
          : 400 + Math.random() * 600;
    if (typingDelay > 0) await delay(typingDelay);

    const assistantMessage: Message = {
      id: generateId(),
      role: "assistant",
      content: parts[i],
      timestamp: new Date(),
      status: "sent",
    };

    setMessages((prev) => [...prev, assistantMessage]);
  }
}

async function deliverStoryReplies(
  reply: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  options?: { skipFirstTypingDelay?: boolean }
) {
  const parsed = parseStoryReply(reply);
  const segments =
    parsed.length > 0
      ? parsed
      : splitReplyMessages(reply).map((content) => ({
          type: "dialogue" as const,
          content,
        }));

  for (let i = 0; i < segments.length; i++) {
    const typingDelay =
      i === 0 && options?.skipFirstTypingDelay
        ? 0
        : i === 0
          ? 800 + Math.random() * 1200
          : 400 + Math.random() * 600;
    if (typingDelay > 0) await delay(typingDelay);

    const assistantMessage: Message = {
      id: generateId(),
      role: "assistant",
      content: segments[i].content,
      segmentType: segments[i].type,
      timestamp: new Date(),
      status: "sent",
    };

    setMessages((prev) => [...prev, assistantMessage]);
  }
}

function getCharacterStoryLabel(displayName: string): string {
  const parts = displayName.trim().split(/\s+/);
  return parts[parts.length - 1] ?? displayName;
}

function getMessageSpacing(
  prevMessage: Message | undefined,
  message: Message,
  isStoryMode: boolean
): string {
  if (!prevMessage) return "mt-0.5";
  if (prevMessage.role !== message.role) return "mt-4";

  if (!isStoryMode || message.role === "user") {
    if (
      prevMessage.role === "assistant" &&
      message.role === "assistant"
    ) {
      return "mt-1.5";
    }
    return "mt-0.5";
  }

  if (message.segmentType === "action" && prevMessage.segmentType === "action") {
    return "mt-2";
  }
  if (
    message.segmentType === "dialogue" &&
    prevMessage.segmentType === "dialogue"
  ) {
    return "mt-1.5";
  }
  return "mt-3";
}

function getTypingSpacing(
  lastMessage: Message | undefined,
  isStoryMode: boolean
): string {
  if (!lastMessage) return "mt-0.5";

  const nextAssistant: Message = {
    id: "",
    role: "assistant",
    content: "",
    timestamp: new Date(),
    segmentType: isStoryMode ? "dialogue" : undefined,
  };

  return getMessageSpacing(lastMessage, nextAssistant, isStoryMode);
}

export default function ChatView({
  character,
  initialMessages = [],
}: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showIncomingCall, setShowIncomingCall] = useState(false);
  const [isStoryMode, setIsStoryMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = loadChatMessages(character.id);
    setMessages(stored ?? []);
    if (isCallFeatureEnabled() && isIncomingCallActive(character.id)) {
      setShowIncomingCall(true);
    }
    if (isCallFeatureEnabled() && isStoryModeActive(character.id)) {
      setIsStoryMode(true);
    }
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
  }, [messages, isTyping, showIncomingCall]);

  const handleReset = () => {
    clearChatMessages(character.id);
    clearCallState(character.id);
    setMessages([]);
    setIsTyping(false);
    setIsLoading(false);
    setShowIncomingCall(false);
    setIsStoryMode(false);
  };

  const handleCallResponse = async (callResponse: "no" | "yes") => {
    setIncomingCallActive(character.id, false);
    setShowIncomingCall(false);
    setIsLoading(true);
    setIsTyping(true);

    if (callResponse === "yes") {
      setStoryModeActive(character.id, true);
      setIsStoryMode(true);
    }

    const apiHistory = getCallApiHistory(character.id);
    if (!apiHistory) {
      console.error("Call API history가 없습니다. call-trigger를 먼저 실행해야 합니다.");
      setIsTyping(false);
      setIsLoading(false);
      return;
    }

    try {
      const reply = await fetchCallResponseReply(
        character.id,
        apiHistory,
        callResponse
      );

      if (callResponse === "yes") {
        await deliverStoryReplies(reply, setMessages);
      } else {
        const parts = splitReplyMessages(reply);
        if (parts.length > 0) {
          await deliverAssistantReplies(parts, setMessages);
        }
      }
    } catch (error) {
      console.error("Call response error:", error);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const handleDeclineCall = () => {
    void handleCallResponse("no");
  };

  const handleAcceptCall = () => {
    void handleCallResponse("yes");
  };

  const runCallTriggerFlow = async (
    visibleHistory: { role: "user" | "assistant"; content: string }[]
  ) => {
    setCallTriggered(character.id);
    setIsTyping(true);

    try {
      const reply = await fetchCallTriggerReply(character.id, visibleHistory);
      const parts = splitReplyMessages(reply);

      if (parts.length === 0) {
        throw new Error("전화 트리거 응답이 비어 있습니다.");
      }

      setCallApiHistory(
        character.id,
        buildCallTriggerApiHistory(visibleHistory, parts)
      );

      // 트리거 메시지는 2~3초 후 도착 (타이핑 표시 유지)
      await delay(2000 + Math.random() * 1000);

      await deliverAssistantReplies(parts, setMessages, {
        skipFirstTypingDelay: true,
      });
      await delay(2000);
      setIncomingCallActive(character.id, true);
      setShowIncomingCall(true);
    } catch (error) {
      console.error("Call trigger error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = async (content: string) => {
    const trimmed = content.trim();

    // 확인용: /triger 입력 시 즉시 call 이벤트 실행
    if (isCallFeatureEnabled() && trimmed === CALL_DEBUG_COMMAND) {
      const userMessage: Message = {
        id: generateId(),
        role: "user",
        content: trimmed,
        timestamp: new Date(),
        status: "sent",
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setIncomingCallActive(character.id, false);
      setShowIncomingCall(false);

      const visibleHistory = messages
        .filter((m) => m.status !== "error")
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      try {
        await runCallTriggerFlow(visibleHistory);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content,
      timestamp: new Date(),
      status: "sending",
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    const history = [...messages, userMessage]
      .filter((m) => m.status !== "error")
      .map((m) => ({
        role: m.role,
        content: m.content,
      }));

    setIsTyping(true);

    try {
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

      if (isStoryMode) {
        await deliverStoryReplies(data.reply, setMessages);
      } else {
        await deliverAssistantReplies(parts, setMessages);

        // DM: 캐릭터 메시지 표시까지 완료된 뒤에만 상호작용 1회 기록
        if (isCallFeatureEnabled()) {
          const { shouldTriggerCall: triggerCall } =
            recordCompletedDmInteraction(character.id);

          if (triggerCall) {
            const callTriggerHistory = [
              ...history,
              ...parts.map((part) => ({
                role: "assistant" as const,
                content: part,
              })),
            ];

            await delay(500);
            await runCallTriggerFlow(callTriggerHistory);
          }
        }
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

  const renderMessages = () => {
    const elements: React.ReactNode[] = [];
    let lastDate = "";
    const storyLabel = getCharacterStoryLabel(character.displayName);
    const storyStartIndex = isStoryMode
      ? messages.findIndex((message) => message.segmentType !== undefined)
      : -1;

    messages.forEach((message, index) => {
      if (
        isStoryMode &&
        storyStartIndex > 0 &&
        index === storyStartIndex
      ) {
        elements.push(<StoryModeDivider key="story-mode-divider" />);
      }

      const dateStr = formatDateDivider(message.timestamp);
      if (dateStr !== lastDate) {
        elements.push(
          <TimestampDivider
            key={`date-${dateStr}`}
            label={dateStr}
            dark={isStoryMode}
          />
        );
        lastDate = dateStr;
      }

      const prevMessage = messages[index - 1];
      const nextMessage = messages[index + 1];
      const spacingClass = getMessageSpacing(prevMessage, message, isStoryMode);

      if (
        isStoryMode &&
        message.role === "user" &&
        (storyStartIndex < 0 || index >= storyStartIndex)
      ) {
        elements.push(
          <div key={message.id} className={spacingClass}>
            <StoryUserMessage message={message} />
          </div>
        );
        return;
      }

      if (
        isStoryMode &&
        message.role === "assistant" &&
        message.segmentType === "action"
      ) {
        elements.push(
          <div key={message.id} className={spacingClass}>
            <StoryActionLine message={message} />
          </div>
        );
        return;
      }

      if (
        isStoryMode &&
        message.role === "assistant" &&
        (message.segmentType === "dialogue" || !message.segmentType)
      ) {
        const showAvatar =
          !nextMessage ||
          nextMessage.role !== "assistant" ||
          nextMessage.segmentType !== "dialogue";

        elements.push(
          <div key={message.id} className={spacingClass}>
            <StoryDialogueBubble
              message={message}
              showAvatar={showAvatar}
              avatarUrl={character.profile.avatarUrl}
              avatarAlt={character.displayName}
              characterLabel={storyLabel}
            />
          </div>
        );
        return;
      }

      const showAvatar =
        message.role === "assistant" &&
        (!nextMessage || nextMessage.role !== "assistant");

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
    <div
      className={`relative flex flex-col h-full ${
        isStoryMode ? "bg-black" : "bg-white"
      }`}
    >
      <ChatHeader
        characterId={character.id}
        username={character.profile.username}
        displayName={character.displayName}
        storyLabel={getCharacterStoryLabel(character.displayName)}
        avatarUrl={character.profile.avatarUrl}
        isOnline={character.isOnline}
        onReset={handleReset}
        resetDisabled={isLoading}
        isStoryMode={isStoryMode}
      />

      {!isStoryMode && (
        <div className="flex flex-col items-center py-6 px-4 border-b border-[var(--ig-border)] shrink-0">
          <Avatar
            src={character.profile.avatarUrl}
            alt={character.displayName}
            size="lg"
          />
          <p className="mt-3 font-semibold text-base">
            {character.profile.username}
          </p>
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
      )}

      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto hide-scrollbar py-3"
      >
        {renderMessages()}
        {isTyping && (
          <TypingIndicator
            dark={isStoryMode}
            className={getTypingSpacing(messages.at(-1), isStoryMode)}
          />
        )}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        onSend={handleSend}
        disabled={isLoading || showIncomingCall}
        dark={isStoryMode}
      />

      {isCallFeatureEnabled() && showIncomingCall && (
        <IncomingCallView
          username={character.profile.username}
          displayName={character.displayName}
          avatarUrl={character.profile.avatarUrl}
          onDecline={handleDeclineCall}
          onAccept={handleAcceptCall}
          responseDisabled={isLoading}
        />
      )}
    </div>
  );
}

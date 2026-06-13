import { notFound } from "next/navigation";
import ChatView from "@/components/ChatView";
import { getCharacterById } from "@/lib/characters";
import { isDmChatEnabled } from "@/lib/features";

interface ChatPageProps {
  params: Promise<{ id: string }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  if (!isDmChatEnabled()) {
    notFound();
  }

  const { id } = await params;
  const character = getCharacterById(id);

  if (!character) {
    notFound();
  }

  return <ChatView character={character} />;
}

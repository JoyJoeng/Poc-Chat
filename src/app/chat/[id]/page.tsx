import { notFound } from "next/navigation";
import ChatView from "@/components/ChatView";
import { getCharacterById } from "@/lib/characters";

interface ChatPageProps {
  params: Promise<{ id: string }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { id } = await params;
  const character = getCharacterById(id);

  if (!character) {
    notFound();
  }

  return <ChatView character={character} />;
}

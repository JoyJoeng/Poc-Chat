import { notFound } from "next/navigation";
import ProfileView from "@/components/ProfileView";
import { getCharacterById } from "@/lib/characters";

interface ProfilePageProps {
  params: Promise<{ id: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params;
  const character = getCharacterById(id);

  if (!character) {
    notFound();
  }

  return <ProfileView character={character} />;
}

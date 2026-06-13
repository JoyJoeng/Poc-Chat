import { notFound } from "next/navigation";
import PostDetailView from "@/components/PostDetailView";
import { getCharacterById } from "@/lib/characters";

interface PostPageProps {
  params: Promise<{ id: string; index: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { id, index } = await params;
  const postIndex = parseInt(index, 10);
  const character = getCharacterById(id);

  if (!character || isNaN(postIndex) || postIndex < 0 || postIndex >= character.profile.posts.length) {
    notFound();
  }

  return <PostDetailView character={character} postIndex={postIndex} />;
}

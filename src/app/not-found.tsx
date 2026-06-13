import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
      <p className="text-6xl">😕</p>
      <h1 className="text-xl font-semibold">대화를 찾을 수 없어요</h1>
      <p className="text-[var(--ig-text-secondary)] text-sm">
        존재하지 않는 캐릭터입니다.
      </p>
      <Link
        href="/"
        className="mt-2 px-6 py-2.5 bg-[var(--ig-blue)] text-white rounded-lg font-semibold text-sm"
      >
        메시지 목록으로
      </Link>
    </div>
  );
}

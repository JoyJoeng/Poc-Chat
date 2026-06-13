/** 프로필·게시물 수치 — `1812` 또는 `"1,812"` 모두 허용 */
export type ProfileCount = number | string;

export function parseCount(value: ProfileCount): number {
  if (typeof value === "number") return value;
  const parsed = Number(value.replace(/,/g, "").trim());
  return Number.isFinite(parsed) ? parsed : 0;
}

export function formatCount(value: ProfileCount): string {
  return parseCount(value).toLocaleString("ko-KR");
}

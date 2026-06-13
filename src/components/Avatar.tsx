interface AvatarProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  showOnline?: boolean;
  isOnline?: boolean;
}

const sizes = {
  sm: "w-12 h-12",
  md: "w-14 h-14",
  lg: "w-20 h-20",
};

export default function Avatar({
  src,
  alt,
  size = "md",
  showOnline = false,
  isOnline = false,
}: AvatarProps) {
  return (
    <div className="relative shrink-0">
      <div
        className={`${sizes[size]} rounded-full overflow-hidden bg-gray-200 ring-1 ring-black/5`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </div>
      {showOnline && (
        <span
          className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
            isOnline ? "bg-green-500" : "bg-gray-400"
          }`}
        />
      )}
    </div>
  );
}

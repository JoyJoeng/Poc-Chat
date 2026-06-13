import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DM",
  description: "가상 캐릭터와 DM하기",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "DM",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="mobile-frame">{children}</div>
      </body>
    </html>
  );
}

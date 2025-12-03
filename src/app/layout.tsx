import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/navigation";

export const metadata: Metadata = {
  title: "Yohan Park — Product Designer",
  description:
    "Personal site of Yohan Park, featuring selected posts, case studies, resume, blog entries, and background.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-[var(--color-gray-900)]">
        <Navigation />
        {children}
      </body>
    </html>
  );
}

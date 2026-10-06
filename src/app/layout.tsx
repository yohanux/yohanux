import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import Footer from "@/components/footer";
import { GoogleAnalytics } from "@/components/google-analytics";

export const metadata: Metadata = {
  title: "Yohan Park — Product Designer",
  description:
    "Personal site of Yohan Park, featuring selected posts, case studies, resume, blog entries, and background.",
};

// Runs before first paint so the mobile tab bar never jumps. Flags mobile browsers other
// than Safari (Chrome, Firefox, in-app browsers...) so CSS can lift the bar higher.
const BROWSER_FLAG_SCRIPT = `(function(){var u=navigator.userAgent;var mobile=/iPhone|iPad|iPod|Android|Mobile/i.test(u);var safari=/Safari/.test(u)&&/Version\\//.test(u)&&!/CriOS|FxiOS|EdgiOS|OPiOS|Chrome|Android|FBAN|FBAV|Instagram|KAKAOTALK|NAVER|Line\\//i.test(u);if(mobile&&!safari)document.documentElement.setAttribute("data-mobile-non-safari","");})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BROWSER_FLAG_SCRIPT }} />
      </head>
      <body>
        <GoogleAnalytics />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}

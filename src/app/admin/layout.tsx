import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import "../globals.css";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });

// The staff area is separate from the public site: its own root layout, in
// English, never listed in search engines.
export const metadata: Metadata = {
  title: { default: "Admin", template: "%s — Admin" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: LayoutProps<"/admin">) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}

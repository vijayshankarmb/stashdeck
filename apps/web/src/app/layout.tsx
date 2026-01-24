import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/lib/AuthContext";
import { TagsProvider } from "@/lib/TagsContext";

export const metadata: Metadata = {
  title: "Stashdeck",
  description: "Stashdeck",
};

import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <TagsProvider>
            {children}
          </TagsProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

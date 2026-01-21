import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/lib/AuthContext";
import Navbar from "@/components/common/Navbar";

export const metadata: Metadata = {
  title: "Stashdeck",
  description: "Stashdeck",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar/>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: "Stashdeck",
    template: "%s · Stashdeck",
  },
  description:
    "Stashdeck is a modern platform to save, organize, tag, and search your bookmarks with clarity and speed.",
  applicationName: "Stashdeck",
  keywords: [
    "bookmarks",
    "knowledge management",
    "productivity",
    "link organizer",
    "personal knowledge base",
  ],
  authors: [{ name: "Vijay Shankar" }],
  creator: "Vijay Shankar",
  publisher: "Vijay Shankar",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "Stashdeck",
    description:
      "Save, organize, and search your bookmarks with a clean and focused workflow.",
    type: "website",
    siteName: "Stashdeck",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stashdeck",
    description:
      "A focused system for managing bookmarks, collections, and personal knowledge.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

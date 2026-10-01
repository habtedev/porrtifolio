import type { Metadata, Viewport } from "next";
import "@/index.css";
import { Providers } from "./Providers";

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Habtamu Dev Portfolio",
  description:
    "Portfolio of Habtamu Amare — AI Engineer & Senior Full-Stack Architect specializing in generative AI systems (Gemini 2.5 streaming, server-side LLM orchestration, RAG pipelines), Next.js across Frontend & Backend (Server Actions, RSC, Route Handlers), Prisma/PostgreSQL, Docker CI/CD, and enterprise Odoo ERP.",
  authors: [{ name: "Habtamu Amare" }],
  openGraph: {
    title: "Habtamu Dev Portfolio",
    description:
      "Portfolio of Habtamu Amare — AI Engineer & Senior Full-Stack Architect specializing in generative AI systems (Gemini 2.5 streaming, server-side LLM orchestration, RAG pipelines), Next.js across Frontend & Backend (Server Actions, RSC, Route Handlers), Prisma/PostgreSQL, Docker CI/CD, and enterprise Odoo ERP.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@habtamudev",
    creator: "@habtamudev",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary"
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

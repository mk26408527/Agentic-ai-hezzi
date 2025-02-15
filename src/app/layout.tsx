import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Agentia World | Next-Gen AI Solutions",
  description: "Step into the future with Agentia World - Experience cutting-edge AI solutions and innovative digital experiences.",
  keywords: "AI, artificial intelligence, web development, digital solutions",
  openGraph: {
    title: "Agentia World",
    description: "Step into the future with Agentia World",
    images: ['/icon.png'],
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#000000",
  icons: {
    icon: { url: '/icon.png', type: 'image/png' },
    shortcut: { url: '/icon.png', type: 'image/png' },
    apple: { url: '/icon.png', type: 'image/png' },
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/icon.png',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.chatbaseConfig = {
                chatbotId: "kRqT5euqzM8vZNeL_VKY_",
              }
            `
          }}
        />
        <script
          src="https://www.chatbase.co/embed.min.js"
          defer
        ></script>
        <link
          rel="preload"
          href="https://v1.pinimg.com/videos/iht/720p/5a/91/b0/5a91b06c21259963d0b7d9e80e8d288a.mp4"
          as="video"
          type="video/mp4"
        />
      </head>
      <body className={`${spaceGrotesk.className} bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
} 
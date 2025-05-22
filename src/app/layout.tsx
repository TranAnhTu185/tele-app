"use client";

import "./globals.css";
import { Outfit } from "next/font/google";
import Script from "next/script";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit', // Optional, if you want to use CSS variable
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <head>
        <title>TON War</title>
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </head>
      <body className={outfit.className + " bg-black h-screen"}>
        <TonConnectUIProvider manifestUrl="https://teal-defeated-piranha-723.mypinata.cloud/ipfs/bafkreicratyikzcjr73lr6v3yvp7u4ne7bqnkimgj7ogtavei4lzabdxga">
          {children}
        </TonConnectUIProvider>
      </body>
    </html>
  );
}

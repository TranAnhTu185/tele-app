"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className + " mt-[60px]"}>
        <TonConnectUIProvider manifestUrl="https://teal-defeated-piranha-723.mypinata.cloud/ipfs/bafkreicratyikzcjr73lr6v3yvp7u4ne7bqnkimgj7ogtavei4lzabdxga">
          {children}
        </TonConnectUIProvider>
      </body>
    </html>
  );
}

"use client";
import "./globals.css";
import Link from "next/link";
import { ParsedUA, parseUserAgent } from "./lib/uaParser";
import { useEffect, useState } from "react";
import { init, isTMA, viewport, swipeBehavior, miniApp } from "@telegram-apps/sdk";

interface TelegramWebApp {
  ready: () => void;
  initData: string;
  initDataUnsafe: string;
}


declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    }
  }
}
export default function Home() {
  const [uaData, setUaData] = useState<ParsedUA | null>(null);
  useEffect(() => {
    async function initTg() {
      if (await isTMA()) {
        debugger;
        init();
        if (viewport.mount.isAvailable()) {
          await viewport.mount();
          viewport.expand();
        }
        if (viewport.requestFullscreen.isAvailable()) {
          await viewport.requestFullscreen();
        }
        if (swipeBehavior.mount.isAvailable()) {
          await swipeBehavior.mount();
        }
        if (swipeBehavior.disableVertical.isAvailable()) {
          await swipeBehavior.disableVertical();
          await swipeBehavior.isVerticalEnabled();
        }
        if (miniApp.mountSync.isAvailable()) {
          await miniApp.mountSync();
          miniApp.isMounted();
        }
        if (miniApp.setHeaderColor.isAvailable()) {
          await miniApp.setHeaderColor('bg_color');
          await miniApp.headerColor(); // 'bg_color'
        }

        if (miniApp.setHeaderColor.isAvailable() && miniApp.setHeaderColor.supports.rgb()) {
          await miniApp.setHeaderColor('#000000');
          await miniApp.headerColor(); // '#aabbcc'
        }
      }
    }
    initTg();
    const userAgent = navigator.userAgent;
    setUaData(parseUserAgent(userAgent));
  }, []);

  if (!uaData) return <div>Loading device info...</div>;
  return (
    <div>
      {uaData.isMobile == true &&
        <div className="bg-center min-h-screen flex flex-col items-center justify-end bg-[url('../../public/bg-cho.jpg')] bg-cover bg-no-repeat text-white px-4 py-6">
          <div className="w-full px-4 flex items-center justify-center mb-8">
            <button className="w-full max-w-sm flex items-center justify-between grounded-radiants rounded-full px-4 py-2">
              <span className="text-yellow-400 font-medium text-lg">Let&apos;s go</span>

              <Link href="/home" className="ml-4 background-color-gra-green rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-[50px] text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </button>
          </div>
        </div>
      }

      {uaData.isMobile == false &&
        <div className="flex min-h-screen flex-col items-center justify-center text-white p-4"> War Ton  is currently only available on mobiles devices.</div>
      }

    </div>

  );
}


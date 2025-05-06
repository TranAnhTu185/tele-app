"use client";
import "./globals.css";
import Link from "next/link";

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
  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-end bg-[url('../../public/bg-cho.jpg')] bg-contain bg-no-repeat text-white px-4 py-6">
        <div className="w-full px-4 flex items-center justify-center mb-8">
          <button className="w-full max-w-sm flex items-center justify-between bg-[#0e0b1a] border border-[#3a2f55] rounded-full px-4 py-2">
            <span className="text-yellow-400 font-medium text-lg">Let&apos;s go</span>

            <Link href="/home" className="ml-4 bg-gradient-to-r from-purple-500 to-orange-300 rounded-full p-2">
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
    </div>

  );
}


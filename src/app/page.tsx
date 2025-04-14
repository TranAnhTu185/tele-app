"use client";

import { Button } from 'antd';
import "./globals.css";
import "./page.style.css"
import Link from "next/link";

interface TelegramWebApp {
  ready: () => void;
  initData: string;
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
        <LoginPage/>
    </div>

  );
}

function LoginPage() {
  return (
    <Link  href="/home" className="h-screen flex flex-col items-center justify-center">
      <Button type={"primary"}> Login</Button>
    </Link>
  );
}


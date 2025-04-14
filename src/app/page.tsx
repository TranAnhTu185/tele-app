"use client";

import { Button, Spin } from 'antd';
import "./globals.css";
import { useState } from "react";
import "./page.style.css"
import Link from "next/link";
interface ChildProps {
	onButtonClick: () => void;
}

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
  const [loading, setLoading] = useState(false);
  


  const handleChildClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000)
  };

  return (
    <div>
      <Spin spinning={loading}>
        <LoginPage onButtonClick={handleChildClick} />
      </Spin>
    </div>

  );
}

function LoginPage({ onButtonClick }: ChildProps) {
  return (
    <Link  href="/homePage" className="h-screen flex flex-col items-center justify-center">
      <Button type={"primary"} onClick={() => onButtonClick()}> Login</Button>
    </Link>
  );
}


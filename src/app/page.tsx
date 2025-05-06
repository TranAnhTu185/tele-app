"use client";

import "./globals.css";
import {useEffect, useState} from "react";
import { useRouter} from "next/navigation";
import { Spin} from "antd";

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

  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    setTimeout(()=>{
      setLoading(true);
      router.push('/home')
    }, 5000)
  })
  return (
    <div className={'h-[100vh] w-full flex flex-col items-center justify-center'}>
      <Spin spinning={loading} size="large" >

      </Spin>
    </div>

  );
}




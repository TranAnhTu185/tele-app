"use client";

import { Button, Spin } from 'antd';
import "./globals.css";
import { useEffect, useState } from "react";
import "./page.style.css"
import HomePage from './HomePage/page';
import Header from './header/page';
import Navbar from './navbar/page';

interface Props {
  dataString: string | null;
}

interface ChildProps {
	onButtonClick: (increment: boolean) => void;
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
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
  const [initData, setinitData] = useState<string | null>(null);
  const [isAuTh, setisAuTh] = useState<boolean | null>(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);
  useEffect(() => {
    if (login == true) {
      const tgApp = window.Telegram?.WebApp;
      setTimeout(async () => {
        if (tgApp) {
          tgApp.ready();
          setWebApp(tgApp);
          if (tgApp.initData) {
            setinitData(tgApp.initData);
            try {
              const response = await fetch('https://ton-war.bytebuffer.co/auth', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  "initData": tgApp.initData
                }),
              })
              if (!response.ok) {
                const errorData = await response.json();
                setisAuTh(false);
                setError(errorData);
                throw new Error(errorData.error || 'Failed to check membership');
              } else {
                const data = await response.json();
                console.log(data);
                try {
                  const response = await fetch('https://ton-war.bytebuffer.co/account/me?text=day%20la%20gi%20%3F', {
                    method: 'GET',
                    headers: {
                      'Authorization': data.token,
                    },
                  })
                  if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to check');
                    alert('error call');
                    return
                  } else {
                    const data = await response.json();
                    console.log(data);
                    alert('Call success');
                  }
                } catch (error) {
                  console.error('Error loggin', error);
                } finally {
                }
                setisAuTh(true);
              }
            } catch (error) {
              console.error('Error loggin', error);
              setisAuTh(false);
              setError("login false");
            } finally {
            }
          }
        } else {
          alert('No uesr login');
          const tg = window.Telegram?.WebApp;
          if (tg) {
            setWebApp(tg);
          }
        }
      }, 2000)
    }
  }, [login])


  const handleChildClick = (increment: boolean) => {
    setLoading(true);
    setTimeout(() => {
      setLogin(increment);
      setLoading(false);
    }, 1000)
  };

  return (
    <div>
      <Spin spinning={loading}>
        {login == true &&
          <div>
            <Header />
            <main className="w-full">
              {(initData && isAuTh == true) && <HomePage />}
              {(initData && isAuTh == false) && <NotAuth dataString={JSON.stringify(webApp)} />}
              {(!initData) && <NotUser dataString={initData + error} />}
            </main>
            <Navbar />
          </div>
        }
        {login == false && <LoginPage onButtonClick={handleChildClick} />}
      </Spin>
    </div>

  );
}

function NotUser({ dataString }: Props) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">Ton War</h1>
      <p className="text-xl">intData: {dataString}</p>
    </div>
  )
}

function NotAuth({ dataString }: Props) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">Ton War</h1>
      <p className="text-xl">{dataString}</p>
    </div>
  )
}


function LoginPage({ onButtonClick }: ChildProps) {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Button type={"primary"} onClick={() => onButtonClick(true)}> Login</Button>
    </div>
  );
}


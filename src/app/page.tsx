"use client";
import Image from "next/image";
import img1 from "../../public/img-1.svg";
import img11 from "../../public/img-11.svg";
import key from "../../public/icons/key.svg";
import icon11 from "../../public/icon-11.svg";
import icon1 from "../../public/icons/icon-1.png";
import stats from "../../public/btn/btn-stats.svg";
import vuKhi from "../../public/btn/btn-vk.svg";
import monster from "../../public/btn/monster.svg";
import inventory from "../../public/btn/inventory.svg";
import { Spin } from 'antd';
import "./globals.css";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        platform?: string;
        initData?: string;
      };
    }
  }
}

interface ChildProps {
  onButtonClick: (increment: string) => void;
}

interface Props {
  dataString: string | null;
}

export default function Home() {
  const [initData, setinitData] = useState<string | null>(null);
  const [isAuTh, setisAuTh] = useState<boolean | null>(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const initDataString = window.Telegram.WebApp.initData;
      if (initDataString) {
        setinitData(initDataString.toString());
        checkAuth();
      } else {
        alert('No uesr login');
        return;
      }
    }
  }, [initData])

  const checkAuth = async () => {
    try {
      debugger;
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "initData": initData
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
        setisAuTh(true);
      }
    } catch (error) {
      console.error('Error loggin', error);
      setisAuTh(false);
      setError("login false");
    } finally {
    }
  }


  return (
    <main className="w-full">
      {(initData && isAuTh == true) && <HomeTheme />}
      {(initData && isAuTh == false) && <NotAuth dataString={error}/>}
      {(!initData) && <NotUser />}
    </main>
  );
}

function NotUser() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">Ton War</h1>
      <p className="text-xl">This app can only be used within Telegram as a Mini App.</p>
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

function HomeTheme() {

  const [isStatic, setIsStatic] = useState("sum");
  const [loading, setLoading] = useState(false);

  const handleChildClick = (increment: string) => {
    setLoading(true);
    setTimeout(() => {
      setIsStatic(increment);
      setLoading(false);
    }, 1000)
  };
  return (
    <div className="text-white w-full mx-auto">
      <div className="mt-22">
        <div className="flex justify-between items-center m-3 rounded-[20px] pb-[3px] pt-[3px] pr-[8px] pl-[8px] bg-[#33321e]">
          <div className="mr-3">
            <Image
              src={icon1}
              alt=""
              className="w-[18px] h-[21px] mx-auto"
              style={{
                filter: "drop-shadow(0px 0px 24px #a726a9a8)",
              }}
            />
          </div>
          <div className="flex-1 text-xs text-left">Summon Monster and get 4 TON per day</div>
        </div>
        <div className="background-color-radi mx-[8px] border border-[rgba(255,255,255,0.4)]">
          <Spin spinning={loading}>
            {isStatic === "stats" && <Statistic onButtonClick={handleChildClick} />}
            {isStatic === "sum" && <SummonMonster onButtonClick={handleChildClick} />}
            {isStatic === "weapon" && <Weapon onButtonClick={handleChildClick} />}
          </Spin>
        </div>
      </div>
    </div>
  )
}
function SummonMonster({ onButtonClick }: ChildProps) {
  return (
    <div className="p-3 rounded-lg bg-[url('../../public/image.svg')] bg-auto bg-no-repeat min-h-[500px] relative">
      <button className="absolute top-[50px] right-[27px]" onClick={() => onButtonClick("weapon")}>
        <Image
          src={vuKhi}
          alt=""
          className="w-[56px] h-[60px]"
        />
      </button>
      <div className="flex justify-between items-center">
        <div className="mr-3">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.0989 11.0027C4.1123 13.6542 4.75435 15.7759 5.26805 17.2645C3.0106 13.8947 0.448413 7.80251 4.64841 4.25689C2.65341 4.05485 0.318381 5.46607 0.158725 7.595H0.149819C0.0997565 8.25368 0.270756 8.98981 0.700413 9.75748C-0.2354 12.3491 -0.281431 15.2051 1.32498 19.3153C2.22404 21.6144 4.64626 22.2544 6.98523 21.8437C8.68894 21.5437 10.2754 20.7812 11.3584 19.0428C13.2408 16.0203 14.1704 14.1013 16.1298 12.6949C18.3107 11.7679 20.702 12.5426 21.9367 13.7475C21.5862 11.0498 18.6369 8.52045 16.2899 11.0867C14.3528 11.4458 13.0543 11.908 10.8654 13.4884C11.7865 11.6716 13.5057 9.50806 14.5746 8.2189C16.154 6.26853 19.3958 5.55546 21.0679 5.96393C19.5684 3.83862 15.0718 3.17065 14.0547 6.55128C12.0856 7.45423 9.60643 9.40362 7.96529 11.3793C8.5081 8.9067 9.5206 5.85804 10.5128 4.10389C12.0983 2.39046 14.4395 2.41957 15.8858 2.8587C14.5309 0.674511 10.2024 -0.428177 9.3938 3.46775C7.37302 5.01837 5.30405 8.1604 4.09899 11.0028L4.0989 11.0027Z" fill="#96DC68" />
          </svg>
        </div>
        <div className="flex-1 text-lg font-semibold text-left">Summon Monster</div>
      </div>
      <div className="flex justify-center items-center mt-[34px] mb-[10px]">
        <button>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M26 2C25.4477 2 25 2.44771 25 3V28C25 28.5523 25.4477 29 26 29C26.5523 29 27 28.5523 27 28V3C27 2.44772 26.5523 2 26 2ZM23.9643 27.35V19.9999C21.4955 19.9807 19.5 17.9734 19.5 15.5C19.5 13.0266 21.4955 11.0193 23.9643 11.0001V3.35003C23.9636 3.10704 23.8966 2.86886 23.7705 2.66113C23.6444 2.4534 23.4641 2.28398 23.2489 2.1711C23.0337 2.05823 22.7919 2.00618 22.5493 2.02056C22.3067 2.03494 22.0727 2.1152 21.8723 2.2527L4.539 14.2527C3.82033 14.75 3.82033 15.9474 4.539 16.446L21.8723 28.446C22.0723 28.5849 22.3064 28.6664 22.5494 28.6815C22.7924 28.6967 23.0348 28.645 23.2505 28.532C23.4661 28.419 23.6467 28.2491 23.7725 28.0407C23.8984 27.8324 23.9647 27.5935 23.9643 27.35Z" fill="url(#paint0_linear_2001_255)" />
            <defs>
              <linearGradient id="paint0_linear_2001_255" x1="4" y1="15" x2="27" y2="15" gradientUnits="userSpaceOnUse">
                <stop stopColor="#C2EEA6" stopOpacity="0.8" />
                <stop offset="1" stopColor="#C2EEA6" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </button>
        <Image
          src={img1}
          alt=""
          className="w-[232px] h-[232px] mx-auto"
          style={{
            filter: "drop-shadow(0px 0px 24px #3B2E14)",
          }}
        />
        <button>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M6 2C6.55228 2 7 2.44771 7 3V28C7 28.5523 6.55228 29 6 29C5.44772 29 5 28.5523 5 28V3C5 2.44772 5.44772 2 6 2ZM8.03567 27.35V19.9999C10.5045 19.9807 12.5 17.9734 12.5 15.5C12.5 13.0266 10.5045 11.0193 8.03567 11.0001V3.35003C8.03643 3.10704 8.10345 2.86886 8.22951 2.66113C8.35556 2.4534 8.53589 2.28398 8.75107 2.1711C8.96626 2.05823 9.20815 2.00618 9.45071 2.02056C9.69328 2.03494 9.92733 2.1152 10.1277 2.2527L27.461 14.2527C28.1797 14.75 28.1797 15.9474 27.461 16.446L10.1277 28.446C9.92774 28.5849 9.69357 28.6664 9.45061 28.6815C9.20764 28.6967 8.96516 28.645 8.74953 28.532C8.53389 28.419 8.35333 28.2491 8.22748 28.0407C8.10162 27.8324 8.03528 27.5935 8.03567 27.35Z" fill="url(#paint0_linear_2001_261)" />
            <defs>
              <linearGradient id="paint0_linear_2001_261" x1="28" y1="15" x2="5" y2="15" gradientUnits="userSpaceOnUse">
                <stop stopColor="#C2EEA6" stopOpacity="0.8" />
                <stop offset="1" stopColor="#C2EEA6" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </button>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center bg-[url('../../public/bg-btn.svg')] bg-cover h-[40px] p-[4px] w-[144px]">
          <span className="mr-2">1000</span>
          <div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_12_66)">
                <path fillRule="evenodd" clipRule="evenodd" d="M22.6689 2.32031C22.3918 1.79378 21.9405 1.37916 21.3917 1.1469C20.8988 0.896571 20.3548 0.762739 19.8017 0.755768H4.33444C3.75065 0.71942 3.16907 0.855464 2.66237 1.1469C2.34186 1.25191 2.04555 1.41958 1.79076 1.64011C1.53597 1.86065 1.32781 2.12962 1.17844 2.43131C0.84514 2.99549 0.700371 3.65077 0.765063 4.30241C0.812498 4.90411 1.02723 5.48069 1.38513 5.96738L10.975 22.6699C11.0946 22.8446 11.2545 22.9881 11.4412 23.0884C11.628 23.1886 11.8362 23.2427 12.0482 23.2461C12.2664 23.2642 12.4852 23.2196 12.6787 23.1174C12.8722 23.0153 13.0323 22.86 13.14 22.6699L22.7722 5.96738C23.1107 5.44149 23.2765 4.82353 23.2466 4.19935C23.2152 3.53457 23.0165 2.88836 22.6689 2.32031ZM10.8319 17.4583L3.44673 4.60369C3.25594 4.21256 3.1579 4.01699 3.1579 4.01699C3.1302 3.84247 3.16491 3.66379 3.25594 3.51221C3.32987 3.33538 3.47081 3.19481 3.64812 3.12108H10.8319V17.4583ZM20.6894 4.08835C20.7292 4.28546 20.7292 4.4885 20.6894 4.68562L13.14 17.5217V3.20565H19.6984C19.9303 3.18029 20.1648 3.21488 20.3794 3.30608L20.4827 3.40914C20.5861 3.40914 20.5861 3.59414 20.6894 3.59414C20.7371 3.75545 20.7371 3.92704 20.6894 4.08835Z" fill="white" />
              </g>
              <defs>
                <clipPath id="clip0_12_66">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          {/* <TonConnectButton/> */}
        </div>
        <div className="flex justify-between items-center pt-[12px]">
          <div className="flex-1 text-xs text-left mr-2">What’s Inside</div>
          <div className="">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M6.075 15.909C6.9875 16.303 7.9625 16.5 9 16.5C10.0385 16.501 11.0135 16.3042 11.925 15.9097C12.8365 15.5152 13.6303 14.9808 14.3063 14.3063C14.9823 13.6318 15.5165 12.838 15.909 11.925C16.3015 11.012 16.4985 10.037 16.5 9C16.5015 7.963 16.3048 6.988 15.9098 6.075C15.5148 5.162 14.9803 4.36825 14.3063 3.69375C13.6323 3.01925 12.8385 2.485 11.925 2.091C11.0115 1.697 10.0365 1.5 9 1.5C7.9635 1.5 6.9885 1.697 6.075 2.091C5.1615 2.485 4.36775 3.01925 3.69375 3.69375C3.01975 4.36825 2.4855 5.162 2.091 6.075C1.6965 6.988 1.4995 7.963 1.5 9C1.5005 10.037 1.6975 11.012 2.091 11.925C2.4845 12.838 3.01875 13.6318 3.69375 14.3063C4.36875 14.9808 5.1625 15.515 6.075 15.909ZM9 6.75C9.2125 6.75 9.39075 6.678 9.53475 6.534C9.67875 6.39 9.7505 6.212 9.75 6C9.7495 5.788 9.6775 5.61 9.534 5.466C9.3905 5.322 9.2125 5.25 9 5.25C8.7875 5.25 8.6095 5.322 8.466 5.466C8.3225 5.61 8.2505 5.788 8.25 6C8.2495 6.212 8.3215 6.39025 8.466 6.53475C8.6105 6.67925 8.7885 6.751 9 6.75ZM8.25 8.25V12.75H9.75V8.25H8.25Z" fill="white" />
            </svg>
          </div>
        </div>
      </div>

      <button className="absolute bottom-[136px] left-[13px]" onClick={() => onButtonClick("stats")}>
        <Image
          src={stats}
          alt=""
          className="w-[44px] h-[46px]"
        />
      </button>
    </div>
  );
}

function Statistic({ onButtonClick }: ChildProps) {
  return (
    <div className="p-3 min-h-[500px]">
      <div className="flex justify-between items-center">
        <div className="mr-3">
          <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M23.25 1.65C23.25 1.21275 23.076 0.792751 22.767 0.483001C22.4573 0.174001 22.0373 0 21.6 0C21.2205 0 20.7795 0 20.4 0C19.9627 0 19.5427 0.174001 19.233 0.483001C18.924 0.792751 18.75 1.21275 18.75 1.65V16.35C18.75 16.7873 18.924 17.2073 19.233 17.517C19.5427 17.826 19.9627 18 20.4 18H21.6C22.0373 18 22.4573 17.826 22.767 17.517C23.076 17.2073 23.25 16.7873 23.25 16.35V1.65Z" fill="#96DC68" />
            <path fillRule="evenodd" clipRule="evenodd" d="M5.25 12.15C5.25 11.7127 5.076 11.2927 4.767 10.983C4.45725 10.674 4.03725 10.5 3.6 10.5C3.2205 10.5 2.7795 10.5 2.4 10.5C1.96275 10.5 1.54275 10.674 1.233 10.983C0.924001 11.2927 0.75 11.7127 0.75 12.15V16.35C0.75 16.7873 0.924001 17.2073 1.233 17.517C1.54275 17.826 1.96275 18 2.4 18H3.6C4.03725 18 4.45725 17.826 4.767 17.517C5.076 17.2073 5.25 16.7873 5.25 16.35V12.15Z" fill="#96DC68" />
            <path fillRule="evenodd" clipRule="evenodd" d="M17.25 9.15C17.25 8.71275 17.076 8.29275 16.767 7.983C16.4573 7.674 16.0373 7.5 15.6 7.5C15.2205 7.5 14.7795 7.5 14.4 7.5C13.9627 7.5 13.5427 7.674 13.233 7.983C12.924 8.29275 12.75 8.71275 12.75 9.15V16.35C12.75 16.7873 12.924 17.2073 13.233 17.517C13.5427 17.826 13.9627 18 14.4 18H15.6C16.0373 18 16.4573 17.826 16.767 17.517C17.076 17.2073 17.25 16.7873 17.25 16.35V9.15Z" fill="#96DC68" />
            <path fillRule="evenodd" clipRule="evenodd" d="M11.25 6.15C11.25 5.23875 10.5112 4.5 9.6 4.5C9.2205 4.5 8.7795 4.5 8.4 4.5C7.48875 4.5 6.75 5.23875 6.75 6.15V16.35C6.75 17.2613 7.48875 18 8.4 18H9.6C10.5112 18 11.25 17.2613 11.25 16.35V6.15Z" fill="#96DC68" />
          </svg>
        </div>
        <div className="flex-1 text-lg font-semibold text-left">Statistics</div>
        <button className="flex text-xs text-right" onClick={() => onButtonClick("sum")}>
          <div className="mr-3">
            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_2001_2050)">
                <path d="M11.2787 5.65773C11.2296 5.64976 11.1799 5.64609 11.1302 5.64673H2.66446L2.84906 5.56087C3.0295 5.47547 3.19365 5.35924 3.33417 5.21743L5.70818 2.84342C6.02084 2.54495 6.07338 2.06481 5.83268 1.70579C5.55253 1.3232 5.01529 1.24013 4.63268 1.52028C4.60177 1.54292 4.57239 1.56761 4.54478 1.59417L0.251816 5.88714C-0.0836792 6.22226 -0.0839744 6.76588 0.251145 7.10138C0.25136 7.10159 0.251602 7.10183 0.251816 7.10205L4.54478 11.395C4.88055 11.7298 5.42417 11.7291 5.75902 11.3933C5.78537 11.3669 5.80998 11.3388 5.83268 11.3092C6.07338 10.9501 6.02084 10.47 5.70818 10.1715L3.33846 7.79322C3.21249 7.66711 3.06765 7.56137 2.90916 7.47983L2.65159 7.36392H11.083C11.5216 7.38021 11.9064 7.07382 11.9888 6.6427C12.0647 6.17463 11.7468 5.73366 11.2787 5.65773Z" fill="white" />
              </g>
              <defs>
                <clipPath id="clip0_2001_2050">
                  <rect width="12" height="12" fill="white" transform="translate(0 0.5)" />
                </clipPath>
              </defs>
            </svg>
          </div>
          Back to home</button>
      </div>
      <div className="mt-[16px] mb-[10px]">
        <div className="bg-[url('../../public/bg-thbg.svg')] bg-cover w-[353px] mx-auto grid grid-cols-3 gap-4 py-[9px] mb-[12px]">
          <div className="text-[16px] text-white text-left">User</div>
          <div className="text-[16px] text-white text-center">Egg</div>
          <div className="text-[16px] text-white text-right">Profit/day</div>
        </div>
        <div className="w-[353px] mx-auto grid grid-cols-3 gap-4 py-[12px] mb-[12px]">
          <div className="text-xs text-white text-left">abxxnamw</div>
          <div className="text-xs text-white text-center flex items-center justify-center">+1
            <div className="ml-3">
              <Image
                src={icon11}
                alt=""
                className="w-[24px] h-[24px] mx-auto"
              />
            </div>
          </div>
          <div className="text-xs text-[#7cce00] text-right">+10.9 TON</div>
        </div>
        <div className="w-[353px] mx-auto grid grid-cols-3 gap-4 py-[12px] mb-[12px]">
          <div className="text-xs text-white text-left">abxxnamw</div>
          <div className="text-xs text-white text-center flex items-center justify-center">+1
            <div className="ml-3">
              <Image
                src={icon11}
                alt=""
                className="w-[24px] h-[24px] mx-auto"
              />
            </div>
          </div>
          <div className="text-xs text-[#7cce00] text-right">+10.9 TON</div>
        </div>
        <div className="w-[353px] mx-auto grid grid-cols-3 gap-4 py-[12px] mb-[12px]">
          <div className="text-xs text-white text-left">abxxnamw</div>
          <div className="text-xs text-white text-center flex items-center justify-center">+1
            <div className="ml-3">
              <Image
                src={icon11}
                alt=""
                className="w-[24px] h-[24px] mx-auto"
              />
            </div>
          </div>
          <div className="text-xs text-[#7cce00] text-right">+10.9 TON</div>
        </div>
        <div className="w-[353px] mx-auto grid grid-cols-3 gap-4 py-[12px] mb-[12px]">
          <div className="text-xs text-white text-left">abxxnamw</div>
          <div className="text-xs text-white text-center flex items-center justify-center">+1
            <div className="ml-3">
              <Image
                src={icon11}
                alt=""
                className="w-[24px] h-[24px] mx-auto"
              />
            </div>
          </div>
          <div className="text-xs text-[#7cce00] text-right">+10.9 TON</div>
        </div>
        <div className="w-[353px] mx-auto grid grid-cols-3 gap-4 py-[12px] mb-[12px]">
          <div className="text-xs text-white text-left">abxxnamw</div>
          <div className="text-xs text-white text-center flex items-center justify-center">+1
            <div className="ml-3">
              <Image
                src={icon11}
                alt=""
                className="w-[24px] h-[24px] mx-auto"
              />
            </div>
          </div>
          <div className="text-xs text-[#7cce00] text-right">+10.9 TON</div>
        </div>
        <div className="w-[353px] mx-auto grid grid-cols-3 gap-4 py-[12px] mb-[12px]">
          <div className="text-xs text-white text-left">abxxnamw</div>
          <div className="text-xs text-white text-center flex items-center justify-center">+1
            <div className="ml-3">
              <Image
                src={icon11}
                alt=""
                className="w-[24px] h-[24px] mx-auto"
              />
            </div>
          </div>
          <div className="text-xs text-[#7cce00] text-right">+10.9 TON</div>
        </div>
        <div className="w-[353px] mx-auto grid grid-cols-3 gap-4 py-[12px] mb-[12px]">
          <div className="text-xs text-white text-left">abxxnamw</div>
          <div className="text-xs text-white text-center flex items-center justify-center">+1
            <div className="ml-3">
              <Image
                src={icon11}
                alt=""
                className="w-[24px] h-[24px] mx-auto"
              />
            </div>
          </div>
          <div className="text-xs text-[#7cce00] text-right">+10.9 TON</div>
        </div>
        <div className="w-[353px] mx-auto grid grid-cols-3 gap-4 py-[12px] mb-[12px]">
          <div className="text-xs text-white text-left">abxxnamw</div>
          <div className="text-xs text-white text-center flex items-center justify-center">+1
            <div className="ml-3">
              <Image
                src={icon11}
                alt=""
                className="w-[24px] h-[24px] mx-auto"
              />
            </div>
          </div>
          <div className="text-xs text-[#7cce00] text-right">+10.9 TON</div>
        </div>
        <div className="w-[353px] mx-auto grid grid-cols-3 gap-4 py-[12px] mb-[12px]">
          <div className="text-xs text-white text-left">abxxnamw</div>
          <div className="text-xs text-white text-center flex items-center justify-center">+1
            <div className="ml-3">
              <Image
                src={icon11}
                alt=""
                className="w-[24px] h-[24px] mx-auto"
              />
            </div>
          </div>
          <div className="text-xs text-[#7cce00] text-right">+10.9 TON</div>
        </div>
        <div className="w-[353px] mx-auto grid grid-cols-3 gap-4 py-[12px] mb-[12px]">
          <div className="text-xs text-white text-left">abxxnamw</div>
          <div className="text-xs text-white text-center flex items-center justify-center">+1
            <div className="ml-3">
              <Image
                src={icon11}
                alt=""
                className="w-[24px] h-[24px] mx-auto"
              />
            </div>
          </div>
          <div className="text-xs text-[#7cce00] text-right">+10.9 TON</div>
        </div>
        <div className="w-[353px] mx-auto grid grid-cols-3 gap-4 py-[12px] mb-[12px]">
          <div className="text-xs text-white text-left">abxxnamw</div>
          <div className="text-xs text-white text-center flex items-center justify-center">+1
            <div className="ml-3">
              <Image
                src={icon11}
                alt=""
                className="w-[24px] h-[24px] mx-auto"
              />
            </div>
          </div>
          <div className="text-xs text-[#7cce00] text-right">+10.9 TON</div>
        </div>
      </div>
    </div>
  );
}

function Weapon({ onButtonClick }: ChildProps) {
  return (
    <div className="p-3 rounded-lg bg-[url('../../public/image.svg')] bg-auto min-h-[500px] relative">
      <button className="absolute top-[50px] left-[26px]" onClick={() => onButtonClick("sum")}>
        <Image
          src={monster}
          alt=""
          className="w-[56px] h-[60px]"
        />
      </button>
      <button className="absolute top-[54px] right-[26px]">
        <Image
          src={inventory}
          alt=""
          className="w-[44px] h-[46px]"
        />
      </button>
      <div className="flex justify-between items-center">
        <div className="mr-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.05 21.6L16.125 18.7L13.925 20.9L13.225 20.2C12.8417 19.8167 12.65 19.3417 12.65 18.775C12.65 18.2084 12.8417 17.7334 13.225 17.35L17.45 13.125C17.8333 12.7417 18.3083 12.55 18.875 12.55C19.4417 12.55 19.9167 12.7417 20.3 13.125L21 13.825L18.8 16.025L21.7 18.95C21.9 19.15 22 19.3834 22 19.65C22 19.9167 21.9 20.15 21.7 20.35L20.45 21.6C20.25 21.8 20.0167 21.9 19.75 21.9C19.4833 21.9 19.25 21.8 19.05 21.6ZM22 5.90002L10.65 17.25L10.775 17.35C11.1583 17.7334 11.35 18.2084 11.35 18.775C11.35 19.3417 11.1583 19.8167 10.775 20.2L10.075 20.9L7.875 18.7L4.95 21.6C4.75 21.8 4.51667 21.9 4.25 21.9C3.98333 21.9 3.75 21.8 3.55 21.6L2.3 20.35C2.1 20.15 2 19.9167 2 19.65C2 19.3834 2.1 19.15 2.3 18.95L5.2 16.025L3 13.825L3.7 13.125C4.08333 12.7417 4.55833 12.55 5.125 12.55C5.69167 12.55 6.16667 12.7417 6.55 13.125L6.65 13.25L18 1.90002H22V5.90002ZM6.95 10.85L2 5.90002V1.90002H6L10.95 6.85002L6.95 10.85Z" fill="#96DC68" />
          </svg>
        </div>
        <div className="flex-1 text-lg font-semibold text-left">Weapon</div>
        <div className="flex text-xs justify-center items-center w-[61px] h-[30px] border border-solid border-[#7cce00] text-[#7cce00] rounded-[20px]">
          <Image
            src={key}
            alt=""
            className="w-[20px] h-[20px] mr-[3px]"
          />
          999
        </div>
      </div>
      <div className="flex justify-center items-center mt-[34px] mb-[10px]">
        <Image
          src={img11}
          alt=""
          className="w-[104px] h-[160px] mx-auto"
          style={{
            filter: "drop-shadow(0px 0px 24px #3B2E14)",
          }}
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center bg-[url('../../public/bg-btn.svg')] bg-cover h-[40px] p-[4px] w-[144px]">
          <span className="mr-2">1000</span>
          <div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_12_66)">
                <path fillRule="evenodd" clipRule="evenodd" d="M22.6689 2.32031C22.3918 1.79378 21.9405 1.37916 21.3917 1.1469C20.8988 0.896571 20.3548 0.762739 19.8017 0.755768H4.33444C3.75065 0.71942 3.16907 0.855464 2.66237 1.1469C2.34186 1.25191 2.04555 1.41958 1.79076 1.64011C1.53597 1.86065 1.32781 2.12962 1.17844 2.43131C0.84514 2.99549 0.700371 3.65077 0.765063 4.30241C0.812498 4.90411 1.02723 5.48069 1.38513 5.96738L10.975 22.6699C11.0946 22.8446 11.2545 22.9881 11.4412 23.0884C11.628 23.1886 11.8362 23.2427 12.0482 23.2461C12.2664 23.2642 12.4852 23.2196 12.6787 23.1174C12.8722 23.0153 13.0323 22.86 13.14 22.6699L22.7722 5.96738C23.1107 5.44149 23.2765 4.82353 23.2466 4.19935C23.2152 3.53457 23.0165 2.88836 22.6689 2.32031ZM10.8319 17.4583L3.44673 4.60369C3.25594 4.21256 3.1579 4.01699 3.1579 4.01699C3.1302 3.84247 3.16491 3.66379 3.25594 3.51221C3.32987 3.33538 3.47081 3.19481 3.64812 3.12108H10.8319V17.4583ZM20.6894 4.08835C20.7292 4.28546 20.7292 4.4885 20.6894 4.68562L13.14 17.5217V3.20565H19.6984C19.9303 3.18029 20.1648 3.21488 20.3794 3.30608L20.4827 3.40914C20.5861 3.40914 20.5861 3.59414 20.6894 3.59414C20.7371 3.75545 20.7371 3.92704 20.6894 4.08835Z" fill="white" />
              </g>
              <defs>
                <clipPath id="clip0_12_66">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <div className="flex justify-between items-center pt-[12px]">
          <div className="flex-1 text-xs text-left mr-2">What’s Inside</div>
          <div className="">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M6.075 15.909C6.9875 16.303 7.9625 16.5 9 16.5C10.0385 16.501 11.0135 16.3042 11.925 15.9097C12.8365 15.5152 13.6303 14.9808 14.3063 14.3063C14.9823 13.6318 15.5165 12.838 15.909 11.925C16.3015 11.012 16.4985 10.037 16.5 9C16.5015 7.963 16.3048 6.988 15.9098 6.075C15.5148 5.162 14.9803 4.36825 14.3063 3.69375C13.6323 3.01925 12.8385 2.485 11.925 2.091C11.0115 1.697 10.0365 1.5 9 1.5C7.9635 1.5 6.9885 1.697 6.075 2.091C5.1615 2.485 4.36775 3.01925 3.69375 3.69375C3.01975 4.36825 2.4855 5.162 2.091 6.075C1.6965 6.988 1.4995 7.963 1.5 9C1.5005 10.037 1.6975 11.012 2.091 11.925C2.4845 12.838 3.01875 13.6318 3.69375 14.3063C4.36875 14.9808 5.1625 15.515 6.075 15.909ZM9 6.75C9.2125 6.75 9.39075 6.678 9.53475 6.534C9.67875 6.39 9.7505 6.212 9.75 6C9.7495 5.788 9.6775 5.61 9.534 5.466C9.3905 5.322 9.2125 5.25 9 5.25C8.7875 5.25 8.6095 5.322 8.466 5.466C8.3225 5.61 8.2505 5.788 8.25 6C8.2495 6.212 8.3215 6.39025 8.466 6.53475C8.6105 6.67925 8.7885 6.751 9 6.75ZM8.25 8.25V12.75H9.75V8.25H8.25Z" fill="white" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
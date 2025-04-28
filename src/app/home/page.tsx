"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import icon1 from "../../../public/icons/icon-1.png";
import { Spin} from 'antd';
import Navbar from "../navbar/page";
import Header from "../header/page";
import { removeFromLocalStorage, saveToLocalStorage } from "../utils/localStorage";
import "../page.style.css"
import { dataMe, PropsCommon} from "@/app/utils/common";
import {Weapon} from "@/app/home/CustomFunc/Weapon";
import {SummonMonster} from "@/app/home/CustomFunc/SummonMonster";
import { StatisticPage} from "@/app/home/CustomFunc/Statistic";



export default function HomePage() {
    const [isStatic, setIsStatic] = useState("sum");
    const [loading, setLoading] = useState(false);
    const [initData, setinitData] = useState<string | null>(null);
    const [isAuTh, setisAuTh] = useState<boolean | null>(false);
    const [error, setError] = useState("");

    const [childKey, setChildKey] = useState(0);
    useEffect(() => {
        const tgApp = window.Telegram?.WebApp;
        setTimeout(async () => {
            if (tgApp) {
                tgApp.ready();
                if (tgApp.initData) {
                    const initDataUnsafe = tgApp.initDataUnsafe;
                    const params = new URLSearchParams(initDataUnsafe);
                    const startParam = params.get('start_param'); // ✅ this works
                    setinitData(tgApp.initData);
                    try {
                        const response = await fetch('https://ton-war.bytebuffer.co/auth', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                "initData": tgApp.initData,
                                "startParam": startParam
                            }),
                        })
                        if (!response.ok) {
                            const errorData = await response.json();
                            setisAuTh(false);
                            setError(errorData);
                            throw new Error(errorData.error || 'Failed to check membership');
                        } else {
                            const data = await response.json();
                            saveToLocalStorage("initData", tgApp.initData);
                            saveToLocalStorage("userInfo", data.userInfo);
                            saveToLocalStorage("token", data.token);
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
                                } else {
                                    const dataItem = await response.json();
                                    console.log(dataItem);
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
            }
        }, 500)

    }, [])

    const handleChildClick = (increment: string) => {
        setLoading(true);
        setTimeout(() => {
            setIsStatic(increment);
            setLoading(false);
        }, 1000)
    };

    const handleChildvoid = (data: dataMe) => {
        removeFromLocalStorage("userInfo");
        const userInfor = {
            userId: data.user_id,
            userName: data.first_name + " " + data.last_name,
            avatar: data.photo_url,
            currentTon: data.current_ton,
            currentPoint: data.current_point,
            currentKey: data.current_key,
            level: data.level
        }
        saveToLocalStorage("userInfo", userInfor);
        reloadChild();
    }

    const reloadChild = () => {
        setChildKey((prev) => prev + 1);
    };
    return (
        <main className="w-full">
            {(initData && isAuTh == true) &&
            <div className="w-full">
                <Header key={childKey} />
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
                                {isStatic === "stats" && <StatisticPage onButtonClick={handleChildClick} />}
                                {isStatic === "sum" && <SummonMonster onButtonClick={handleChildClick} onVoidData={handleChildvoid} />}
                                {isStatic === "weapon" && <Weapon onButtonClick={handleChildClick} onVoidData={handleChildvoid} />}

                            </Spin>
                        </div>
                    </div>
                </div>
                <Navbar />
            </div>
             }
            {(!initData) && <NotUser dataString={initData + error} />}
        </main>
    )
}

function NotUser({ dataString }: PropsCommon) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold mb-8">Ton War</h1>
            <p className="text-xl">intData: {dataString}</p>
        </div>
    )
}





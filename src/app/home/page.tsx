"use client";
import { useEffect, useRef, useState } from "react";
import { Spin } from 'antd';
import Navbar from "../navbar/page";
import Header from "../header/page";
import { removeFromLocalStorage, saveToLocalStorage } from "../utils/localStorage";
import "../page.style.css"
import { dataMe } from "@/app/utils/common";
import { Weapon } from "@/app/home/CustomFunc/Weapon";
import { SummonMonster } from "@/app/home/CustomFunc/SummonMonster";
import { retrieveRawInitData } from "@telegram-apps/sdk";

export default function HomePage() {
    const [isStatic, setIsStatic] = useState("sum");
    const [loading, setLoading] = useState(false);
    const [initDataTe, setinitData] = useState<string | null>(null);
    const [isAuTh, setisAuTh] = useState<boolean | null>(false);
    const [childKey, setChildKey] = useState(0);
    useEffect(() => {
        const initData = retrieveRawInitData()
        const getInitData = async () => {
            const stored = localStorage.getItem('token');

            if (initData) {
                setinitData(initData);
                removeFromLocalStorage("userInfo");
                if (stored !== null && stored !== undefined) {
                    const dataToken = JSON.parse(stored);
                    getDataUser(dataToken);
                } else {
                    try {
                        const response = await fetch('https://ton-war.bytebuffer.co/auth', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                "initData": initData,
                            }),
                        })
                        if (!response.ok) {
                            const errorData = await response.json();
                            setisAuTh(false);
                            throw new Error(errorData.error || 'Failed to check membership');
                        } else {
                            const data = await response.json();
                            saveToLocalStorage("initData", "initData");
                            saveToLocalStorage("token", data.token);
                            getDataUser(data.token);
                        }
                    } catch (error) {
                        console.error('Error loggin', error);
                        setisAuTh(false);
                    } finally {
                    }
                }
            }
        }

        getInitData();
    }, [])

    const getDataUser = async (token: string) => {
        try {
            const response = await fetch('https://ton-war.bytebuffer.co/account/me?text=day%20la%20gi%20%3F', {
                method: 'GET',
                headers: {
                    'Authorization': token,
                },
            })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to check');
            } else {
                const dataItem = await response.json();
                const dataInfor = dataItem.data;
                const userInfor = {
                    userId: dataInfor.user_id,
                    userName: dataInfor.username ? dataInfor.username : dataInfor.firstName + " " + dataInfor.lastName,
                    avatar: dataInfor.photoUrl,
                    currentTon: dataInfor.currentTon,
                    currentPoint: dataInfor.currentPoint,
                    currentKey: dataInfor.currentKey,
                    level: dataInfor.level,
                    totalReward: dataInfor.totalReward,
                    dailyReward: dataInfor.dailyReward,
                    languageCode: dataInfor.languageCode
                }
                saveToLocalStorage("userInfo", userInfor);
            }
        } catch (error) {
            console.error('Error loggin', error);
        } finally {
        }
        setisAuTh(true);
    }

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
            level: data.level,
            totalReward: data.totalReward,
            dailyReward: data.dailyReward,
            languageCode: data.language_code
        }
        saveToLocalStorage("userInfo", userInfor);
        reloadChild();
    }

    const reloadChild = () => {
        setChildKey((prev) => prev + 1);
    };

    const auto = false;
    const [percent, setPercent] = useState(-50);
    const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

    useEffect(() => {
        timerRef.current = setTimeout(() => {
            setPercent((v) => {
                const nextPercent = v + 5;
                return nextPercent > 150 ? -50 : nextPercent;
            });
        }, 100);
        return () => clearTimeout(timerRef.current!);
    }, [percent]);
    const mergedPercent = auto ? 'auto' : percent;


    return (
        <main className="w-full bg-black mt-[100px]">
            {(initDataTe && isAuTh == true) &&
                <div className="w-full">
                    <Header key={childKey} />
                    <div className="text-white w-full mx-auto">
                        <div className="mt-22">
                            <div className="background-color-radi mx-[8px] border border-[rgba(255,255,255,0.4)]">
                                <Spin spinning={loading}>
                                    {isStatic === "sum" && <SummonMonster onButtonClick={handleChildClick} onVoidData={handleChildvoid} />}
                                    {isStatic === "weapon" && <Weapon onButtonClick={handleChildClick} onVoidData={handleChildvoid} />}

                                </Spin>
                            </div>
                        </div>
                    </div>
                    <Navbar />
                </div>
            }
            {((!initDataTe) || (initDataTe && isAuTh == false)) && <div className="flex min-h-screen flex-col items-center justify-center p-4">
                <Spin percent={mergedPercent} tip={'loading...'} size="large" ></Spin>
                <div className={'ps-2 mt-2'} style={{ color: '#1677ff' }}>Getting account</div>
            </div>}
        </main>
    )
}





"use client";
import type React from "react";
import Navbar from "@/app/navbar/page";
import { FileTextOutlined, LinkOutlined, RedoOutlined } from "@ant-design/icons";
import diamond from "../../../public/icons/diamond.svg";
import wallet from "../../../public/icons/wallet.svg";
import Image from "next/image";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useCallback, useEffect, useState } from "react";
import { Address } from "@ton/core";

const WalletPage: React.FC = () => {
    const [tonConnectUI] = useTonConnectUI();
    const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleWalletConnection = useCallback((address: string) => {
        setTonWalletAddress(address);
        console.log("Wallet connected successfully!");
        setIsLoading(false);
    }, []);

    const handleWalletDisconnection = useCallback(() => {
        setTonWalletAddress(null);
        console.log("Wallet disconnected successfully!");
        setIsLoading(false);
    }, []);

    useEffect(() => {
        const checkWalletConnection = async () => {
            if (tonConnectUI.account?.address) {
                handleWalletConnection(tonConnectUI.account?.address);
            } else {
                handleWalletDisconnection();
            }
        };

        checkWalletConnection();

        const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
            if (wallet) {
                handleWalletConnection(wallet.account.address);
            } else {
                handleWalletDisconnection();
            }
        });

        return () => {
            unsubscribe();
        };
    }, [tonConnectUI, handleWalletConnection, handleWalletDisconnection]);

    const handleWalletAction = async () => {
        if (tonConnectUI.connected) {
            setIsLoading(true);
            await tonConnectUI.disconnect();
        } else {
            await tonConnectUI.openModal();
        }
    };

    const formatAddress = (address: string) => {
        const tempAddress = Address.parse(address).toString();
        return `${tempAddress.slice(0, 4)}...${tempAddress.slice(-4)}`;
    };

    if (isLoading) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center">
                <div className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded">
                    Loading...
                </div>
            </main>
        );
    }
    return (
        <div>
            {tonWalletAddress ? (
                <main className="pb-[120px] background-color-main  min-h-[100vh] pt-[40px] relative">
                    <div className="w-full">
                        <div className=" flex justify-center text-2xl  text-white">
                            <h1> Wallet </h1>
                        </div>
                        <div className="mt-[2px]  flex justify-center  text-white">
                            <h4> Stay connected and earn reward </h4>
                        </div>

                        <div className="mt-[15px] h-[80px] flex justify-center  ">
                            <div className={'w-[90%]   background-color-gra-green px-[20px] items-center rounded-4xl flex justify-between'}>
                                <span className={'items-center'}>
                                    <nav className={'text-amber-50 text-size-info'}>Total assets</nav>
                                    <nav className={'text-yellow-400 font-bold'}>$ 0.103025</nav>
                                </span>
                                <span className={'text-amber-50 font-bold text-2xl '}> <FileTextOutlined /></span>
                            </div>
                        </div>

                        <div className="mt-[20px] h-[55px] flex justify-center  ">
                            <div className={'w-[90%] h-[100%]    items-center rounded-4xl flex justify-between'}>
                                <div className={' w-[47%] h-[55px] font-bold pt-[13px] text-center inline-block grounded-radiants px-[10px] items-center rounded-4xl text-amber-50 flex justify-between'}>
                                    Deposit
                                </div>

                                <div className={'w-[47%] pt-[13px] font-bold h-[55px] text-center  inline-block grounded-radiants  px-[20px] items-center rounded-4xl text-amber-50 flex justify-between'}>
                                    Withdraw
                                </div>
                            </div>
                        </div>

                        <div className="mt-[10px] h-[55px] flex justify-center  ">
                            <div className={'w-[90%]   px-[10px] items-center rounded-4xl flex justify-between'}>
                                <div className={'  items-center rounded-4xl text-amber-50 flex justify-between'}>
                                    Deposit
                                </div>

                                <div className={' items-center rounded-4xl text-amber-50 flex justify-between'}>
                                    <RedoOutlined /> &nbsp; Value
                                </div>
                            </div>
                        </div>
                        <div className="mt-[10px] h-[65px] flex justify-center  ">
                            <div className={' w-[90%] h-[65px] font-bold pt-[20px]  grounded-radiants inline-block px-[20px]  rounded-4xl text-amber-50 '}>
                                <span className={'text-yellow-400 font-bold'}>560</span> &nbsp;
                                <span className={'text-amber-50 font-bold'}>RCAT</span>

                            </div>
                        </div>

                        <div className="mt-[10px] h-[65px] flex justify-center  ">
                            <div className={' w-[90%] h-[65px] font-bold  flex grounded-radiants px-[20px] items-center  rounded-4xl text-amber-50'}>
                                <span>
                                    <Image
                                        src={diamond}
                                        alt=""
                                        className="w-[15px] h-[15px]"
                                    /> </span> &nbsp;

                                <span className={'text-yellow-400 font-bold'}>0.0317</span> &nbsp;
                                <span className={'text-amber-50 font-bold'}>TON</span>
                            </div>
                        </div>

                        <div className="mt-[10px] h-[55px] flex justify-center  ">
                            <div className={' px-[20px] w-[90%] h-[55px] font-bold  flex justify-between  items-center  rounded-4xl text-white absolute bottom-[130px] bg-gray-800'}>
                                <span className={'flex text-center items-center'}>
                                    <span className={'text-white'} >
                                        <Image style={{ color: 'white' }}
                                            src={wallet}
                                            alt=""
                                            className="w-[30px] h-[30px]"
                                        />

                                    </span>
                                    &nbsp;

                                    {formatAddress(tonWalletAddress)}
                                </span>
                                <button onClick={handleWalletAction}>
                                    <LinkOutlined style={{ fontSize: '25px' }} />
                                </button>
                            </div>


                        </div>
                    </div>
                </main>
            ) : (
                <main className="pb-[120px] background-color-main  min-h-[100vh] pt-[40px] relative flex items-center justify-center">
                    <div className="w-full text-center  ">
                        <h1 className="text-4xl font-bold mb-8">TON Connect</h1>
                        <button
                            onClick={handleWalletAction}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Connect TON Wallet
                        </button>
                    </div>
                </main>
            )}
            <Navbar />
        </div>
    );
};

export default WalletPage;

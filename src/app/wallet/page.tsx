"use client";
import type React from "react";
import Navbar from "@/app/navbar/page";
import { FileTextOutlined, LinkOutlined, RedoOutlined } from "@ant-design/icons";
import diamond from "../../../public/icons/diamond.svg";
import wallet from "../../../public/icons/wallet.svg";
import Image from "next/image";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useCallback, useEffect, useState } from "react";
import { Address, beginCell, Cell, toNano } from "@ton/core";
import { DataUser } from "../utils/common";
import { getFromLocalStorage } from "../utils/localStorage";

const WalletPage: React.FC = () => {
    const [tonConnectUI] = useTonConnectUI();
    const userFriendlyAddress = useTonAddress();
    const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [dataItem, setDataItem] = useState<DataUser | null>(null);

    const [tabShow, setTabShow] = useState('home');

    const handleWalletConnection = useCallback((address: string) => {
        setTonWalletAddress(address);
        console.log("Wallet connected successfully!");
        const stored = getFromLocalStorage('userInfo');
        if (stored) {
            setDataItem(stored);
        }
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

    const handleClickTran = (tab: string) => {
        setTabShow(tab);
    }

    const handleChildClick = (increment: string) => {
        setTabShow(increment);
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
                    {tabShow === 'home' && <div className="w-full">
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

                        <div className="mt-[20px] h-[55px] flex justify-center">
                            <div className={'w-[90%] h-[100%] items-center rounded-4xl flex justify-between'}>
                                <button className="cursor-pointer w-[47%] h-[55px] font-bold text-center inline-block grounded-radiants px-[10px] items-center rounded-4xl text-amber-50 flex justify-between" onClick={() => handleClickTran('deposit')}>
                                    Deposit
                                </button>

                                <button className="cursor-pointer w-[47%] font-bold h-[55px] text-center  inline-block grounded-radiants  px-[20px] items-center rounded-4xl text-amber-50 flex justify-between" onClick={() => handleClickTran('withdraw')}>
                                    Withdraw
                                </button>
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
                                <span className={'text-yellow-400 font-bold'}>{dataItem?.currentPoint}</span> &nbsp;
                                <span className={'text-amber-50 font-bold'}>eBH</span>

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

                                <span className={'text-yellow-400 font-bold'}>{dataItem?.currentTon}</span> &nbsp;
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
                    </div>}
                    {tabShow === 'deposit' && <Deposit address={userFriendlyAddress} onButtonClick={handleChildClick} />}
                    {tabShow === 'withdraw' && <Withdraw address={userFriendlyAddress} onButtonClick={handleChildClick} />}
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

type Props = {
    address: string;
    onButtonClick: (increment: string) => void;
};

function Withdraw({ address, onButtonClick }: Props) {

    const [formData, setFormData] = useState({
        amount: 0,
        code: '',
        address: '',
        fee: 10000,
    });

    const handeleSendCode = async () => {
        const stored = localStorage.getItem('token');
        if (stored !== null && stored !== undefined) {
            try {
                const response = await fetch('https://ton-war.bytebuffer.co/otp', {
                    method: 'GET',
                    headers: {
                        'Authorization': JSON.parse(stored),
                    },
                })
                if (response.ok) {
                    const dataTest = await response.json();
                    console.log(dataTest);
                }
            } catch (error) {
                console.error('GET failed:', error);
            }
        } else {
            console.error("no token");
        }
    }

    const handleWithdraw = async () => {
        formData.address = address;
        console.log(formData);
        const stored = localStorage.getItem('token');
        if (stored !== null && stored !== undefined) {
            try {
                const response = await fetch('https://ton-war.bytebuffer.co/withdraw', {
                    method: 'POST',
                    headers: {
                        'Authorization': JSON.parse(stored),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "amount": Number(formData.amount),
                        "wallet": address,
                        "otp": formData.code
                    }),
                })
                if (response.ok) {
                    const dataTest = await response.json();
                    console.log(dataTest);
                }
            } catch (error) {
                console.error('GET failed:', error);
            }
        } else {
            console.error("no token");
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    return (
        <div className="min-h-screen text-white flex flex-col items-center p-6">
            {/* Header */}
            <div className="w-full max-w-md flex items-center justify-between text-xl font-semibold mb-6">
                <button className="text-white text-2xl cursor-pointer grounded-radiants-input w-[40px] h-[40px] flex items-center justify-center" onClick={() => onButtonClick("home")}>{'<'} </button>
                <h1 className="text-center flex-1">Withdraw <span className="ml-1">💎</span></h1>
                <div className="w-6" /> {/* placeholder to balance the back button */}
            </div>

            {/* Main Card */}
            <div className="w-full max-w-md p-6 rounded-2xl space-y-5">

                {/* Address */}
                <div>
                    <label className="text-sm mb-1 block">Address</label>
                    <input
                        disabled
                        className="w-full grounded-radiants-input text-gray-400 p-3 rounded-lg"
                        value={Address.parse(address).toString()}
                    />
                </div>

                {/* Amount */}
                <div>
                    <div className="flex justify-between mb-1">
                        <label className="text-sm">Amount</label>
                        <span className="text-sm text-gray-400">Available 0.04 TON</span>
                    </div>
                    <div className="relative">
                        <input
                            name="amount"
                            className="w-full grounded-radiants-input p-3 pr-16 rounded-lg focus:outline-none"
                            placeholder="0"
                            type="number"
                            value={formData.amount}
                            onChange={handleChange}
                        />
                        <button className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 text-sm text-white background-color-gra-green px-3 py-1 rounded-lg">
                            MAX
                        </button>
                    </div>
                </div>

                {/* Code */}
                <div>
                    <label className="text-sm mb-1 block">Code</label>
                    <div className="relative">
                        <input
                            className="w-full grounded-radiants-input p-3 pr-28 rounded-lg focus:outline-none"
                            placeholder=""
                            type="text"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                        />
                        <button className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 text-sm text-white background-color-gra-green px-3 py-1 rounded-lg" onClick={handeleSendCode}>
                            Send code
                        </button>
                    </div>
                </div>

                {/* Fee */}
                {/* <div>
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>Withdraw Fee</span>
                    </div>
                    <input
                        disabled
                        className="w-full grounded-radiants-input text-gray-400 p-3 rounded-lg"
                        value={formData.fee}
                        onChange={handleChange}
                    />
                </div> */}

                {/* Withdraw Button */}
                <button onClick={handleWithdraw} className="w-full cursor-pointer py-3 rounded-full text-white font-semibold background-color-gra-green">
                    Withdraw
                </button>
            </div>
        </div>
    );
};


function Deposit({ onButtonClick }: Props) {
    const [tonConnectUI] = useTonConnectUI();
    const addressNhan = "0QDqpyz11y8BMxUi-PNUxgTdLiLIjFV1IcC3-1Bsc3Gt095c";
    const [formData, setFormData] = useState({
        amount: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDeposit = async () => {
        try {
            const stored = getFromLocalStorage<DataUser>('userInfo');
            debugger;
            if (stored) {
                const payload = beginCell()
                    .storeUint(0, 32)
                    .storeStringTail(stored.userId ? stored.userId : "")
                    .endCell();
                const result = await tonConnectUI.sendTransaction({
                    validUntil: Math.floor(Date.now() / 1000) + 600,
                    messages: [
                        {
                            address: addressNhan, // địa chỉ nhận
                            amount: toNano(formData.amount).toString(), // 0.1 TON = 100M nanoTON
                            payload: payload.toBoc().toString("base64"),
                        },
                    ],
                })
                console.log("result: " + JSON.stringify(result));
                const bocBase64 = result.boc;
                const cell = Cell.fromBase64(bocBase64);
                const slice = cell.beginParse();
                console.log(slice);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="min-h-screen text-white flex flex-col items-center p-6">
            {/* Header */}
            <div className="w-full max-w-md flex items-center justify-between text-xl font-semibold mb-6">
                <button className="text-white text-2xl cursor-pointer grounded-radiants-input w-[40px] h-[40px] flex items-center justify-center" onClick={() => onButtonClick("home")}>{'<'} </button>
                <h1 className="text-center flex-1">Deposit <span className="ml-1">💎</span></h1>
                <div className="w-6" /> {/* placeholder to balance the back button */}
            </div>

            {/* Main Card */}
            <div className="w-full max-w-md p-6 rounded-2xl space-y-5">

                {/* Address */}
                <div>
                    <label className="text-sm mb-1 block">Address</label>
                    <input
                        disabled
                        className="w-full grounded-radiants-input text-gray-400 p-3 rounded-lg"
                        value={Address.parse(addressNhan).toString()}
                    />
                </div>

                {/* Amount */}
                <div>
                    <div className="flex justify-between mb-1">
                        <label className="text-sm">Amount</label>
                        <span className="text-sm text-gray-400">Available 0.04 TON</span>
                    </div>
                    <div className="relative">
                        <input
                            name="amount"
                            className="w-full grounded-radiants-input p-3 pr-16 rounded-lg focus:outline-none"
                            placeholder="0"
                            type="number"
                            value={formData.amount}
                            onChange={handleChange}
                        />
                        <button className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 text-sm text-white background-color-gra-green px-3 py-1 rounded-lg">
                            MAX
                        </button>
                    </div>
                </div>
                <button onClick={handleDeposit} className="w-full cursor-pointer py-3 rounded-full text-white font-semibold background-color-gra-green">
                    Deposit
                </button>
            </div>
        </div>
    );
};

export default WalletPage;

"use client";
import type React from "react";
import Navbar from "@/app/navbar/page";
import { FileTextOutlined, LinkOutlined, RedoOutlined } from "@ant-design/icons";
import diamond from "../../../public/icons/diamond.svg";
import wallet from "../../../public/icons/wallet.svg";
import Image from "next/image";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useCallback, useEffect, useState } from "react";
import { Address, beginCell, Cell, fromNano, toNano } from "@ton/core";
import { DataUser } from "../utils/common";
import { getFromLocalStorage } from "../utils/localStorage";
import { HistoryWallet } from "@/app/wallet/historyWallet";
import {Form, Input, Modal} from "antd";

const WalletPage: React.FC = () => {
    const [tonConnectUI] = useTonConnectUI();
    const userFriendlyAddress = useTonAddress();
    const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [dataItem, setDataItem] = useState<DataUser | null>(null);

    const [tabShow, setTabShow] = useState('home');

    const [isShowHistoryWallet, setIsShowHistoryWallet] = useState(false);

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

    function isNumber(num: number) {
        return !(num === null || num === undefined || isNaN(num) || num.toString().trim().length === 0);
    }

    function formatNumberExFloat(num: number) {
        if (!isNumber(num)) {
            return num;
        }
        const rounded = Number(num.toFixed(2));
        const spli = rounded.toString().split(".");
        const intPart = spli[0];
        let decimalPart = spli[1];
        const formattedInt = new Intl.NumberFormat('en-US').format(Number(intPart));
        if (!decimalPart || Number(decimalPart) === 0) {
            return formattedInt;
        } else if (decimalPart.endsWith("0")) {
            decimalPart = decimalPart.slice(0, -1);
        }
        return `${formattedInt}.${decimalPart}`;
    }



    if (isLoading) {
        return (
            <main className="flex pt-[80px] min-h-screen flex-col items-center background-color-main  justify-center">
                <div className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded">
                    Loading...
                </div>
            </main>
        );
    }
    return (
        <div className="pt-[80px] background-color-main ">
            {!isShowHistoryWallet &&
                <div>
                    {tonWalletAddress ? (
                        <main className="pb-[120px]  min-h-[100vh] pt-[40px] relative">
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
                                        <span onClick={() => { setIsShowHistoryWallet(true) }} className={'text-amber-50 font-bold text-2xl '}> <FileTextOutlined /></span>
                                    </div>
                                </div>

                                <div className="mt-[20px] h-[55px] flex justify-center">
                                    <div className={'w-[90%] h-[100%] items-center rounded-4xl flex justify-between'}>
                                        <button className="cursor-pointer w-[47%] text-lg h-[55px] font-bold text-center inline-block grounded-radiants px-[10px] items-center rounded-4xl text-amber-50 flex justify-between" onClick={() => handleClickTran('deposit')}>
                                            Deposit
                                        </button>

                                        <button className="cursor-pointer w-[47%] text-lg font-bold h-[55px] text-center  inline-block grounded-radiants  px-[20px] items-center rounded-4xl text-amber-50 flex justify-between" onClick={() => handleClickTran('withdraw')}>
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
                                        <span className={'text-yellow-400 font-bold'}>{dataItem?.currentPoint ? formatNumberExFloat(dataItem?.currentPoint) : 0}</span> &nbsp;
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

                                        <span className={'text-yellow-400 font-bold'}>{dataItem?.currentTon ? formatNumberExFloat(dataItem?.currentTon) : 0}</span> &nbsp;
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
                </div>}

            {isShowHistoryWallet &&
                <HistoryWallet onBack={() => { setIsShowHistoryWallet(false) }} />
            }
            <Navbar />
        </div>
    );
};

type Props = {
    address: string;
    onButtonClick: (increment: string) => void;
};

function Withdraw({ address, onButtonClick }: Props) {
    const [form]= Form.useForm()


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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTextMessage, setIsTextMessage] = useState("");

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        onButtonClick("home");
    };

    const handleWithdraw = async () => {

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
                        "amount": form.getFieldValue(('amount')),
                        "wallet": address,
                        "otp": form.getFieldValue(('code'))
                    }),
                })
                if (response.ok) {
                    const dataTest = await response.json();
                    if(dataTest.rc === "0") {
                        setIsTextMessage("WITHDRAW SUCCESS !");
                        showModal();
                    }else {
                        setIsTextMessage(dataTest.rd);
                        showModal()
                    }
                }
            } catch (error) {
                console.error('GET failed:', error);
            }
        } else {
            console.error("no token");
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const   {value}  = e.target;
        form.setFieldValue('fee',Number(value) * 10000)
    };
    return (
        <div className=" text-white flex flex-col items-center p-6">
            {/* Header */}
            <div className="w-full max-w-md flex items-center justify-between text-xl font-semibold mb-6">
                <button className="text-white text-2xl cursor-pointer grounded-radiants-input w-[40px] h-[40px] flex items-center justify-center" onClick={() => onButtonClick("home")}>{'<'} </button>
                <h1 className="text-center flex-1">Withdraw <span className="ml-1">💎</span></h1>
                <div className="w-6" /> {/* placeholder to balance the back button */}
            </div>

            {/* Main Card */}
            <div className="w-full max-w-md p-6 rounded-2xl space-y-5" >
                <Form form={form} initialValues={{address:Address.parse(address).toString(), amount:0, fee:0}}>
                    {/* Address */}
                    <div>
                        <label className="text-sm mb-1 block text-white">Address</label>
                        <Form.Item name={'address'}>
                            <Input disabled />
                        </Form.Item>
                    </div>

                    {/* Amount */}
                    <div>
                        <div className="flex justify-between mb-1">
                            <label className="text-sm text-white">Amount <span style={{color:"red"}}>*</span></label>
                            <span className="text-sm text-gray-400">Available 0.04 TON</span>
                        </div>
                        <div className="relative">
                            <Form.Item name={'amount'}
                                       rules={[
                                           {
                                               required: true, message: 'Not null!'
                                           }]}>
                                <Input  type="number" min={0}  onChange={handleChange}/>
                            </Form.Item>
                            <button className="absolute cursor-pointer right-2 top-[22px] -translate-y-1/2 text-sm text-white background-color-gra-green px-3 py-1 rounded-lg">
                                MAX
                            </button>
                        </div>
                    </div>

                    {/* Code */}
                    <div>
                        <label  className="text-sm mb-1 block  text-white">Code <span style={{color:"red"}}>*</span></label>
                        <div className="relative">
                            <Form.Item name={'code'}
                                       rules={[
                                           {
                                               required: true, message: 'Not null!'
                                           }]}
                            >
                                <Input type="number" onChange={handleChange}/>
                            </Form.Item>
                            <button className="absolute cursor-pointer right-2 top-[22px] -translate-y-1/2 text-sm text-white background-color-gra-green px-3 py-1 rounded-lg" onClick={handeleSendCode}>
                                Send code
                            </button>
                        </div>
                    </div>

                    {/* Fee */}
                    <div>
                        <div className="flex justify-between text-sm text-gray-400 mb-1">
                            <span>Withdraw Fee</span>
                        </div>
                        <Form.Item name={'fee'}>
                            <Input disabled type="number"/>
                        </Form.Item>
                    </div>

                    {/* Withdraw Button */}
                    <button type={'submit'} onClick={handleWithdraw} className="w-full cursor-pointer py-3 rounded-full text-white font-semibold background-color-gra-green">
                        Withdraw
                    </button>
                </Form>
                <Modal
                    title=""
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleOk}
                >
                    <p>{isTextMessage}</p>
                </Modal>
            </div>
        </div>
    );
};


function Deposit({ onButtonClick }: Props) {
    const [tonConnectUI] = useTonConnectUI();
    const addressNhan = "0QDqpyz11y8BMxUi-PNUxgTdLiLIjFV1IcC3-1Bsc3Gt095c";

    const [form]= Form.useForm()

    const handleDeposit = async () => {
        try {
            const stored = getFromLocalStorage<DataUser>('userInfo');
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
                            amount: toNano(form.getFieldValue('amount')).toString(), // 0.1 TON = 100M nanoTON
                            payload: payload.toBoc().toString("base64"),
                        },
                    ],
                })
                const bocBase64 = result.boc;
                const cell = Cell.fromBase64(bocBase64);
                const buffer = cell.hash();
                const hashHex = buffer.toString("hex");
                fetchTxDetails(hashHex, stored.userId ? stored.userId : "");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTextMessage, setIsTextMessage] = useState("");

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        onButtonClick("home");
    };

    const fetchTxDetails = async (hash: string, userId: string) => {
        try {
            const response = await fetch(`https://testnet.toncenter.com/api/v3/transactionsByMessage?msg_hash=${hash}&limit=10&offset=0`, {
                method: 'GET',
            })
            if (response.ok) {
                const dataTest = await response.json();
                const storedToken = localStorage.getItem('token');
                if (storedToken !== null && storedToken !== undefined) {
                    const response = await fetch('https://ton-war.bytebuffer.co/deposit', {
                        method: 'POST',
                        headers: {
                            'Authorization': JSON.parse(storedToken),
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            userName: userId ? userId : "",
                            amount: fromNano(dataTest.transactions[0].out_msgs[0].value),
                            tx_hash: dataTest.transactions[0].out_msgs[0].hash
                        }),
                    })
                    if (response.ok) {
                        const dataTest = await response.json();
                        if(dataTest.rd === "OK") {
                            setIsTextMessage("DEPOSIT SUCCESS !");
                            showModal();
                        }else {
                            setIsTextMessage("DEPOSIT ERROR");
                            showModal();
                        }
                    }
                } else {
                    console.error("no token");
                }
            }

        } catch (e) {
            console.error('Failed to fetch transaction:', e);
        }
    };
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
                <Form form={form} initialValues={{address:Address.parse(addressNhan).toString(), amount:0}}>
                    {/* Address */}
                    <div>
                        <label className="text-sm mb-1 block">Address</label>

                        <Form.Item name={'address'}
                                   rules={[
                                       {
                                           required: true, message: 'Not null!'
                                       }]}
                        >
                            <Input />
                        </Form.Item>
                    </div>

                    {/* Amount */}
                    <div>
                        <div className="flex justify-between mb-1">
                            <label className="text-sm text-white">Amount <span style={{color:"red"}}>*</span></label>
                            <span className="text-sm text-gray-400">Available 0.04 TON</span>
                        </div>
                        <div className="relative">
                            <Form.Item name={'amount'}
                                       rules={[
                                           {
                                               required: true, message: 'Not null!'
                                           }]}>
                                <Input  type="number" min={0} />
                            </Form.Item>
                            <button className="absolute cursor-pointer right-2 top-[22px] -translate-y-1/2 text-sm text-white background-color-gra-green px-3 py-1 rounded-lg">
                                MAX
                            </button>
                        </div>
                    </div>
                    <button type={'submit'} onClick={handleDeposit} className="w-full cursor-pointer py-3 rounded-full text-white font-semibold background-color-gra-green">
                        Deposit
                    </button>
                </Form>
                <Modal
                    title=""
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleOk}
                >
                    <p>{isTextMessage}</p>
                </Modal>
            </div>
        </div>
    );
};


export default WalletPage;

"use client";
import type React from "react";
import Navbar from "@/app/navbar/page";
import {FileTextOutlined, LinkOutlined, RedoOutlined} from "@ant-design/icons";
import diamond from "../../../public/icons/diamond.svg";
import wallet from "../../../public/icons/wallet.svg";
import Image from "next/image";
const WalletPage: React.FC = () => {


    return (
        <main className="pb-[120px] background-color-main  min-h-[100vh] pt-[40px] relative">
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
                        <RedoOutlined/> &nbsp; Value
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
                        <Image style={{color:'white'}}
                            src={wallet}
                            alt=""
                            className="w-[30px] h-[30px]"
                        />

                      </span>
                    &nbsp;

                        abcs
                    </span>
                    <LinkOutlined style={{fontSize:'25px'}} />
                </div>


            </div>
            <Navbar />
        </main>
    );
};

export default WalletPage;

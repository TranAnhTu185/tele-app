"use client";
import type React from "react";
import Navbar from "@/app/navbar/page";
import Image from "next/image";
import diamond from "../../../public/icons/diamond.svg";
import gift from "../../../public/icons/gift.svg";
import {TeamOutlined} from "@ant-design/icons";
import knife1 from "../../../public/icons/knife1.svg";
import {Col, Row, Tabs} from "antd";
const InvitePage: React.FC = () => {

    return (
        <main className="pb-[120px] mt-[80px] background-color-main pt-[30px] relative">
            <div className={'flex justify-center text-white font-bold text-2xl'}>
                Invite Friends

            </div>

            <div className={'flex justify-center text-white text-xl'}>
                Earn more TON coin

            </div>

            <div className={'w-full mt-5 flex justify-center text-white text-xl'}>
                <div className={'w-[95%] flex justify-center text-white me-2'}>

                        <div className={' w-[45%] h-[65px]  flex grounded-radiants items-center text-center '}>
                            <div className={'w-full'}>
                                <nav className={'text-center justify-center flex  text-sm '} >Total Friends</nav>
                                <nav className={' text-center justify-center flex text-lg '} >
                                   <span className={'text-amber-400 '}> 3 </span> &nbsp;
                                    <TeamOutlined />
                                </nav>
                            </div>

                        </div>
                    <div className={' w-[45%] h-[65px] ms-2 flex grounded-radiants items-center text-center '}>
                        <div className={'w-full'}>
                            <nav className={'text-center justify-center flex  text-sm '} >TON Earned</nav>
                            <nav className={' text-center justify-center flex text-lg '} >
                                <span className={'text-amber-400 '}> 2.23 </span> &nbsp;

                                <span className={'mt-[5px]'}><Image
                                    src={diamond}
                                    alt=""
                                    className="w-[15px] h-[15px]"
                                /></span>

                        </nav>
                        </div>

                    </div>
                </div>


            </div>

            <div className={' w-full mt-[30px]  flex justify-center items-center text-center text-white '}>
                <div className={'pb-[35px] w-[90%] grounded-radiants me-2 relative'}>

                    <div className={'w-[40px] left-[50%] -top-5 -translate-x-1/2 transform-gpu flex justify-center bg-other items-center  h-[40px] absolute  rounded-full'}>
                        <Image
                            src={gift}
                            alt=""
                            className="w-[25px] h-[25px] "
                        />
                    </div>
                    <div className={'mt-7 font-bold'}> Reward</div>

                    <div className={' mt-3 ps-3 w-[95%] flex text-sm justify-between'} >
                       <span>Each Egg opened by your friend</span>
                        <span className={'text-amber-400 flex'}>
                                5%
                                <span className={'ms-1 mt-[3px]'}><Image
                                    src={diamond}
                                    alt=""
                                    className="w-[15px] h-[15px]"
                                /></span>
                        </span>
                    </div>

                    <div className={' mt-3 ps-3 w-[95%] flex text-sm justify-between'} >
                        <span>Invite 1 friend</span>
                        <span className={'text-amber-400 flex'}>
                                +500
                                <span className={'ms-1 mt-[2px] text-xs text-white'}>
                                eBH
                                    </span>
                        </span>
                    </div>

                    <div className={' mt-3 ps-3 w-[95%] flex text-sm justify-between'} >
                        <span>Invite 1 premium friend</span>
                        <span className={'text-amber-400 flex'}>
                                +1,000
                                 <span className={'ms-1 mt-[2px] text-xs text-white'}>
                                 eBH
                                    </span>
                        </span>
                    </div>
                    <div className={' mt-3 ps-3 w-[95%] flex text-sm justify-between text-gray-500'} >
                        <span>*Friend open at least 1 egg</span>

                    </div>
                </div>



            </div>

            <div className={'mt-[30px] pe-[40px] w-full p-[20px] flex justify-center items-center text-center text-white '}>
                <Tabs
                    className={'w-full '}
                    defaultActiveKey="1"
                    items={[
                        {
                            label: 'List Friends',
                            key: '1',
                            children: <LastedRewardFunct/>,
                        }
                    ]}
                />
            </div>

            <Navbar />
        </main>
    );
};

interface Rewards{
    name: string;
    avatar:string;
    value:number;
}

function  LastedRewardFunct(){
    const data:Rewards[]=[
        {
        value:1,
        avatar:knife1,
        name:'abcd'
        },
        {
        value:1,
        avatar:knife1,
        name:'abcd'
        },
        {
        value:1,
        avatar:knife1,
        name:'abcd'
        },
    ]
    return <div >
        {(() => {
            const arr = [];
            for (let i = 0; i < data.length; i++) {
                arr.push(
                    <Row className={' h-[75px] text-lg mt-3 flex  ps-[3px] pe-[10px] items-center  text-amber-50'} gutter={12}>
                        <Col span={4}>
                            <div className={'w-[57px] h-[57px] flex justify-center items-center bg-gray-700 rounded-full'}>
                                <Image
                                    src={knife1}
                                    alt=""
                                    className="w-[25px] h-[25px]"
                                />
                            </div>
                        </Col>
                        <Col span={14}>
                            <div className={'ms-2 text-left'}>
                                <nav className={' text-lg'}>{data[i].name}</nav>
                                <nav className={' text-xs'}>+{data[i].value}  Egg(s)</nav>

                            </div>
                        </Col>
                        <Col span={6}>
                            <div className={' text-amber-400  flex justify-center items-center '}>

                             +{data[i].value}  TON

                            </div>
                        </Col>
                    </Row>


                );
            }
            return arr;
        })()}
    </div>
}


export default InvitePage;

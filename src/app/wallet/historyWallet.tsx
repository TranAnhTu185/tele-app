"use client";
import React, {useState} from "react";
import {Col,  Row, Segmented} from "antd";
import {DataHistory} from "@/app/utils/common";
import {toFormat} from "@/app/utils/dateUtil";
import "./page.css"

interface State {
    onBack?: () => void
}
export function HistoryWallet ({onBack}:State) {
    const [alignValue, setAlignValue] = useState('withdraw');

    return     <>
           <main className=" pb-[120px] background-color-main w-full  min-h-[100vh] pt-[30px] relative">

               <div className="w-full max-w-md flex items-center justify-between  px-5 text-xl font-semibold mb-6">
                   <button className="text-white text-2xl cursor-pointer grounded-radiants-input w-[40px] h-[40px] flex items-center justify-center"
                           onClick={onBack}>{'<'} </button>
                   <h1 className="text-center flex-1 text-white">History </h1>
                   <div className="w-6" /> {/* placeholder to balance the back button */}
               </div>


                <div className={'w-full flex justify-center'}>
                    <div className={'w-[90%]'}>
                        <Segmented
                            block
                            style={{borderRadius:"999px", padding:"10px"}}
                            onChange={setAlignValue}
                            options={[
                                {
                                    label: (
                                        <div   style={{borderRadius:"999px",paddingTop:'10px', paddingBottom:'10px'}}>Withdraw</div>
                                    ),
                                    value: 'withdraw',
                                },
                            ]}
                        /></div>
                </div>
                <div className={'w-full flex justify-center'}>
                    {alignValue === 'withdraw' && <WithdrawHistory/>}

                </div>
    </main>
    </>
}

const WithdrawHistory: React.FC = () =>{
    const _dataTest:DataHistory[]=[
        {
            time: new Date(2025,2,12,11,0),
            value:1,
        },
        {
            time: new Date(2025,3,14,12,5),
            value:1,
        },
        {
            time: new Date(2025,4,15,16,32),
            value:1,
        }
    ]
    return <>
        <Row className={'mt-5 mx-2'}>
            {(() => {
                const arr = [];
                for (let i = 0; i < _dataTest.length; i++) {
                    arr.push(
                        <Col span={24} key={i}>
                            <div className="  mt-3 text-amber-50">
                                <div> {toFormat(_dataTest[i].time, "MM/YY")}</div>
                                <div className={'w-full items-center flex justify-between text-center mt-2'}>
                                    <div className={'flex justify-center font-semibold  text-lg'}>
                                        {_dataTest[i].value} TON
                                    </div>
                                    <div className={'text-xs'}>{toFormat(_dataTest[i].time, "MMM dd, hh:mm ")}</div>
                                </div>
                            </div>
                        </Col>
                    );
                }
                return arr;
            })()}
        </Row>
    </>
}
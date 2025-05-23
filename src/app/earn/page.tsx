"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/app/navbar/page";
import { Col, Modal, Row, Segmented } from "antd";
import "./page.css"
import diamond from "../../../public/icons/diamond.svg";
import Image from "next/image";
import knife1 from "../../../public/icons/knife1.svg";
import check from "../../../public/icons/check.svg";
import close from "../../../public/icons/close.png";
import { ItemEarn } from "@/app/utils/common";

const EarnPage: React.FC = () => {
    const [alignValue, setAlignValue] = useState('user1');
    const data: ItemEarn[] = [
        {
            title: "Follow us on X",
            logo: diamond,
            checked: true,
            value: 500
        },
        {
            title: "Telegram",
            logo: diamond,
            checked: false,
            value: 500
        }

    ]
    return (
        <main className="pb-[120px] background-color-main w-full  min-h-[100vh] pt-[110px] relative">
            <ADSModal />
            <div className={'w-full flex justify-center'}>
                <div className={'w-[90%]'}>
                    <Segmented
                        block
                        style={{ borderRadius: "999px", padding: "10px" }}
                        value={alignValue}
                        onChange={setAlignValue}
                        options={[
                            {
                                label: (
                                    <div style={{ borderRadius: "999px", paddingTop: '10px', paddingBottom: '10px' }}>Task</div>
                                ),
                                value: 'user1',
                            },
                            {
                                label: (
                                    <div style={{ borderRadius: "999px", paddingTop: '10px', paddingBottom: '10px' }}>Game</div>
                                ),
                                value: 'user2',
                            },
                            {
                                label: (
                                    <div style={{ borderRadius: "999px", paddingTop: '10px', paddingBottom: '10px' }}>History</div>
                                ),
                                value: 'user3',
                            },
                        ]}
                    /></div>
            </div>
            <div className={'w-[90%] h-[55px] ps-[20px] mt-4  text-2xl text-amber-50'}>
                Top Tasks
            </div>

            <div className={'w-[93%] h-[55px] ps-[25px] text-2xl text-amber-50'}>
                {(() => {
                    const arr = [];
                    for (let i = 0; i < data.length; i++) {
                        arr.push(
                            <Row className={' h-[75px] text-lg mt-3 flex grounded-radiants ps-[3px] pe-[10px] items-center  rounded-4xl text-amber-50'} gutter={12}>
                                <Col span={4}>
                                    <div className={'w-[53px] h-[53px] flex justify-center items-center bg-gray-700 rounded-full'}>
                                        <Image
                                            src={knife1}
                                            alt=""
                                            className="w-[25px] h-[25px]"
                                        />
                                    </div>
                                </Col>
                                <Col span={16}>
                                    <div className={'ms-2'}>
                                        <nav>{data[i].title}</nav>
                                        <nav className={'text-gray-500 text-xs'}>+{data[i].value}  RCAT</nav>

                                    </div>
                                </Col>
                                <Col span={4}>
                                    <div className={'w-[53px] h-[53px] flex justify-center items-center bg-gray-700 rounded-full'}>

                                        <Image
                                            src={data[i].checked ? check : close}
                                            alt=""
                                            className="w-[17px] h-[17px]"
                                        />

                                    </div>
                                </Col>
                            </Row>


                        );
                    }
                    return arr;
                })()}
            </div>

            <Navbar />
        </main>
    );
};

function ADSModal() {
    const [isModalOpen, setIsOpenModal] = useState(true);
    const [disableClose, setDisableClose] = useState(true);
    const hideModal = async () => {
        if (typeof window !== 'undefined') {
            const WebApp = (await import('@twa-dev/sdk')).default;
            WebApp.ready();
            WebApp.openLink("https://otieu.com/4/9154325");
            setIsOpenModal(false);
        } else {
            setIsOpenModal(false);
        }
    };
    useEffect(() => {
        setTimeout(() => {
            setDisableClose(false);
        }, 3000)
    }, [])
    return <>
        <Modal title=""
            width={"100%"}
            closable={
                {
                    closeIcon: <Image src={close} alt="" />,
                    disabled: disableClose
                }
            }
            maskClosable={false}
            open={isModalOpen}
            className={'monster-modal'}
            footer={null}
            onCancel={hideModal}>
            <div>
                <iframe
                    src="https://otieu.com/4/9154325"
                    width={'w-full'}
                    height="600"
                    style={{ border: '1px solid black' }}
                    title="Example Iframe"
                ></iframe>
            </div>
        </Modal>
    </>
}

export default EarnPage;

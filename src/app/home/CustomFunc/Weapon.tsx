import { useEffect, useState } from "react";
import Image from "next/image";
import monster from "../../../../public/btn/monster.svg";
import key from "../../../../public/icons/key.svg";
import {Badge, Button, Carousel,  Modal, Progress} from "antd";
import backPack from "../../../../public/icons/BackPack.svg";
import close from "../../../../public/icons/close-red.png";

import awp from "../../../../public/weapon/awp.svg";
import cung from "../../../../public/weapon/cung.svg";
import daiBac from "../../../../public/weapon/dai-bac.svg";
import gayDauDo from "../../../../public/weapon/gay-dau-do.svg";
import gayNgan from "../../../../public/weapon/gay-ngan.svg";
import haiKiemNho from "../../../../public/weapon/hai-kiem-nho.svg";
import haiKiemTo from "../../../../public/weapon/hai-kiem-to.svg";
import khien from "../../../../public/weapon/khien.svg";
import kiemXanhTo from "../../../../public/weapon/kiem-xanh-to.svg";
import liemDefault from "../../../../public/weapon/liem-default.svg";
import liemThanChet from "../../../../public/weapon/liem-than-chet.svg";
import noThan from "../../../../public/weapon/no-than.svg";
import sauNong from "../../../../public/weapon/sau-nong.svg";
import thuongDo from "../../../../public/weapon/thuong-do.svg";

import { ChildProps, dataMe,  Weapons } from "@/app/utils/common";
import arrowRight from "../../../../public/icons/Arrow-right.png";
import arrowLeft from "../../../../public/icons/Arrow-left.png";
import {ExclamationCircleFilled} from "@ant-design/icons";
import { ChildProps, dataMe, PropsWeapon, Weapons } from "@/app/utils/common";

export function Weapon({ onButtonClick, onVoidData }: ChildProps) {
    const [keyData, setKey] = useState(0);
    const [token, setToken] = useState<string>("");
    const [dataWeapon, setDataWeapon] = useState<Weapons[] | []>([]);
    const [dataWeapon1, setDataWeapon1] = useState<Weapons[] | []>([]);

    function getBaseLog(x: number, y: number) {
        const test = Math.floor(Math.log(y) / Math.log(x));
        return test + 1;
    }

    useEffect(() => {
        const dataTest: Weapons[] =
            [
                {
                    exp: 50,
                    level: 1,
                    name: "awp",
                    img: awp,
                    type: "",
                    quality: 1,
                    totalExp: 72,
                    id: "1"
                },
                {
                    exp: 0,
                    level: 1,
                    name: "cung",
                    img: cung,
                    type: "",
                    quality: 1,
                    totalExp: 72,
                    id: "2"
                },
                {
                    exp: 0,
                    level: 1,
                    name: "daiBac",
                    img: daiBac,
                    type: "",
                    quality: 1,
                    totalExp: 72,
                    id: "3"
                },
                {
                    exp: 0,
                    level: 1,
                    name: "gayDauDo",
                    img: gayDauDo,
                    type: "",
                    quality: 1,
                    totalExp: 72,
                    id: "4"
                },
                {
                    exp: 0,
                    level: 1,
                    name: "gayNgan",
                    img: gayNgan,
                    type: "",
                    quality: 1,
                    totalExp: 72,
                    id: "5"
                },
                {
                    exp: 0,
                    level: 1,
                    name: "haiKiemNho",
                    img: haiKiemNho,
                    type: "",
                    quality: 1,
                    totalExp: 72,
                    id: "6"
                },
                {
                    exp: 0,
                    level: 1,
                    name: "haiKiemTo",
                    img: haiKiemTo,
                    type: "",
                    quality: 1,
                    totalExp: 72,
                    id: "7"
                },
                {
                    exp: 0,
                    level: 1,
                    name: "khien",
                    img: khien,
                    type: "",
                    quality: 1,
                    totalExp: 72,
                    id: "8"
                },
                {
                    exp: 0,
                    level: 1,
                    name: "kiemXanhTo",
                    img: kiemXanhTo,
                    type: "",
                    quality: 1,
                    totalExp: 72,
                    id: "9"
                },
                {
                    exp: 0,
                    level: 1,
                    name: "liemDefault",
                    img: liemDefault,
                    type: "",
                    quality: 1,
                    totalExp: 72,
                    id: "10"
                },
                {
                    exp: 0,
                    level: 1,
                    name: "liemThanChet",
                    img: liemThanChet,
                    type: "",
                    quality: 1,
                    totalExp: 72,
                    id: "11"
                },
                {
                    exp: 0,
                    level: 1,
                    name: "noThan",
                    img: noThan,
                    type: "",
                    quality: 1,
                    totalExp: 72,
                    id: "12"
                },
                {
                    exp: 0,
                    level: 1,
                    name: "sauNong",
                    img: sauNong,
                    type: "",
                    quality: 1,
                    totalExp: 72,
                    id: "13"
                },
                {
                    exp: 0,
                    level: 1,
                    name: "thuongDo",
                    img: thuongDo,
                    type: "",
                    quality: 1,
                    totalExp: 72,
                    id: "14"
                },
            ]
        setDataWeapon1(dataTest)
        const fetchData = async () => {
            const stored = localStorage.getItem('token');
            if (stored !== null && stored !== undefined) {
                setToken(JSON.parse(stored));
                try {
                    const dataUsser = localStorage.getItem('userInfo');
                    if (dataUsser) {
                        const data = JSON.parse(dataUsser);
                        setKey(data?.currentKey);
                    }

                    const responWeapon = await fetch('https://ton-war.bytebuffer.co/weapon', {
                        method: 'GET',
                        headers: {
                            'Authorization': JSON.parse(stored),
                        },
                    })
                    const responKey = await fetch('https://ton-war.bytebuffer.co/key/claim', {
                        method: 'PATCH',
                        headers: {
                            'Authorization': JSON.parse(stored),
                        },
                    })


                    if (responWeapon.ok) {
                        const dataList = await responWeapon.json();
                        dataList.weapons.forEach((item: Weapons, index: number) => {
                            item.exp = item.quality;
                            item.totalExp =  4 ** getBaseLog(4, item.quality);
                            item.img = dataTest[index].img;
                            item.level = getBaseLog(4, item.quality);
                        });
                        setDataWeapon(dataList.weapons);
                    }

                    if(responKey.ok){
                        const data = await responKey.json();
                        setKey(data.rc);
                    }
                } catch (error) {
                    console.error('GET failed:', error);
                }
            } else {
                console.error("no token");
            }
        };

        fetchData();
    }, [])

    const getListWeapons = async () => {
        let dataToken = "";
        if (token === " " || token === undefined || token === null) {
            const tokenLocalStorage = localStorage.getItem('token');
            if (tokenLocalStorage !== null) {
                dataToken = JSON.parse(tokenLocalStorage);
            }
        } else {
            dataToken = token;
        }
        const response = await fetch('https://ton-war.bytebuffer.co/weapon', {
            method: 'GET',
            headers: {
                'Authorization': dataToken,
                'Content-Type': 'application/json'
            },
        })
        if (response.ok) {
            const dataList = await response.json();
            dataList.weapons.forEach((item: Weapons, index: number) => {
                item.exp = item.quality;
                item.totalExp = 4 ** getBaseLog(4, item.quality);
                item.img = dataWeapon1[index].img;
                item.level = getBaseLog(4, item.quality);
            });
            setDataWeapon(dataList.weapons);
        }
    }

    const handleOpenWeapon = async (key_quantity: number) => {
        const response = await fetch('https://ton-war.bytebuffer.co/weapon/open', {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "key_quantity": key_quantity
            }),
        })
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            const responseMe = await fetch('https://ton-war.bytebuffer.co/account/me', {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
            });
            if (responseMe.ok) {
                const datatt = await responseMe.json();
                const data = datatt.data;
                const dataMe: dataMe = {
                    current_ton: data.currentTon,
                    current_key: data.currentKey,
                    current_point: data.currentPoint,
                    username: data.username ? data.username : data.firstName + " " + data.lastName,
                    level: data.level,
                    user_id: data.userId,
                    first_name: data.firstName,
                    last_name: data.lastName,
                    language_code: data.languageCode,
                    weapon_level: data.weaponLevel,
                    photo_url: data.photoUrl,
                    dailyReward: data.dailyReward,
                    totalReward: data.totalReward
                }
                setKey(data.currentKey);
                if (onVoidData) {
                    onVoidData(dataMe);
                }
            }
        }

        await getListWeapons();
    }

    const onChange = async () => {

    }

    return (
        <div className="p-3 bg-no-repeat bg-center rounded-lg bg-[url('../../public/image.svg')]  min-h-[480px] relative">
                <button className="absolute top-[50px] left-[26px] cursor-pointer" onClick={() => onButtonClick("sum")}>
                    <Image
                        src={monster}
                        alt=""
                        className="w-[56px] h-[60px]"
                    />
                </button>
            <div className="flex justify-between items-center">
                <div className="mr-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.05 21.6L16.125 18.7L13.925 20.9L13.225 20.2C12.8417 19.8167 12.65 19.3417 12.65 18.775C12.65 18.2084 12.8417 17.7334 13.225 17.35L17.45 13.125C17.8333 12.7417 18.3083 12.55 18.875 12.55C19.4417 12.55 19.9167 12.7417 20.3 13.125L21 13.825L18.8 16.025L21.7 18.95C21.9 19.15 22 19.3834 22 19.65C22 19.9167 21.9 20.15 21.7 20.35L20.45 21.6C20.25 21.8 20.0167 21.9 19.75 21.9C19.4833 21.9 19.25 21.8 19.05 21.6ZM22 5.90002L10.65 17.25L10.775 17.35C11.1583 17.7334 11.35 18.2084 11.35 18.775C11.35 19.3417 11.1583 19.8167 10.775 20.2L10.075 20.9L7.875 18.7L4.95 21.6C4.75 21.8 4.51667 21.9 4.25 21.9C3.98333 21.9 3.75 21.8 3.55 21.6L2.3 20.35C2.1 20.15 2 19.9167 2 19.65C2 19.3834 2.1 19.15 2.3 18.95L5.2 16.025L3 13.825L3.7 13.125C4.08333 12.7417 4.55833 12.55 5.125 12.55C5.69167 12.55 6.16667 12.7417 6.55 13.125L6.65 13.25L18 1.90002H22V5.90002ZM6.95 10.85L2 5.90002V1.90002H6L10.95 6.85002L6.95 10.85Z" fill="#96DC68" />
                    </svg>
                </div>
                <div className="flex-1 text-lg font-semibold text-left">Weapon</div>
                <RewardModal keyData={keyData} />
            </div>



            <Carousel className={'mt-10 mb-0 h-[300px]'} arrows dots={false} infinite={false}
                nextArrow={<button>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M6 2C6.55228 2 7 2.44771 7 3V28C7 28.5523 6.55228 29 6 29C5.44772 29 5 28.5523 5 28V3C5 2.44772 5.44772 2 6 2ZM8.03567 27.35V19.9999C10.5045 19.9807 12.5 17.9734 12.5 15.5C12.5 13.0266 10.5045 11.0193 8.03567 11.0001V3.35003C8.03643 3.10704 8.10345 2.86886 8.22951 2.66113C8.35556 2.4534 8.53589 2.28398 8.75107 2.1711C8.96626 2.05823 9.20815 2.00618 9.45071 2.02056C9.69328 2.03494 9.92733 2.1152 10.1277 2.2527L27.461 14.2527C28.1797 14.75 28.1797 15.9474 27.461 16.446L10.1277 28.446C9.92774 28.5849 9.69357 28.6664 9.45061 28.6815C9.20764 28.6967 8.96516 28.645 8.74953 28.532C8.53389 28.419 8.35333 28.2491 8.22748 28.0407C8.10162 27.8324 8.03528 27.5935 8.03567 27.35Z" fill="url(#paint0_linear_2001_261)" />
                        <defs>
                            <linearGradient id="paint0_linear_2001_261" x1="28" y1="15" x2="5" y2="15" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#C2EEA6" stopOpacity="0.8" />
                                <stop offset="1" stopColor="#C2EEA6" stopOpacity="0.3" />
                            </linearGradient>
                        </defs>
                    </svg>
                </button>}
                prevArrow={<button>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M26 2C25.4477 2 25 2.44771 25 3V28C25 28.5523 25.4477 29 26 29C26.5523 29 27 28.5523 27 28V3C27 2.44772 26.5523 2 26 2ZM23.9643 27.35V19.9999C21.4955 19.9807 19.5 17.9734 19.5 15.5C19.5 13.0266 21.4955 11.0193 23.9643 11.0001V3.35003C23.9636 3.10704 23.8966 2.86886 23.7705 2.66113C23.6444 2.4534 23.4641 2.28398 23.2489 2.1711C23.0337 2.05823 22.7919 2.00618 22.5493 2.02056C22.3067 2.03494 22.0727 2.1152 21.8723 2.2527L4.539 14.2527C3.82033 14.75 3.82033 15.9474 4.539 16.446L21.8723 28.446C22.0723 28.5849 22.3064 28.6664 22.5494 28.6815C22.7924 28.6967 23.0348 28.645 23.2505 28.532C23.4661 28.419 23.6467 28.2491 23.7725 28.0407C23.8984 27.8324 23.9647 27.5935 23.9643 27.35Z" fill="url(#paint0_linear_2001_255)" />
                        <defs>
                            <linearGradient id="paint0_linear_2001_255" x1="4" y1="15" x2="27" y2="15" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#C2EEA6" stopOpacity="0.8" />
                                <stop offset="1" stopColor="#C2EEA6" stopOpacity="0.3" />
                            </linearGradient>
                        </defs>
                    </svg>
                </button>}
            >
                {(() => {
                    const arr = [];
                    for (let i = 0; i < dataWeapon.length; i++) {
                        arr.push(
                            <div className={' min-h-[350px]'}>
                                <div className="flex justify-center items-center mt-[34px] mb-[10px]">
                                    <Image
                                        src={dataWeapon[i].img}
                                        alt=""
                                        className="w-[224px] h-[160px] mx-auto"
                                        style={{
                                            filter: "drop-shadow(0px 0px 24px #3B2E14)",
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <div className="flex flex-col justify-center items-center mt-[20px] mb-[5px] relative">
                                        <Progress
                                            percent={(dataWeapon[i].exp * 100) / dataWeapon[i].totalExp}
                                            showInfo={false}
                                            percentPosition={{ align: 'end', type: 'inner' }}
                                            size={[240, 20]} />
                                        <span className={'absolute '}
                                            style={{
                                                color: 'white',
                                                fontWeight: 400,
                                                fontSize: '10px',
                                                bottom: '8px',
                                                right: '8px'
                                            }}>XP: <b>{dataWeapon[i].exp}/{dataWeapon[i].totalExp}</b></span>
                                    </div>

                                    <div className="flex justify-center items-center mt-[0px] mb-[10px] ">
                                        <span style={{
                                            color: 'white',
                                            fontWeight: 400,
                                            fontSize: '14px',
                                            marginTop: '2px'
                                        }}>
                                            Level:
                                        </span> &nbsp;
                                        <span
                                            style={{
                                                fontWeight: 600,
                                                fontSize: '16px',
                                                color: '#96DC6B'
                                            }}>
                                            {dataWeapon[i].level}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                    return arr;
                })()}

            </Carousel>

            <div className="flex flex-col justify-center items-center">
                <div className="flex justify-center items-center mt-[10px] mb-[10px] ">
                    <Button type={'primary'} className={'ButtonOpen1'} onClick={() => handleOpenWeapon(100)}>
                        100<Image
                            src={key}
                            alt=""
                            className="w-[22px] h-[22px]"
                        />
                    </Button>
                </div>

            </div>
        </div>
    )
}
function RewardModal({ keyData}:{keyData:number}) {
    const [isModalOpen, setIsOpenModal] = useState(false);
    const [claimableKeys, setClaimableKeys]= useState<number>(0)

    const showModal = () => {
        setIsOpenModal(true);
    };
    const hideModal = () => {
        setIsOpenModal(false);
    };
    useEffect(() => {

        if(isModalOpen){
            const fetchData=async()=>{
                const stored = localStorage.getItem('token');
                if (stored !== null && stored !== undefined) {
                    try {
                        const respond = await fetch('https://ton-war.bytebuffer.co/key', {
                            method: 'GET',
                            headers: {
                                'Authorization': JSON.parse(stored)
                            },
                        })
                        if (respond.ok) {
                            const data = await respond.json();
                            setClaimableKeys(data?.claimableKeys??0);
                        }
                    } catch (error) {
                        console.error('GET failed:', error);
                    }
                } else {
                    console.error("no token");
                }
            }
            fetchData().then();
        }
    }, [isModalOpen]);
    return <>


        <div onClick={showModal} className="flex text-xs justify-center items-center w-[61px] h-[30px] border border-solid border-[#7cce00]  rounded-[20px]">
            <Badge  count={claimableKeys>0?<ExclamationCircleFilled  style={{ color: 'red', fontSize:'18px' }}/>:undefined }>
                <div className="flex justify-center items-center text-[#7cce00]">
                    {keyData}

                            <Image
                                src={key}
                                alt=""
                                className="w-[20px] h-[20px] mr-[3px]"
                            />


                </div>
            </Badge>
        </div>

        <Modal title={<>
            <div className={'flex'}>
                <Image src={backPack} height={24} alt="" className={'me-2'} />
                <span style={{ color: '#ffffff', paddingTop: '5px' }}> Inventory</span></div>
        </>}
               width={"100%"}
               closeIcon={<Image src={close} alt="" />}
               open={isModalOpen}
               className={'monster-modal'}
               footer={null}
               centered
               onCancel={hideModal}>
            <div className={"bg-[url('../../public/image.svg')] bg-no-repeat bg-center h-[330px] relative "}>
                <div className={'w-full flex justify-center mt-5'}>
                    <span className={'text-4xl text-yellow-400 font-bold flex'}>
                        {claimableKeys}
                        <Image
                            src={key}
                            alt=""
                            className="w-[35px] mt-1 h-[35px] mr-[3px]"
                        />
                    </span>
                </div>
                <div className={'w-full flex justify-center mt-5'}>
                    <Image
                        src={key}
                        alt=""
                        className="w-[105px] mt-1 h-[105px] mr-[3px]"
                    />
                </div>

                <div className={'w-full flex  justify-center font-bold text-center mt-7 text-lg text-yellow-400'}>
                    <span className={'w-[60%]'}>
                            The higher your level the more Key you receive
                     </span>
                </div>

                <div className={'absolute w-full bottom-0 px-3'}>
                    <Button style={{ borderRadius: '999px' }} className={'w-full bottom-0'} type={'primary'}> Claim</Button>
                </div>
            </div>
        </Modal>
    </>
}



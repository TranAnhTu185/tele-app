import {useEffect, useState} from "react";
import Image from "next/image";
import monster from "../../../../public/btn/monster.svg";
import key from "../../../../public/icons/key.svg";
import img11 from "../../../../public/img-11.svg";
import {Button, Col, Modal, Progress, Row} from "antd";
import backPack1 from "../../../../public/icons/Backpack-1.svg";
import backPack from "../../../../public/icons/BackPack.svg";
import close from "../../../../public/icons/close-red.png";
import knife1 from "../../../../public/icons/knife1.svg";
import {  ChildProps, dataMe,  PropsWeapon, Weapons} from "@/app/utils/common";

export function  Weapon({ onButtonClick, onVoidData }: ChildProps) {
    const [keyData, setKey] = useState(0);
    const [token, setToken] = useState<string>("");
    const [dataWeapon, setDataWeapon] = useState<Weapons[] | []>([]);
    useEffect(() => {
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

                    if (responWeapon.ok) {
                        const dataTest = await responWeapon.json();
                        setDataWeapon(dataTest.weapons);
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
            console.log(dataList.weapons);
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
                    current_ton: data.current_ton,
                    current_key: data.current_key,
                    current_point: data.current_point,
                    username: data.username,
                    level: data.level,
                    user_id: data.user_id,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    language_code: data.language_code,
                    weapon_level: data.weapon_level,
                    last_login_at: data.last_login_at,
                    updated_at: data.updated_at,
                    created_at: data.created_at,
                    photo_url: data.photo_url
                }
                setKey(data.current_key);
                if (onVoidData) {
                    onVoidData(dataMe);
                }
            }
        }

        await getListWeapons();
    }

    return (
        <div className="p-3 bg-no-repeat bg-center rounded-lg bg-[url('../../public/image.svg')]  min-h-[540px] relative">
            <button className="absolute top-[50px] left-[26px] cursor-pointer" onClick={() => onButtonClick("sum")}>
                <Image
                    src={monster}
                    alt=""
                    className="w-[56px] h-[60px]"
                />
            </button>
            <div className="absolute top-[54px] right-[26px] cursor-pointer">
                <InventoryItemModal dataList={dataWeapon} />
            </div>
            <div className="flex justify-between items-center">
                <div className="mr-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.05 21.6L16.125 18.7L13.925 20.9L13.225 20.2C12.8417 19.8167 12.65 19.3417 12.65 18.775C12.65 18.2084 12.8417 17.7334 13.225 17.35L17.45 13.125C17.8333 12.7417 18.3083 12.55 18.875 12.55C19.4417 12.55 19.9167 12.7417 20.3 13.125L21 13.825L18.8 16.025L21.7 18.95C21.9 19.15 22 19.3834 22 19.65C22 19.9167 21.9 20.15 21.7 20.35L20.45 21.6C20.25 21.8 20.0167 21.9 19.75 21.9C19.4833 21.9 19.25 21.8 19.05 21.6ZM22 5.90002L10.65 17.25L10.775 17.35C11.1583 17.7334 11.35 18.2084 11.35 18.775C11.35 19.3417 11.1583 19.8167 10.775 20.2L10.075 20.9L7.875 18.7L4.95 21.6C4.75 21.8 4.51667 21.9 4.25 21.9C3.98333 21.9 3.75 21.8 3.55 21.6L2.3 20.35C2.1 20.15 2 19.9167 2 19.65C2 19.3834 2.1 19.15 2.3 18.95L5.2 16.025L3 13.825L3.7 13.125C4.08333 12.7417 4.55833 12.55 5.125 12.55C5.69167 12.55 6.16667 12.7417 6.55 13.125L6.65 13.25L18 1.90002H22V5.90002ZM6.95 10.85L2 5.90002V1.90002H6L10.95 6.85002L6.95 10.85Z" fill="#96DC68" />
                    </svg>
                </div>
                <div className="flex-1 text-lg font-semibold text-left">Weapon</div>
                <div className="flex text-xs justify-center items-center w-[61px] h-[30px] border border-solid border-[#7cce00] text-[#7cce00] rounded-[20px]">
                    <Image
                        src={key}
                        alt=""
                        className="w-[20px] h-[20px] mr-[3px]"
                    />
                    {keyData}
                </div>
            </div>
            <div className="flex justify-center items-center mt-[34px] mb-[10px]">
                <Image
                    src={img11}
                    alt=""
                    className="w-[104px] h-[160px] mx-auto"
                    style={{
                        filter: "drop-shadow(0px 0px 24px #3B2E14)",
                    }}
                />
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center mt-[20px] mb-[5px] relative">
                    <Progress
                        percent={(36 * 100) / 72}
                        showInfo={false}
                        percentPosition={{ align: 'end', type: 'inner' }}
                        size={[240, 20]} />
                    <span className={'absolute '}
                          style={{
                              fontWeight: 400,
                              fontSize: '10px',
                              bottom: '8px',
                              right: '8px'
                          }}>XP: <b>37/72</b></span>
                </div>

                <div className="flex justify-center items-center mt-[0px] mb-[10px] ">
                    <span style={{
                        fontWeight: 400,
                        fontSize: '12px',
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
                        1
                    </span>
                </div>

                <div className="flex justify-center items-center mt-[1px] mb-[10px] ">
                    <Button type={'primary'} className={'ButtonOpen1'} onClick={() => handleOpenWeapon(2)}>
                        Open 1
                    </Button>
                    <Button className={'ButtonOpenAll'} onClick={() => handleOpenWeapon(key)}>
                        Open All
                    </Button>

                </div>
                <div className="flex justify-between items-center pt-[12px]">
                    <div className="flex-1 text-xs text-left mr-2">What’s Inside</div>
                    <div className="">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.075 15.909C6.9875 16.303 7.9625 16.5 9 16.5C10.0385 16.501 11.0135 16.3042 11.925 15.9097C12.8365 15.5152 13.6303 14.9808 14.3063 14.3063C14.9823 13.6318 15.5165 12.838 15.909 11.925C16.3015 11.012 16.4985 10.037 16.5 9C16.5015 7.963 16.3048 6.988 15.9098 6.075C15.5148 5.162 14.9803 4.36825 14.3063 3.69375C13.6323 3.01925 12.8385 2.485 11.925 2.091C11.0115 1.697 10.0365 1.5 9 1.5C7.9635 1.5 6.9885 1.697 6.075 2.091C5.1615 2.485 4.36775 3.01925 3.69375 3.69375C3.01975 4.36825 2.4855 5.162 2.091 6.075C1.6965 6.988 1.4995 7.963 1.5 9C1.5005 10.037 1.6975 11.012 2.091 11.925C2.4845 12.838 3.01875 13.6318 3.69375 14.3063C4.36875 14.9808 5.1625 15.515 6.075 15.909ZM9 6.75C9.2125 6.75 9.39075 6.678 9.53475 6.534C9.67875 6.39 9.7505 6.212 9.75 6C9.7495 5.788 9.6775 5.61 9.534 5.466C9.3905 5.322 9.2125 5.25 9 5.25C8.7875 5.25 8.6095 5.322 8.466 5.466C8.3225 5.61 8.2505 5.788 8.25 6C8.2495 6.212 8.3215 6.39025 8.466 6.53475C8.6105 6.67925 8.7885 6.751 9 6.75ZM8.25 8.25V12.75H9.75V8.25H8.25Z" fill="white" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

function InventoryItemModal({ dataList }: PropsWeapon) {
    const [isModalOpen , setIsOpenModal]=useState(false);
    const showModal = () => {
        setIsOpenModal(true);
    };
    const hideModal = () => {
        setIsOpenModal(false);
    };
    return <>

        <div onClick={showModal}>
            <Image
                src={backPack1}
                alt=""
                className="w-[44px] h-[46px]"
            />
        </div>
        <Modal  title={<>
            <div className={'flex'}>
                <Image src={backPack} height={24}  alt="" className={'me-2'}/>
                <span style={{color:'#ffffff', paddingTop:'5px'}}> Inventory</span></div>
        </>}
                width={"100%"}
                closeIcon={   <Image src={close}  alt="" />}
                open={isModalOpen}
                className={'monster-modal'}
                footer={null}
                centered
                onCancel={hideModal}>
            <div className={"bg-[url('../../public/image.svg')] bg-no-repeat bg-center h-[380px] relative "}>
                <div className={'max-h-[330px] overscroll-x-auto'}>
                    <Row gutter={12}>
                        {(() => {
                            const arr = [];
                            for (let i = 0; i < dataList.length; i++) {
                                arr.push(

                                    <Col span={6} className={'mt-3'}  >
                                        <div className={"py-[6px] text-size-info bg-no-repeat bg-center text-amber-50 text-center  h-[70px] bg-[url('../../public/icons/inventory-item-bg.png')] justify-center grid "}>
                                            <Image
                                                src={knife1}
                                                alt=""
                                                className="mx-auto mt-3"
                                                style={{
                                                    filter: "drop-shadow(0px 0px 24px #3B2E14)",
                                                }}
                                            />
                                            <span className={'mt-4'}> Lv: {dataList[i].level} </span> &nbsp;
                                        </div>
                                    </Col>

                                );
                            }
                            return arr;
                        })()}
                    </Row>
                </div>
                <div className={'absolute w-full bottom-0 px-3'}>
                    <Button style={{borderRadius:'999px'}}  className={'w-full bottom-0'} type={'primary'}> Upgrade All</Button>
                </div>
            </div>
        </Modal>
    </>
}

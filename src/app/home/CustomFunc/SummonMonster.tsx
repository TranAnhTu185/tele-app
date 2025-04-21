import {useEffect, useState} from "react";
import Image from "next/image";
import { Carousel, Col, Modal,  Row} from "antd";
import close from "../../../../public/icons/close-red.png";
import {CarouseSum, ChildProps, dataMe} from "@/app/utils/common";
import img1 from "../../../../public/img-1.svg";
import vuKhi from "../../../../public/btn/btn-vk.svg";
import EggCrackAnimation from "@/app/home/animation/openEgg";
import stats from "../../../../public/btn/btn-stats.svg";
import info from "../../../../public/icons/info.svg";
import arrowRight from "../../../../public/icons/Arrow-right.png";
import arrowLeft from "../../../../public/icons/Arrow-left.png";


export function SummonMonster({ onButtonClick, onVoidData }: ChildProps) {
    const [dataItem, setDataItem] = useState<CarouseSum[] | []>([]);
    const [token, setToken] = useState<string>("");
    const [childKey, setChildKey] = useState(0);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('eruda').then((erudaModule) => {
                type Eruda = {
                    init: (options?: object) => void;
                    destroy: () => void;
                    get: (name: string) => unknown;
                };

                const eruda = erudaModule as unknown as Eruda;

                if (!document.getElementById('eruda')) {
                    const container = document.createElement('div');
                    container.id = 'eruda';
                    document.body.appendChild(container);
                    eruda.init();
                }
            });
        }
        const fetchData = async () => {
            const stored = localStorage.getItem('token');
            if (stored !== null && stored !== undefined) {
                setToken(JSON.parse(stored));
                try {
                    const response = await fetch('https://ton-war.bytebuffer.co/egg', {
                        method: 'GET',
                        headers: {
                            'Authorization': JSON.parse(stored),
                        },
                    })
                    if (response.ok) {
                        const dataTest = await response.json();
                        dataTest.rows.map((item: CarouseSum) => {
                            item[`image`] = img1;
                        })
                        setDataItem(dataTest.rows);
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
    const reloadChild = () => {
        setChildKey((prev) => prev + 1);
    };

    const onClickByEgg = async (eggId: number) => {
        const response = await fetch('https://ton-war.bytebuffer.co/egg/buy', {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "eggId": eggId
            }),
        })
        if (response.ok) {
            const data = await response.json();
            const userEgg = data.userEgg;
            const responseOpenEgg = await fetch('https://ton-war.bytebuffer.co/user-egg/open', {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "user_egg_id": userEgg.id
                }),
            });

            if (responseOpenEgg.ok) {
                const dataOpen = await responseOpenEgg.json();
                console.log(dataOpen);
                reloadChild()
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
                    if (onVoidData) {
                        onVoidData(dataMe);
                    }
                }
            }
        }
    }


    return (
        <div className="p-3 bg-center rounded-lg bg-[url('../../public/image.svg')] bg-auto bg-no-repeat min-h-[500px] relative">
            <button className="absolute top-[50px] right-[27px] cursor-pointer z-1000" onClick={() => onButtonClick("weapon")}>
                <Image
                    src={vuKhi}
                    alt=""
                    className="w-[56px] h-[60px]"
                />
            </button>
            <div className="flex justify-between items-center">
                <div className="mr-3">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.0989 11.0027C4.1123 13.6542 4.75435 15.7759 5.26805 17.2645C3.0106 13.8947 0.448413 7.80251 4.64841 4.25689C2.65341 4.05485 0.318381 5.46607 0.158725 7.595H0.149819C0.0997565 8.25368 0.270756 8.98981 0.700413 9.75748C-0.2354 12.3491 -0.281431 15.2051 1.32498 19.3153C2.22404 21.6144 4.64626 22.2544 6.98523 21.8437C8.68894 21.5437 10.2754 20.7812 11.3584 19.0428C13.2408 16.0203 14.1704 14.1013 16.1298 12.6949C18.3107 11.7679 20.702 12.5426 21.9367 13.7475C21.5862 11.0498 18.6369 8.52045 16.2899 11.0867C14.3528 11.4458 13.0543 11.908 10.8654 13.4884C11.7865 11.6716 13.5057 9.50806 14.5746 8.2189C16.154 6.26853 19.3958 5.55546 21.0679 5.96393C19.5684 3.83862 15.0718 3.17065 14.0547 6.55128C12.0856 7.45423 9.60643 9.40362 7.96529 11.3793C8.5081 8.9067 9.5206 5.85804 10.5128 4.10389C12.0983 2.39046 14.4395 2.41957 15.8858 2.8587C14.5309 0.674511 10.2024 -0.428177 9.3938 3.46775C7.37302 5.01837 5.30405 8.1604 4.09899 11.0028L4.0989 11.0027Z" fill="#96DC68" />
                    </svg>
                </div>
                <div className="flex-1 text-lg font-semibold text-left">Summon Monster</div>
            </div>
            <div className="mt-[34px]">
                <Carousel arrows dots={false}
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
                        if (dataItem.length > 0) {
                            const arr = [];
                            for (let i = 0; i < dataItem.length; i++) {
                                arr.push(
                                    <div>
                                        {/*<Image*/}
                                        {/*    src={dataItem[i].image}*/}
                                        {/*    alt=""*/}
                                        {/*    className="w-[232px] h-[232px] mx-auto"*/}
                                        {/*    style={{*/}
                                        {/*        filter: "drop-shadow(0px 0px 24px #3B2E14)",*/}
                                        {/*    }}*/}
                                        {/*/>*/}

                                        <EggCrackAnimation dataNumber={childKey} key={childKey}/>
                                        <button
                                            className="flex justify-center items-center mx-auto bg-[url('../../public/bg-btn.svg')] bg-cover h-[40px] p-[4px] w-[144px] mt-[10px] cursor-pointer"
                                            onClick={() => onClickByEgg(dataItem[i]?.level)}
                                        >
                                            <span className="text-white text-base mr-2">{dataItem[i]?.price}</span>
                                            <div>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clipPath="url(#clip0_12_66)">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M22.6689 2.32031C22.3918 1.79378 21.9405 1.37916 21.3917 1.1469C20.8988 0.896571 20.3548 0.762739 19.8017 0.755768H4.33444C3.75065 0.71942 3.16907 0.855464 2.66237 1.1469C2.34186 1.25191 2.04555 1.41958 1.79076 1.64011C1.53597 1.86065 1.32781 2.12962 1.17844 2.43131C0.84514 2.99549 0.700371 3.65077 0.765063 4.30241C0.812498 4.90411 1.02723 5.48069 1.38513 5.96738L10.975 22.6699C11.0946 22.8446 11.2545 22.9881 11.4412 23.0884C11.628 23.1886 11.8362 23.2427 12.0482 23.2461C12.2664 23.2642 12.4852 23.2196 12.6787 23.1174C12.8722 23.0153 13.0323 22.86 13.14 22.6699L22.7722 5.96738C23.1107 5.44149 23.2765 4.82353 23.2466 4.19935C23.2152 3.53457 23.0165 2.88836 22.6689 2.32031ZM10.8319 17.4583L3.44673 4.60369C3.25594 4.21256 3.1579 4.01699 3.1579 4.01699C3.1302 3.84247 3.16491 3.66379 3.25594 3.51221C3.32987 3.33538 3.47081 3.19481 3.64812 3.12108H10.8319V17.4583ZM20.6894 4.08835C20.7292 4.28546 20.7292 4.4885 20.6894 4.68562L13.14 17.5217V3.20565H19.6984C19.9303 3.18029 20.1648 3.21488 20.3794 3.30608L20.4827 3.40914C20.5861 3.40914 20.5861 3.59414 20.6894 3.59414C20.7371 3.75545 20.7371 3.92704 20.6894 4.08835Z" fill="white" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_12_66">
                                                            <rect width="24" height="24" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                );
                            }
                            return arr;
                        }
                    })()}

                </Carousel>
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="flex justify-between items-center pt-[12px]">
                    {/*<div className="flex-1 text-xs text-left mr-2">What’s Inside</div>*/}
                    <WhatInsideMonsterModal />
                </div>
            </div>

            <button className="absolute bottom-[136px] left-[13px]" onClick={() => onButtonClick("stats")}>
                <Image
                    src={stats}
                    alt=""
                    className="w-[44px] h-[46px]"
                />
            </button>
        </div>
    );
}

type dataMon = {
    id: string,
    name: string,
    image: string,
    level: number,
    status: string,
    dailyReward: number
}

function WhatInsideMonsterModal() {
    const [isModalOpen, setIsOpenModal] = useState(false);
    const [datalist, setDataList] = useState<dataMon[] | []>([]);
    const showModal = () => {
        setIsOpenModal(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            const stored = localStorage.getItem('token');
            if (stored !== null && stored !== undefined) {
                try {
                    const responListMon = await fetch('https://ton-war.bytebuffer.co/monster/list', {
                        method: 'GET',
                        headers: {
                            'Authorization': JSON.parse(stored),
                        },
                    })

                    if (responListMon.ok) {
                        const dataTest = await responListMon.json();
                        setDataList(dataTest.rows);
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
    const hideModal = () => {
        setIsOpenModal(false);
    };
    return <>
        <div className="flex text-xs text-left cursor-pointer" onClick={showModal}>
            What’s Inside
            <div className="ml-2">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M6.075 15.909C6.9875 16.303 7.9625 16.5 9 16.5C10.0385 16.501 11.0135 16.3042 11.925 15.9097C12.8365 15.5152 13.6303 14.9808 14.3063 14.3063C14.9823 13.6318 15.5165 12.838 15.909 11.925C16.3015 11.012 16.4985 10.037 16.5 9C16.5015 7.963 16.3048 6.988 15.9098 6.075C15.5148 5.162 14.9803 4.36825 14.3063 3.69375C13.6323 3.01925 12.8385 2.485 11.925 2.091C11.0115 1.697 10.0365 1.5 9 1.5C7.9635 1.5 6.9885 1.697 6.075 2.091C5.1615 2.485 4.36775 3.01925 3.69375 3.69375C3.01975 4.36825 2.4855 5.162 2.091 6.075C1.6965 6.988 1.4995 7.963 1.5 9C1.5005 10.037 1.6975 11.012 2.091 11.925C2.4845 12.838 3.01875 13.6318 3.69375 14.3063C4.36875 14.9808 5.1625 15.515 6.075 15.909ZM9 6.75C9.2125 6.75 9.39075 6.678 9.53475 6.534C9.67875 6.39 9.7505 6.212 9.75 6C9.7495 5.788 9.6775 5.61 9.534 5.466C9.3905 5.322 9.2125 5.25 9 5.25C8.7875 5.25 8.6095 5.322 8.466 5.466C8.3225 5.61 8.2505 5.788 8.25 6C8.2495 6.212 8.3215 6.39025 8.466 6.53475C8.6105 6.67925 8.7885 6.751 9 6.75ZM8.25 8.25V12.75H9.75V8.25H8.25Z" fill="white" />
                </svg>
            </div>
        </div>
        <Modal title={<>
            <div className={'flex'}>
                <Image src={info} alt="" className={'me-2'} />
                <span style={{ color: '#ffffff', paddingTop: '5px' }}> What’s Inside</span></div>
        </>}
               width={"100%"}
               closeIcon={<Image src={close} alt="" />}
               open={isModalOpen}
               className={'monster-modal'}
               footer={null}
               style={{ top: 180 }}
               onCancel={hideModal}>
            <div className={"bg-[url('../../public/image.svg')]  min-h-[350px] pt-5"}>
                <Carousel arrows
                          nextArrow={<Image src={arrowRight} alt="" className={'me-2 btnArrow '} />}
                          prevArrow={<Image src={arrowLeft} alt="" className={'me-2 btnArrow'} />}
                >
                    {(() => {
                        const arr = [];
                        for (let i = 0; i < datalist.length; i++) {
                            arr.push(
                                <div className={' min-h-[350px]'}>
                                    <Image
                                        src={img1}
                                        alt=""
                                        className="mx-auto mt-5"
                                        style={{
                                            filter: "drop-shadow(0px 0px 24px #3B2E14)",
                                        }}
                                    />
                                    <Row gutter={30}>
                                        <Col span={12}  >
                                            <div className={"py-[6px] text-size-info text-amber-50 text-center bg-[url('../../public/Rectangle-left.png')]  h-[53px]  justify-center grid ms-[36px]"}>
                                                <div className={'flex'}>
                                                    <span className={'color-green'}> {datalist[i].dailyReward} </span> &nbsp;
                                                    <svg className={'mt-[1px]'} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clipPath="url(#clip0_12_66)">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M22.6689 2.32031C22.3918 1.79378 21.9405 1.37916 21.3917 1.1469C20.8988 0.896571 20.3548 0.762739 19.8017 0.755768H4.33444C3.75065 0.71942 3.16907 0.855464 2.66237 1.1469C2.34186 1.25191 2.04555 1.41958 1.79076 1.64011C1.53597 1.86065 1.32781 2.12962 1.17844 2.43131C0.84514 2.99549 0.700371 3.65077 0.765063 4.30241C0.812498 4.90411 1.02723 5.48069 1.38513 5.96738L10.975 22.6699C11.0946 22.8446 11.2545 22.9881 11.4412 23.0884C11.628 23.1886 11.8362 23.2427 12.0482 23.2461C12.2664 23.2642 12.4852 23.2196 12.6787 23.1174C12.8722 23.0153 13.0323 22.86 13.14 22.6699L22.7722 5.96738C23.1107 5.44149 23.2765 4.82353 23.2466 4.19935C23.2152 3.53457 23.0165 2.88836 22.6689 2.32031ZM10.8319 17.4583L3.44673 4.60369C3.25594 4.21256 3.1579 4.01699 3.1579 4.01699C3.1302 3.84247 3.16491 3.66379 3.25594 3.51221C3.32987 3.33538 3.47081 3.19481 3.64812 3.12108H10.8319V17.4583ZM20.6894 4.08835C20.7292 4.28546 20.7292 4.4885 20.6894 4.68562L13.14 17.5217V3.20565H19.6984C19.9303 3.18029 20.1648 3.21488 20.3794 3.30608L20.4827 3.40914C20.5861 3.40914 20.5861 3.59414 20.6894 3.59414C20.7371 3.75545 20.7371 3.92704 20.6894 4.08835Z" fill="white" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_12_66">
                                                                <rect width="24" height="24" fill="white" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg> /day
                                                </div>
                                                <span> Reward </span>
                                            </div>
                                        </Col>
                                        <Col span={12}>
                                            <div className={"py-[6px] text-size-info text-amber-50 text-center justify-center grid bg-[url('../../public/Rectangle-right.png')] me-[36px] h-[53px]"}>
                                                <span className={'color-green'}> {datalist[i].dailyReward}% </span>
                                                <span> Winning Rate </span>
                                            </div>
                                        </Col>
                                    </Row>

                                </div>
                            );
                        }
                        return arr;
                    })()}

                </Carousel>
            </div>
        </Modal>
    </>
}

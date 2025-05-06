"use client";
import Image from "next/image";
import rank1 from "../../../public/icons/rank-1.svg";
import rank2 from "../../../public/icons/rank-2.svg";
import rank3 from "../../../public/icons/rank-3.svg";
import rank4 from "../../../public/icons/rank-4.svg";
import rank5 from "../../../public/icons/rank-5.svg";
import rank6 from "../../../public/icons/rank-6.svg";
import rank7 from "../../../public/icons/rank-7.svg";

import { useEffect, useState } from "react";
import { getFromLocalStorage } from "../utils/localStorage";
import { DataUser } from "@/app/utils/common";


export default function Header() {
    const [dataItem, setDataItem] = useState<DataUser | null>(null);
    useEffect(() => {
        const stored = getFromLocalStorage('userInfo');
        if (stored) {
            setDataItem(stored);
        }
    }, [])

    const formatNumber = (number: number | undefined) => {
        if (number !== undefined) {
            return (Math.round(number * 100) / 100).toFixed(0);
        } else {
            return 0;
        }

    };
    const formatMoney = (amount: number | undefined): string => {
        if (amount) {
            if (amount >= 1_000_000_000) {
                return (amount / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
            } else if (amount >= 1_000_000) {
                return (amount / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
            } else if (amount >= 1_000) {
                return (amount / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
            }
            return (Math.round(amount * 100) / 100).toFixed(2).toString();
        }else {
            return "0";
        }
    
    }
    return (
        <div className="text-white w-full mx-auto relative">
            <div className="bg-[url('../../public/Union.svg')] bg-cover flex justify-center items-center h-[56px]">
                <div className="w-[32px] h-[32px] bg-[#D9D9D9] rounded-full mr-2 overflow-hidden">
                    <Image
                        src={dataItem?.avatar !== undefined ? dataItem.avatar : rank1}
                        alt=""
                        className="w-[32px] h-[32px] mx-auto"
                        style={{
                            filter: "drop-shadow(0px 0px 24px #a726a9a8)",
                        }}
                    />
                </div>
                <span className="text-lg font-bold">
                    {dataItem?.userName}
                </span>
            </div>
            <div className="flex w-full justify-between items-end mb-5 absolute top-4 left-0">
                <div className="flex items-center w-[113px] h-[92px] bg-[url('../../public/left-1.svg')] bg-cover">
                    <div className="ml-[19px] mr-3">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="12" fill="url(#paint0_linear_12_146)" />
                            <circle cx="12" cy="12" r="11.5" stroke="white" strokeOpacity="0.4" />
                            <path d="M12.1784 18C8.94595 18 7 15.8713 7 12.5407V12.5306C7 9.25093 8.98919 7 12.0595 7C15.1297 7 17 9.14907 17 12.3269V12.9787H8.9027C8.94595 15.1583 10.2216 16.4315 12.2216 16.4315C13.6486 16.4315 14.6541 15.7593 14.9784 14.8528L15.0108 14.7611H16.8595L16.8378 14.863C16.4703 16.6148 14.6324 18 12.1784 18ZM12.0486 8.56852C10.4162 8.56852 9.14054 9.61759 8.93514 11.5935H15.0865C14.9027 9.53611 13.6919 8.56852 12.0486 8.56852Z" fill="#413409" />
                            <defs>
                                <linearGradient id="paint0_linear_12_146" x1="12" y1="0" x2="12" y2="24" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#FFC700" />
                                    <stop offset="1" stopColor="#F79C00" />
                                </linearGradient>
                            </defs>
                        </svg>

                    </div>
                    <div>
                        <div className="text-xs font-semibold text-[#547658]">{formatNumber(dataItem?.currentPoint)}</div>
                        <div className="text-xs text-gray-400">eBH</div>
                    </div>
                </div>
                <div className="flex items-center bg-[url('../../public/bg-rank.svg')] bg-contain bg-no-repeat min-h-[34px] min-w-[140px] p-[4px]">
                    <div className="mr-[2px]">
                        {dataItem?.level === 1 && <Image
                            src={rank1}
                            alt=""
                            className="w-[24px] h-[18px] mx-auto"
                            style={{
                                filter: "drop-shadow(0px 0px 24px #a726a9a8)",
                            }}
                        />}
                        {dataItem?.level === 2 && <Image
                            src={rank2}
                            alt=""
                            className="w-[24px] h-[18px] mx-auto"
                            style={{
                                filter: "drop-shadow(0px 0px 24px #a726a9a8)",
                            }}
                        />}
                        {dataItem?.level === 3 && <Image
                            src={rank3}
                            alt=""
                            className="w-[24px] h-[18px] mx-auto"
                            style={{
                                filter: "drop-shadow(0px 0px 24px #a726a9a8)",
                            }}
                        />}
                        {dataItem?.level === 4 && <Image
                            src={rank4}
                            alt=""
                            className="w-[24px] h-[18px] mx-auto"
                            style={{
                                filter: "drop-shadow(0px 0px 24px #a726a9a8)",
                            }}
                        />}
                        {dataItem?.level === 5 && <Image
                            src={rank5}
                            alt=""
                            className="w-[24px] h-[18px] mx-auto"
                            style={{
                                filter: "drop-shadow(0px 0px 24px #a726a9a8)",
                            }}
                        />}
                        {dataItem?.level === 6 && <Image
                            src={rank6}
                            alt=""
                            className="w-[24px] h-[18px] mx-auto"
                            style={{
                                filter: "drop-shadow(0px 0px 24px #a726a9a8)",
                            }}
                        />}
                        {dataItem?.level === 7 && <Image
                            src={rank7}
                            alt=""
                            className="w-[24px] h-[18px] mx-auto"
                            style={{
                                filter: "drop-shadow(0px 0px 24px #a726a9a8)",
                            }}
                        />}
                    </div>
                    <div className="text-xs font-medium" >
                        Monster Starter {dataItem?.level}
                    </div>
                </div>

                <div className="flex items-center w-[113px] h-[92px] bg-[url('../../public/right-1.svg')] bg-cover">
                    <div className="ml-[19px] mr-3">
                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M15.6126 1.54687C15.4279 1.19585 15.127 0.919443 14.7611 0.764601C14.4325 0.597714 14.0699 0.508492 13.7012 0.503845H3.38963C3.00043 0.479613 2.61271 0.57031 2.27491 0.764601C2.06124 0.834608 1.8637 0.946387 1.69384 1.09341C1.52398 1.24043 1.38521 1.41975 1.28563 1.62087C1.06343 1.99699 0.966914 2.43385 1.01004 2.86828C1.04167 3.26941 1.18482 3.6538 1.42342 3.97825L7.81668 15.1133C7.8964 15.2297 8.003 15.3254 8.1275 15.3922C8.252 15.4591 8.39077 15.4951 8.53214 15.4974C8.67758 15.5095 8.82345 15.4797 8.95245 15.4116C9.08145 15.3436 9.18818 15.24 9.25997 15.1133L15.6815 3.97825C15.9071 3.62766 16.0176 3.21568 15.9977 2.79956C15.9768 2.35638 15.8444 1.92558 15.6126 1.54687ZM7.72128 11.6389L2.79782 3.06913C2.67063 2.80837 2.60526 2.67799 2.60526 2.67799C2.5868 2.56165 2.60994 2.44253 2.67063 2.34148C2.71991 2.22358 2.81388 2.12987 2.93208 2.08072H7.72128V11.6389ZM14.293 2.72556C14.3195 2.85698 14.3195 2.99234 14.293 3.12375L9.25997 11.6812V2.1371H13.6323C13.7868 2.1202 13.9432 2.14325 14.0863 2.20405L14.1552 2.27276C14.2241 2.27276 14.2241 2.39609 14.293 2.39609C14.3247 2.50364 14.3247 2.61802 14.293 2.72556Z" fill="#D4D3D8" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-xs font-semibold text-[#547658]">{formatMoney(dataItem?.currentTon)}</div>
                        <div className="text-xs text-gray-400">TON</div>
                    </div>
                </div>

                {/* <SettingButton /> */}
            </div>

            {/* <div className="text-center mb-5 relative top-[67px]">
                <div className="text-5xl font-bold text-[#96DC68]">
                    {dataItem?.currentTon}
                    <div className="inline-block w-8 h-8 ml-2">
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M29.2252 2.09375C28.8558 1.39171 28.254 0.838886 27.5222 0.529203C26.8651 0.195428 26.1397 0.0169849 25.4023 0.00769038H4.77925C4.00087 -0.040773 3.22543 0.140619 2.54983 0.529203C2.12248 0.669215 1.7274 0.892775 1.38768 1.18682C1.04796 1.48086 0.770411 1.83949 0.571258 2.24174C0.126854 2.99399 -0.0661726 3.86769 0.0200844 4.73655C0.0833305 5.53882 0.36964 6.30759 0.846844 6.95651L13.6334 29.2266C13.7928 29.4595 14.006 29.6508 14.255 29.7845C14.504 29.9182 14.7815 29.9903 15.0643 29.9947C15.3552 30.0189 15.6469 29.9594 15.9049 29.8233C16.1629 29.6871 16.3764 29.48 16.5199 29.2266L29.363 6.95651C29.8142 6.25532 30.0353 5.43137 29.9954 4.59913C29.9536 3.71276 29.6887 2.85115 29.2252 2.09375ZM13.4426 22.2777L3.59564 5.13826C3.34126 4.61675 3.21053 4.35599 3.21053 4.35599C3.1736 4.12329 3.21987 3.88506 3.34126 3.68295C3.43982 3.44717 3.62775 3.25974 3.86416 3.16144H13.4426V22.2777ZM26.5859 4.45113C26.6389 4.71395 26.6389 4.98467 26.5859 5.24749L16.5199 22.3623V3.2742H25.2645C25.5737 3.24039 25.8864 3.2865 26.1725 3.4081L26.3103 3.54553C26.4481 3.54553 26.4481 3.79219 26.5859 3.79219C26.6494 4.00727 26.6494 4.23605 26.5859 4.45113Z" fill="#D4D3D8" />
                        </svg>
                    </div>
                </div>
            </div> */}

            <div className="flex justify-between mb-5 relative top-[68px] h-[61px]">
                <div className="bg-[url('../../public/left-2.svg')] bg-cover rounded-lg flex-1 mx-1 text-center flex flex-col justify-center items-center">
                    <div className="text-lg font-bold flex justify-center items-center">
                        0.08
                        <div className="ml-1">
                            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M15.6126 1.54687C15.4279 1.19585 15.127 0.919443 14.7611 0.764601C14.4325 0.597714 14.0699 0.508492 13.7012 0.503845H3.38963C3.00043 0.479613 2.61271 0.57031 2.27491 0.764601C2.06124 0.834608 1.8637 0.946387 1.69384 1.09341C1.52398 1.24043 1.38521 1.41975 1.28563 1.62087C1.06343 1.99699 0.966914 2.43385 1.01004 2.86828C1.04167 3.26941 1.18482 3.6538 1.42342 3.97825L7.81668 15.1133C7.8964 15.2297 8.003 15.3254 8.1275 15.3922C8.252 15.4591 8.39077 15.4951 8.53214 15.4974C8.67758 15.5095 8.82345 15.4797 8.95245 15.4116C9.08145 15.3436 9.18818 15.24 9.25997 15.1133L15.6815 3.97825C15.9071 3.62766 16.0176 3.21568 15.9977 2.79956C15.9768 2.35638 15.8444 1.92558 15.6126 1.54687ZM7.72128 11.6389L2.79782 3.06913C2.67063 2.80837 2.60526 2.67799 2.60526 2.67799C2.5868 2.56165 2.60994 2.44253 2.67063 2.34148C2.71991 2.22358 2.81388 2.12987 2.93208 2.08072H7.72128V11.6389ZM14.293 2.72556C14.3195 2.85698 14.3195 2.99234 14.293 3.12375L9.25997 11.6812V2.1371H13.6323C13.7868 2.1202 13.9432 2.14325 14.0863 2.20405L14.1552 2.27276C14.2241 2.27276 14.2241 2.39609 14.293 2.39609C14.3247 2.50364 14.3247 2.61802 14.293 2.72556Z" fill="#D4D3D8" />
                            </svg>
                        </div>
                    </div>
                    <div className="text-xs text-gray-400">Total reward</div>
                </div>
                <div className="bg-[url('../../public/center-2.svg')] bg-cover max-w-[73px] rounded-lg flex-1 mx-1 flex justify-center items-center">
                    <div className="">
                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M25.5216 13.3052V15.6948C25.5216 16.3328 25.0112 16.8548 24.3616 16.878H22.088C20.8352 16.878 19.6868 15.9616 19.5824 14.7088C19.5128 13.978 19.7912 13.2936 20.2784 12.818C20.7076 12.3772 21.2992 12.1219 21.9488 12.1219H24.3616C25.0112 12.1451 25.5216 12.6672 25.5216 13.3052Z" fill="#D9D9D9" />
                            <path d="M23.7469 18.618H22.0881C19.8841 18.618 18.0281 16.9592 17.8425 14.848C17.7381 13.6416 18.1789 12.4352 19.0605 11.5768C19.8029 10.8112 20.8353 10.382 21.9489 10.382H23.7469C24.0833 10.382 24.3617 10.1036 24.3269 9.76721C24.0717 6.94841 22.2041 5.02281 19.4317 4.69801C19.1533 4.65161 18.8633 4.64001 18.5617 4.64001H8.12165C7.79685 4.64001 7.48365 4.66321 7.18205 4.70961C4.22406 5.08081 2.32166 7.28481 2.32166 10.44V18.56C2.32166 21.7616 4.92006 24.36 8.12165 24.36H18.5617C21.8097 24.36 24.0485 22.33 24.3269 19.2328C24.3617 18.8964 24.0833 18.618 23.7469 18.618ZM15.0817 11.89H8.12165C7.64606 11.89 7.25166 11.4956 7.25166 11.02C7.25166 10.5444 7.64606 10.15 8.12165 10.15H15.0817C15.5573 10.15 15.9517 10.5444 15.9517 11.02C15.9517 11.4956 15.5573 11.89 15.0817 11.89Z" fill="#D9D9D9" />
                        </svg>
                    </div>
                </div>
                <div className="bg-[url('../../public/right-2.svg')] bg-cover rounded-lg flex-1 mx-1 text-center flex flex-col justify-center items-center">
                    <div className="text-lg font-bold flex justify-center items-center">
                        0.004
                        <div className="ml-1">
                            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M15.6126 1.54687C15.4279 1.19585 15.127 0.919443 14.7611 0.764601C14.4325 0.597714 14.0699 0.508492 13.7012 0.503845H3.38963C3.00043 0.479613 2.61271 0.57031 2.27491 0.764601C2.06124 0.834608 1.8637 0.946387 1.69384 1.09341C1.52398 1.24043 1.38521 1.41975 1.28563 1.62087C1.06343 1.99699 0.966914 2.43385 1.01004 2.86828C1.04167 3.26941 1.18482 3.6538 1.42342 3.97825L7.81668 15.1133C7.8964 15.2297 8.003 15.3254 8.1275 15.3922C8.252 15.4591 8.39077 15.4951 8.53214 15.4974C8.67758 15.5095 8.82345 15.4797 8.95245 15.4116C9.08145 15.3436 9.18818 15.24 9.25997 15.1133L15.6815 3.97825C15.9071 3.62766 16.0176 3.21568 15.9977 2.79956C15.9768 2.35638 15.8444 1.92558 15.6126 1.54687ZM7.72128 11.6389L2.79782 3.06913C2.67063 2.80837 2.60526 2.67799 2.60526 2.67799C2.5868 2.56165 2.60994 2.44253 2.67063 2.34148C2.71991 2.22358 2.81388 2.12987 2.93208 2.08072H7.72128V11.6389ZM14.293 2.72556C14.3195 2.85698 14.3195 2.99234 14.293 3.12375L9.25997 11.6812V2.1371H13.6323C13.7868 2.1202 13.9432 2.14325 14.0863 2.20405L14.1552 2.27276C14.2241 2.27276 14.2241 2.39609 14.293 2.39609C14.3247 2.50364 14.3247 2.61802 14.293 2.72556Z" fill="#D4D3D8" />
                            </svg>
                        </div>
                    </div>
                    <div className="text-xs text-gray-400">Daily reward</div>
                </div>
            </div>
        </div>
    );
}
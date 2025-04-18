import {ChildProps} from "@/app/utils/common";
import Image from "next/image";
import icon11 from "../../../../public/icon-11.svg";


export function StatisticPage({ onButtonClick }: ChildProps) {
    return (
        <div className="p-3 min-h-[500px]">
            <div className="flex justify-between items-center">
                <div className="mr-3">
                    <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M23.25 1.65C23.25 1.21275 23.076 0.792751 22.767 0.483001C22.4573 0.174001 22.0373 0 21.6 0C21.2205 0 20.7795 0 20.4 0C19.9627 0 19.5427 0.174001 19.233 0.483001C18.924 0.792751 18.75 1.21275 18.75 1.65V16.35C18.75 16.7873 18.924 17.2073 19.233 17.517C19.5427 17.826 19.9627 18 20.4 18H21.6C22.0373 18 22.4573 17.826 22.767 17.517C23.076 17.2073 23.25 16.7873 23.25 16.35V1.65Z" fill="#96DC68" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.25 12.15C5.25 11.7127 5.076 11.2927 4.767 10.983C4.45725 10.674 4.03725 10.5 3.6 10.5C3.2205 10.5 2.7795 10.5 2.4 10.5C1.96275 10.5 1.54275 10.674 1.233 10.983C0.924001 11.2927 0.75 11.7127 0.75 12.15V16.35C0.75 16.7873 0.924001 17.2073 1.233 17.517C1.54275 17.826 1.96275 18 2.4 18H3.6C4.03725 18 4.45725 17.826 4.767 17.517C5.076 17.2073 5.25 16.7873 5.25 16.35V12.15Z" fill="#96DC68" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M17.25 9.15C17.25 8.71275 17.076 8.29275 16.767 7.983C16.4573 7.674 16.0373 7.5 15.6 7.5C15.2205 7.5 14.7795 7.5 14.4 7.5C13.9627 7.5 13.5427 7.674 13.233 7.983C12.924 8.29275 12.75 8.71275 12.75 9.15V16.35C12.75 16.7873 12.924 17.2073 13.233 17.517C13.5427 17.826 13.9627 18 14.4 18H15.6C16.0373 18 16.4573 17.826 16.767 17.517C17.076 17.2073 17.25 16.7873 17.25 16.35V9.15Z" fill="#96DC68" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.25 6.15C11.25 5.23875 10.5112 4.5 9.6 4.5C9.2205 4.5 8.7795 4.5 8.4 4.5C7.48875 4.5 6.75 5.23875 6.75 6.15V16.35C6.75 17.2613 7.48875 18 8.4 18H9.6C10.5112 18 11.25 17.2613 11.25 16.35V6.15Z" fill="#96DC68" />
                    </svg>
                </div>
                <div className="flex-1 text-lg font-semibold text-left">Statistics</div>
                <button className="flex text-xs text-right" onClick={() => onButtonClick("sum")}>
                    <div className="mr-3">
                        <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_2001_2050)">
                                <path d="M11.2787 5.65773C11.2296 5.64976 11.1799 5.64609 11.1302 5.64673H2.66446L2.84906 5.56087C3.0295 5.47547 3.19365 5.35924 3.33417 5.21743L5.70818 2.84342C6.02084 2.54495 6.07338 2.06481 5.83268 1.70579C5.55253 1.3232 5.01529 1.24013 4.63268 1.52028C4.60177 1.54292 4.57239 1.56761 4.54478 1.59417L0.251816 5.88714C-0.0836792 6.22226 -0.0839744 6.76588 0.251145 7.10138C0.25136 7.10159 0.251602 7.10183 0.251816 7.10205L4.54478 11.395C4.88055 11.7298 5.42417 11.7291 5.75902 11.3933C5.78537 11.3669 5.80998 11.3388 5.83268 11.3092C6.07338 10.9501 6.02084 10.47 5.70818 10.1715L3.33846 7.79322C3.21249 7.66711 3.06765 7.56137 2.90916 7.47983L2.65159 7.36392H11.083C11.5216 7.38021 11.9064 7.07382 11.9888 6.6427C12.0647 6.17463 11.7468 5.73366 11.2787 5.65773Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_2001_2050">
                                    <rect width="12" height="12" fill="white" transform="translate(0 0.5)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    Back to home</button>
            </div>
            <div className="mt-[16px] mb-[10px]">
                <div className="bg-[url('../../public/bg-thbg.svg')] bg-cover w-[353px] mx-auto grid grid-cols-3 gap-4 py-[9px] mb-[12px]">
                    <div className="text-[16px] text-white text-left">User</div>
                    <div className="text-[16px] text-white text-center">Egg</div>
                    <div className="text-[16px] text-white text-right">Profit/day</div>
                </div>
                <div className="w-[353px] mx-auto grid grid-cols-3 gap-4 py-[12px] mb-[12px]">
                    <div className="text-xs text-white text-left">abxxnamw</div>
                    <div className="text-xs text-white text-center flex items-center justify-center">+1
                        <div className="ml-3">
                            <Image
                                src={icon11}
                                alt=""
                                className="w-[24px] h-[24px] mx-auto"
                            />
                        </div>
                    </div>
                    <div className="text-xs text-[#7cce00] text-right">+10.9 TON</div>
                </div>
                <div className="w-[353px] mx-auto grid grid-cols-3 gap-4 py-[12px] mb-[12px]">
                    <div className="text-xs text-white text-left">abxxnamw</div>
                    <div className="text-xs text-white text-center flex items-center justify-center">+1
                        <div className="ml-3">
                            <Image
                                src={icon11}
                                alt=""
                                className="w-[24px] h-[24px] mx-auto"
                            />
                        </div>
                    </div>
                    <div className="text-xs text-[#7cce00] text-right">+10.9 TON</div>
                </div>
                <div className="w-[353px] mx-auto grid grid-cols-3 gap-4 py-[12px] mb-[12px]">
                    <div className="text-xs text-white text-left">abxxnamw</div>
                    <div className="text-xs text-white text-center flex items-center justify-center">+1
                        <div className="ml-3">
                            <Image
                                src={icon11}
                                alt=""
                                className="w-[24px] h-[24px] mx-auto"
                            />
                        </div>
                    </div>
                    <div className="text-xs text-[#7cce00] text-right">+10.9 TON</div>
                </div>
                <div className="w-[353px] mx-auto grid grid-cols-3 gap-4 py-[12px] mb-[12px]">
                    <div className="text-xs text-white text-left">abxxnamw</div>
                    <div className="text-xs text-white text-center flex items-center justify-center">+1
                        <div className="ml-3">
                            <Image
                                src={icon11}
                                alt=""
                                className="w-[24px] h-[24px] mx-auto"
                            />
                        </div>
                    </div>
                    <div className="text-xs text-[#7cce00] text-right">+10.9 TON</div>
                </div>
                <div className="w-[353px] mx-auto grid grid-cols-3 gap-4 py-[12px] mb-[12px]">
                    <div className="text-xs text-white text-left">abxxnamw</div>
                    <div className="text-xs text-white text-center flex items-center justify-center">+1
                        <div className="ml-3">
                            <Image
                                src={icon11}
                                alt=""
                                className="w-[24px] h-[24px] mx-auto"
                            />
                        </div>
                    </div>
                    <div className="text-xs text-[#7cce00] text-right">+10.9 TON</div>
                </div>
                <div className="w-[353px] mx-auto grid grid-cols-3 gap-4 py-[12px] mb-[12px]">
                    <div className="text-xs text-white text-left">abxxnamw</div>
                    <div className="text-xs text-white text-center flex items-center justify-center">+1
                        <div className="ml-3">
                            <Image
                                src={icon11}
                                alt=""
                                className="w-[24px] h-[24px] mx-auto"
                            />
                        </div>
                    </div>
                    <div className="text-xs text-[#7cce00] text-right">+10.9 TON</div>
                </div>
                <div className="w-[353px] mx-auto grid grid-cols-3 gap-4 py-[12px] mb-[12px]">
                    <div className="text-xs text-white text-left">abxxnamw</div>
                    <div className="text-xs text-white text-center flex items-center justify-center">+1
                        <div className="ml-3">
                            <Image
                                src={icon11}
                                alt=""
                                className="w-[24px] h-[24px] mx-auto"
                            />
                        </div>
                    </div>
                    <div className="text-xs text-[#7cce00] text-right">+10.9 TON</div>
                </div>
                <div className="w-[353px] mx-auto grid grid-cols-3 gap-4 py-[12px] mb-[12px]">
                    <div className="text-xs text-white text-left">abxxnamw</div>
                    <div className="text-xs text-white text-center flex items-center justify-center">+1
                        <div className="ml-3">
                            <Image
                                src={icon11}
                                alt=""
                                className="w-[24px] h-[24px] mx-auto"
                            />
                        </div>
                    </div>
                    <div className="text-xs text-[#7cce00] text-right">+10.9 TON</div>
                </div>
                <div className="w-[353px] mx-auto grid grid-cols-3 gap-4 py-[12px] mb-[12px]">
                    <div className="text-xs text-white text-left">abxxnamw</div>
                    <div className="text-xs text-white text-center flex items-center justify-center">+1
                        <div className="ml-3">
                            <Image
                                src={icon11}
                                alt=""
                                className="w-[24px] h-[24px] mx-auto"
                            />
                        </div>
                    </div>
                    <div className="text-xs text-[#7cce00] text-right">+10.9 TON</div>
                </div>
                <div className="w-[353px] mx-auto grid grid-cols-3 gap-4 py-[12px] mb-[12px]">
                    <div className="text-xs text-white text-left">abxxnamw</div>
                    <div className="text-xs text-white text-center flex items-center justify-center">+1
                        <div className="ml-3">
                            <Image
                                src={icon11}
                                alt=""
                                className="w-[24px] h-[24px] mx-auto"
                            />
                        </div>
                    </div>
                    <div className="text-xs text-[#7cce00] text-right">+10.9 TON</div>
                </div>
                <div className="w-[353px] mx-auto grid grid-cols-3 gap-4 py-[12px] mb-[12px]">
                    <div className="text-xs text-white text-left">abxxnamw</div>
                    <div className="text-xs text-white text-center flex items-center justify-center">+1
                        <div className="ml-3">
                            <Image
                                src={icon11}
                                alt=""
                                className="w-[24px] h-[24px] mx-auto"
                            />
                        </div>
                    </div>
                    <div className="text-xs text-[#7cce00] text-right">+10.9 TON</div>
                </div>
            </div>
        </div>
    );
}



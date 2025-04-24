
import flagVN from "../../../public/icons/VN-flag.svg";
import volume from "../../../public/icons/volume.svg";
import about from "../../../public/icons/about.svg";
import { useState} from "react";
import Link from "next/link";
import "./header.css"
import Image from "next/image";

interface menuItem{
    route?:string,
    title?:string,
    icon:string
}

export function SettingButton(){
    const  items : menuItem[]  = [
        {
            icon:flagVN,
            title:'Language'
        },
        {
            icon:volume,
            title:'Volume',
        },
        {
            icon:about,
            title:'About',
        }

    ];
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggle = () => {
        setIsOpen(old => !old);
    }

    const transClass = isOpen
        ?
        "flex"
        :
        "hidden";

    return (
        <>
            <div className="relative">
                <div  onClick={toggle} className="flex items-center justify-center flex-col w-[113px] h-[92px] bg-[url('../../public/right-1.svg')] bg-cover">
                    <div className="">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M21.185 13.8171C20.4951 13.4435 20.0667 12.7476 20.0667 12C20.0667 11.2529 20.4951 10.5569 21.183 10.1837C21.889 9.80221 22.1827 9.00949 21.881 8.29899C21.5028 7.4015 20.9879 6.56324 20.3543 5.80715C19.8495 5.20517 18.9725 5.04751 18.2665 5.43148C17.5786 5.80715 16.7218 5.80828 16.0319 5.43431C15.344 5.06034 14.9175 4.36327 14.9196 3.6144C14.9196 2.84831 14.3362 2.21252 13.5297 2.10287C12.5159 1.96486 11.4861 1.96563 10.4683 2.1057C9.66378 2.21611 9.0805 2.85154 9.08248 3.6161C9.08248 4.36404 8.65603 5.0607 7.96816 5.43431C7.27823 5.80787 6.4234 5.80711 5.73352 5.43185C5.02753 5.04787 4.15056 5.2063 3.6457 5.80828C3.33192 6.18338 3.04225 6.58438 2.78684 7.00087C2.53138 7.41663 2.30811 7.8524 2.11905 8.29536C1.81531 9.00699 2.10901 9.80084 2.81499 10.1833C3.50492 10.5565 3.93335 11.2528 3.93335 12C3.93335 12.7472 3.50492 13.4429 2.81701 13.8167C2.11103 14.1982 1.81737 14.9905 2.11905 15.7008C2.49722 16.5989 3.01212 17.4372 3.6457 18.1929C4.15056 18.7948 5.02753 18.9525 5.73352 18.5685C6.42143 18.1929 7.27827 18.1921 7.96816 18.5657C8.65603 18.9397 9.08248 19.6367 9.08248 20.3856C9.08046 21.1515 9.66575 21.7873 10.4703 21.8972C10.9752 21.9658 11.4821 22 11.9889 22C12.5038 22 13.0188 21.9648 13.5316 21.8943C14.3362 21.7837 14.9195 21.1488 14.9195 20.3843C14.9175 19.636 15.3439 18.9393 16.0318 18.5657C16.7217 18.1921 17.5765 18.1929 18.2664 18.5682C18.9724 18.9521 19.8494 18.7941 20.3542 18.1917C20.668 17.8164 20.9577 17.4154 21.2131 16.9995C21.4665 16.5838 21.6938 16.148 21.8809 15.7046C22.1847 14.993 21.8911 14.199 21.185 13.8171ZM14.7365 13.4855C14.3161 14.1725 13.6343 14.6643 12.8177 14.8696C12.0031 15.0749 11.1502 14.9696 10.4201 14.5726C8.91153 13.7535 8.39259 11.9335 9.26351 10.5146C9.84683 9.56282 10.9129 9.03007 12.005 9.03007C12.5421 9.03007 13.0832 9.15787 13.58 9.42747C15.0885 10.2463 15.6074 12.0669 14.7365 13.4855Z" fill="url(#paint0_linear_12_68)" />
                            <defs>
                                <linearGradient id="paint0_linear_12_68" x1="12" y1="8.36364" x2="12" y2="15.6364" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#A7E9B1" />
                                    <stop offset="1" stopColor="#547658" />
                                </linearGradient>
                            </defs>
                        </svg>

                    </div>
                    <div>
                        <div className="text-xs text-gray-400">Setting</div>
                    </div>
                </div>
                <div className={`container-setting absolute top-23 z-30 w-[152px] right-0 min-h-[117px] flex flex-col pt-2 bg-zinc-400 rounded-md ${transClass}`}>
                    {
                        items.map((item, index) =>
                            <Link
                                key={index}
                                className="flex dropdown-item-r bg-[#0d0d0d] px-4 py-1"
                                href={item?.route || ''}
                                onClick={toggle}
                            >
                                <Image alt={''} src={item.icon} className={'me-3'} />

                                {item.title}</Link>
                        )
                    }
                </div>
            </div>
            {
                isOpen
                    ?
                    <div
                        className="fixed top-0 right-0 bottom-0 left-0 z-20"
                        onClick={toggle}
                    ></div>
                    :
                    <></>
            }
        </>
    )
}
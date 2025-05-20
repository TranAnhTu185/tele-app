"use client";
import Link from "next/link";
import Image from "next/image";
import home1 from "../../../public/navbar/button-home-1.svg";
import home2 from "../../../public/navbar/button-home-2.svg";
import wallet1 from "../../../public/navbar/button-wallet-1.svg";
import wallet2 from "../../../public/navbar/button-wallet-2.svg";
import invite1 from "../../../public/navbar/button-invite-1.svg";
import invite2 from "../../../public/navbar/button-invite-2.svg";
import earn1 from "../../../public/navbar/button-earn-1.svg";
import earn2 from "../../../public/navbar/button-earn-2.svg";
import { usePathname } from "next/navigation";
import pvp1 from "../../../public/navbar/button-pvp-1.svg";
import pvp2 from "../../../public/navbar/button-pvp-2.svg";
import "./page.css"

export default function Navbar() {
    const navItems = [
        { id: 1, name: "Home", href: "/home", bg: home1, bgActive: home2, active: true },
        { id: 2, name: "PVP", href: "/pvp", bg: pvp1, bgActive: pvp2, active: false },
        { id: 3, name: "Wallet", href: "/wallet", bg: wallet1, bgActive: wallet2, active: false },
        { id: 4, name: "Invite", href: "/invite", bg: invite1, bgActive: invite2, active: false },
        { id: 5, name: "Earns", href: "/earn", bg: earn1, bgActive: earn2, active: false },

    ];

    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path + '/';
      };

    const handleClick = () => {
        navItems.map(item => {
            if (item.active == true) {
                item.active = false;
            }
            if (item.href === pathname) {
                item.active = true;
            }
        });
    };

    return (
        <div className="fixed inset-x-0 bottom-0">
            <nav className="bg-[#121716] border-gradi-white-black p-4 flex justify-around items-center h-[90px]">
                {
                    navItems.map((item, index) => (
                        <div key={index}>
                            <Link className={`items-center justify-center ${item.name === "Home" || item.name === "Earns" ? "flex" : "hidden"}`}
                                href={item.href} onClick={handleClick}>
                                <Image
                                    src={isActive(item.href) == true ? item.bgActive : item.bg}
                                    alt=""
                                    className="w-[44px] h-[46px] mx-auto"
                                />
                            </Link>

                            <Link className={`items-center justify-center ${item.name === "PVP" || item.name === "Invite" ? "flex" : "hidden"}`}
                                href={item.href} onClick={handleClick}>
                                <Image
                                    src={isActive(item.href) == true ? item.bgActive : item.bg}
                                    alt=""
                                    className="w-[44px] h-[46px] mx-auto"
                                />
                            </Link>
                            <Link className={`items-center justify-center ${item.name === "Wallet" ? "flex" : "hidden"}`}
                                href={item.href} onClick={handleClick}>
                                <Image
                                    src={isActive(item.href) == true ? item.bgActive : item.bg}
                                    alt=""
                                    className="w-[56px] h-[60px] mx-auto"
                                />
                            </Link>
                        </div>
                    ))
                }
            </nav>
        </div>
    );
}
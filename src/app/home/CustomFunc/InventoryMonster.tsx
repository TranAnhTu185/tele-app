import Flickity from "react-flickity-component";
import Image from "next/image";
import img1 from "../../../../public/img-1.svg";
import diamond from "../../../../public/icons/diamond.svg";
import {SummonMonster} from "@/app/utils/common";
import "flickity/css/flickity.css";
import {Badge} from "antd";
export function InventoryMonster() {

    const dataTest :SummonMonster[]=[
        {
            name:"Monseter",
            img:img1,
            diamonds:0.1,
            totalEarns:1
        }, {
            name:"Monseter2",
            img:img1,
            diamonds:0.1,
            totalEarns:1
        }, {
            name:"Monseter3",
            img:img1,
            diamonds:0.3,
            totalEarns:3
        }, {
            name:"Monseter4",
            img:img1,
            diamonds:0.4,
            totalEarns:5
        }, {
            name:"Monseter5",
            img:img1,
            diamonds:0.5,
            totalEarns:2
        },
    ]

    return <div className="slider">
        <Flickity >
            {(() => {
                const arr = [];
                for (let i = 0; i < dataTest.length; i++) {
                    arr.push(
                        <div className="w-[150px] h-[140px] grounded-radiants flex items-center text-center  mx-[10px]">
                           <div className={'w-full items-center justify-center text-center'}>
                               <div className={'flex justify-center text-xs'}>
                                   <Badge className={'bandage-cl'} count={dataTest[i].totalEarns} showZero color="green">
                                   <Image  className="w-[60px] h-[60px]"  alt="" src={dataTest[i].img} />
                                </Badge>
                               </div>

                               <div className={'font-bold'}>{dataTest[i].name}</div>
                               <div className={'flex mt-1 justify-center text-xs'}>{dataTest[i].totalEarns} &nbsp;
                                   <Image  className="mt-1 w-[10px] h-[10px]"  alt="" src={diamond} /> | d
                               </div>
                            </div>
                        </div>
                    );
                }
                return arr;
            })()}
        </Flickity>
    </div>
}

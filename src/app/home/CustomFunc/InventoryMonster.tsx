import Flickity from "react-flickity-component";
import Image from "next/image";
import diamond from "../../../../public/icons/diamond.svg";
import { SummonMonster} from "@/app/utils/common";
import "flickity/css/flickity.css";
import {Badge} from "antd";
import {useEffect, useState} from "react";
import {fixedData} from "@/app/home/dataMonster";
export function InventoryMonster() {
    const [data, setData] = useState<SummonMonster[] | []>([]);
    useEffect(() => {
        const fetchData = async () => {
            const stored = localStorage.getItem('token');
            if (stored !== null && stored !== undefined) {
                try {

                    const response = await fetch('https://ton-war.bytebuffer.co/monster/inventory', {
                        method: 'GET',
                        headers: {
                            'Authorization': JSON.parse(stored),
                        },
                    })
                    if (response.ok) {
                        const _data = await response.json();
                        if(_data?.rows?.length>0){

                            const _list:SummonMonster[] = _data.rows.map((x:{name:string,count:number, dailyReward:number })=>{
                                const _fixed =fixedData.find(y=>y.name===x.name);

                                const ret: SummonMonster={
                                    img:_fixed?.monsterImg??"",
                                    totalEarns:x.count,
                                    diamonds:x.dailyReward,
                                    name:x.name
                                }
                                return ret
                            })
                            const _sort = _list.sort((a,b)=>b.diamonds-a.diamonds)

                            setData(_sort);
                        }

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

    return <div className="slider">
        <Flickity >
            {(() => {
                const arr = [];
                for (let i = 0; i < data.length; i++) {
                    arr.push(
                        <div className="w-[150px] h-[140px] grounded-radiants flex items-center text-center  mx-[10px]">
                           <div className={'w-full items-center justify-center text-center'}>
                               <div className={'flex justify-center text-xs'}>
                                   <Badge className={'bandage-cl'} count={data[i].totalEarns} showZero color="green">
                                   <Image  className="w-[60px] h-[60px]"  alt="" src={data[i].img} />
                                </Badge>
                               </div>

                               <div className={'font-bold'}>{data[i].name}</div>
                               <div className={'flex mt-1 justify-center text-xs'}>{data[i].diamonds} &nbsp;
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

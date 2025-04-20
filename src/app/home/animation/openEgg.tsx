import { useEffect, useState } from 'react';
import Image from "next/image";
import  "./openEgg.css"
import eggFull from "../../../../public/icons/egg-full.svg";
import egg1Nua from "../../../../public/icons/egg-1-nua.svg";
import eggCrack from "../../../../public/icons/egg-crack.svg";
import monster from "../../../../public/img-1.svg";
import {PropsCommon} from "@/app/utils/common";


export default function EggCrackAnimation({dataNumber}:PropsCommon ){
    const [step, setStep] = useState<'eggFull' | 'egg1Nua' | 'eggCrack'|'monster'|'default'>('eggFull');
    useEffect(() => {
        if((dataNumber??0)>0){
            const timers = [
                setTimeout(() => setStep('eggFull'), 0 ),
                setTimeout(() => setStep('egg1Nua'), 0),
                setTimeout(() => setStep('eggCrack'), 1000),
                setTimeout(() => setStep('monster'), 1500),
                setTimeout(() => setStep('default'), 3500),
            ];
            return () => timers.forEach(clearTimeout);
        }
    }, [dataNumber]);

    return (
        <div className={'container1'}>
            {(dataNumber??0)>0&&
                <div>
                {step === 'eggFull' && <Image src={eggFull}  className={' img'} alt="Hatched" />}
                {step === 'egg1Nua' && <Image src={egg1Nua}  className={'shake img'} alt="Cracked Egg" />}
                {step === 'eggCrack' && <Image src={eggCrack}  className={'shakeLast img'} alt="Hatched" />}
                {step === 'monster' && <Image src={monster}  className={'pop img'} alt="Hatched" />}
                {step === 'default' && <Image src={eggFull}  className={' img'} alt="Hatched" />}
                </div>
            }
            {
                (dataNumber??0)==0&&  step === 'eggFull' && <Image src={eggFull}  className={' img'} alt="Hatched" />}

        </div>
    );
}


export type Weapons = {
    id: string,
    name: string,
    type: string,
    level: number,
    quality: number
}
export type dataMe = {
    current_ton: number,
    current_key: number,
    current_point: number,
    username: string,
    level: number;
    user_id: string,
    first_name: string,
    last_name: string,
    language_code: string,
    weapon_level: number,
    photo_url: string,
    dailyReward: number,
    totalReward: number
};
export type dataStatic = {
    user_id: string,
    username: string,
    avatar: string,
    eggs: number,
    profit: number
};

export interface ChildProps {
    onButtonClick: (increment: string) => void;
    onVoidData?: (data: dataMe) => void;
}


export  interface PropsWeapon {
    dataList: Weapons[];
}

export interface PropsCommon {
    dataString?: string
    dataNumber?:number;
}


export interface CarouseSum {
    level: number;
    name: string;
    price: number;
    description: string;
    created: number;
    image: string;
    jsonUrl: string;
    atlasUrl: string;
}


export interface CarouseMonster {
    image: string;
    reward?: number,
    winningRate?: number;
}

export type DataUser = {
    avatar?: string,
    currentKey?: number,
    currentPoint?: number,
    currentTon?: number,
    level?: number,
    userId?: string
    userName?: string,
    dailyReward?: number,
    totalReward?: number
};
export  interface ItemEarn{
    title:string,
    logo:string,
    checked:boolean
    value:number,

}
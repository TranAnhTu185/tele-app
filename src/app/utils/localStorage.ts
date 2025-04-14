
export const saveToLocalStorage = (
    key: string, 
    value: any // eslint-disable-line @typescript-eslint/no-explicit-any
    ) => {
    if(typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

export const getFromLocalStorage = <T>(key: string): T | null => {
    if(typeof window !== 'undefined') {
        const item = localStorage.getItem(key);
        if(!item) return null;
        try {
            return JSON.parse(item) as T;
        }catch(err) {
            console.error("Lỗi khi parse JSON tư localStorage:", err);
            return null
        }
    }else {
        return null;
    }
}

export const removeFromLocalStorage = (key: string) => {
    if(typeof window !== 'undefined') {
        localStorage.removeItem(key);
    }
}
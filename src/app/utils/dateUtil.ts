import dayjs from 'dayjs';



export function toFormat(isoString: string | Date | undefined, format: string = 'DD/MM/YYYY HH:mm'): string {
    if (isoString === undefined||isoString === null) {
        return "-";
    }
    return dayjs(isoString).format(format)
}
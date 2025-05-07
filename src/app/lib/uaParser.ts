import { UAParser } from 'ua-parser-js';

export type ParsedUA = {
    browser: string;
    os: string;
    device: string;
    isMobile: boolean;
};

export const parseUserAgent = (userAgent: string): ParsedUA => {
    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    return {
        browser: `${result.browser.name || 'Unknown'} ${result.browser.version || ''}`.trim(),
        os: `${result.os.name || 'Unknown'} ${result.os.version || ''}`.trim(),
        device: result.device.type || 'desktop',
        isMobile: result.device.type === 'mobile' || result.device.type === 'tablet',
    };
};
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const botToken = process.env.BOT_TOKEN;
    if(!botToken) {
        return NextResponse.json({ error: 'Telegram'});
    }

    const { initData } = await req.json();

    if(!initData) {
        return NextResponse.json({ error: "Invalid request"}, { status: 400 });
    }
    
    try {
        const url = `https://ton-war.bytebuffer.co/auth`;
        const response = await fetch(url);
        if(!response.ok) {
            const errorText = await response.text();
            console.error("Error : ", response.status, errorText);
            return NextResponse.json({ error: `API error: ${response.status} ${errorText}`}, { status: 500 });
        }
    }catch (error) {
        console.error(" Error checking user Telegram: ", error);
        if(error instanceof Error) {
            return NextResponse.json({ error: `Failed to check user: ${error.message}`}, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred while checking user Telegram"}, { status: 500});
    }
}
import { NextResponse } from "next/server";

export function GET() {
    console.log("viendo esto desde vercel")
    return NextResponse.json({ message: "Hello, World!" }); 
}
import { NextResponse } from "next/server";

export function POST(request: Request) {
    console.log(request.body)
    return NextResponse.json({ message: "Hello, World!" }); 
}
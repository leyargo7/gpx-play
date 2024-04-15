import { NextResponse } from "next/server";
import { connectDB } from '@/libs/mongodb'
import Transaction from '@/models/transactions'

export async function POST(request: Request) {

    await connectDB()

    const data = await request.json()

    if(data){
        const newTransaction = await new Transaction({
            transaction: data,
        }).save()
    }

    console.log("data enviada a la db")
    console.log(data)
    return NextResponse.json({ message: "Hello, World!" }); 
}
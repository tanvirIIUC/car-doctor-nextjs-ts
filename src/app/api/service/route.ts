import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnection";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req:Request)=>{
    const body = await req.json();
    const bookingCollection = dbConnect("booked-services");
    const result =  await bookingCollection.insertOne(body);

    return NextResponse.json(result)
}

export const GET = async ()=>{
    const session = await getServerSession(authOptions)
    if(session){
        const email = session.user?.email;
        const myBookingCollection = dbConnect("booked-services");
        const myBooking =  await myBookingCollection.find({email}).toArray();
        return NextResponse.json(myBooking)
    }
    return NextResponse.json({})

}
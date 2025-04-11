import dbConnect from "@/lib/dbConnection"
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async(req:any,{params}:{params:any})=>{
    const id =  await params;
    const serviceCollection =  dbConnect("services");
    const data =  await serviceCollection.findOne({_id: new ObjectId(id?.serviceId)});
    return NextResponse.json(data);
}
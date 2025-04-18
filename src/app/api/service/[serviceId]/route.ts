import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnection"
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async(req:Request,{params}:{params:Promise<{ serviceId: string }>})=>{
    // const id =  await params;
    const id = await params
    const serviceCollection =  dbConnect("services");
    const data =  await serviceCollection.findOne({_id: new ObjectId(id?.serviceId)});
    return NextResponse.json(data);
}
export const DELETE = async (req:Request, { params }:{params:Promise<{ serviceId: string }>}) => {
    const id = await params;
    const session = await getServerSession(authOptions);
    const servicesCollection = dbConnect("booked-services");
    const currentBooking = await servicesCollection.findOne({ _id: new ObjectId(id?.serviceId) })

    const isValid = session?.user?.email === currentBooking?.email;

    if(isValid){
        const result = await servicesCollection.deleteOne({_id: new ObjectId(id?.serviceId)})
        return NextResponse.json(result)
    } else {
        return NextResponse.json({message:"Something went wrong",success:false})
    }

}
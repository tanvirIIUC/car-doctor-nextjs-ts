import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnection";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const id = (await params).id;
  const bookingCollection = dbConnect("booked-services");
  const data = await bookingCollection.findOne({ _id: new ObjectId(id) });
  return NextResponse.json(data);
};

export const PATCH = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const id = (await params).id;
  const bookingCollection = dbConnect("booked-services");
  const body = await req.json();
  const query = { _id: new ObjectId(id) };

  const session = await getServerSession(authOptions);
  const currentBooking = await bookingCollection.findOne(query);

  const isValid = session?.user?.email === currentBooking?.email;
  if (isValid) {
    const filter = {
      $set: { ...body },
    };
    const option = {
      upsert: true,
    };
    const updateData = await bookingCollection.updateOne(query, filter, option);
    return NextResponse.json(updateData);
  } else {
    return NextResponse.json({
      message: "Something went wrong",
      success: false,
    });
  }
};

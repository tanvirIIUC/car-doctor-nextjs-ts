import dbConnect from "@/lib/dbConnection";
import { ServiceItem } from "@/types";
import { Document, WithId } from "mongodb";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";


const ServicesArea = async () => {
  const servicesCollection = dbConnect("services");
  const rawData: WithId<Document>[] = await servicesCollection.find({}).toArray();
  const data: ServiceItem[] = rawData.map((doc) => ({
    _id: doc._id.toString(),
    img: doc.img,
    title: doc.title,
    price: doc.price,
  }));
//   const data: ServiceItem[] = await servicesCollection.find({}).toArray();

  return (
    <div className="flex flex-col items-center my-10">
      <h1 className="text-[#FF3811] font-bold text-xl">Service</h1>
      <h1 className="font-bold text-4xl my-2">Our Service Area</h1>
      <p className="text-[#737373] text-[16px] mb-9 text-center lg:w-[600px]">
        the majority have suffered alteration in some form, by injected humour,
        or randomised words which don't look even slightly believable.
      </p>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {data?.map((item: ServiceItem) => (
          <div
            key={item._id}
            className="rounded-xl border border-[#E8E8E8] p-5 w-[364px] h-[348px]"
          >
            <Image
              className="rounded-xl"
              src={item.img}
              width={364}
              height={208}
              alt="logo"
            />
            <p className="text-[25px] font-bold my-3">{item.title}</p>
            <p className="text-[#FF3811] font-semibold text-xl flex justify-between items-center">
              {item.price}
              <Link href={`/service/${item._id}`}>
                <FaArrowRight />
              </Link>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesArea;

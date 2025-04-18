
import Image from "next/image";
import Link from "next/link";

const ServiceDetailsPage = async ({ params }: { params: Promise<{ serviceId: string }> }) => {
    const id = await params;
    // const servicesCollection = dbConnect("services") 
    // const data = await servicesCollection.findOne({_id: new ObjectId(id.serviceId )})
    const res = await fetch(`http://localhost:3000/api/service/${id.serviceId}`);
    const data = await res.json();

    return <div className="mt-5">
        <section className="flex justify-center">
            <figure className="relative">
                <Image src='/assets/images/checkout/checkout.png' width={1137} height={300} alt="bgImage" />
                <div className="absolute service-details-banner rounded-xl w-full h-full top-0">
                    <div className="w-full h-full flex items-center">
                        <h1 className=" text-white text-[45px] ps-24 font-bold">Service Details</h1>
                    </div>
                </div>

            </figure>

        </section>
        <section className="flex gap-10 my-10">
            <div className="w-[70%] flex justify-center rounded-xl">
                <Image className="rounded-xl" src={data?.img} width={560} height={300} alt="serviceImg" />
            </div>
            <div className="w-[30%] flex flex-col items-center">
                <p className="text-4xl font-semibold mb-4"> Price : ${data?.price}</p>
                <Link href={`/checkout/${data?._id}`} className="py-2 cursor-pointer text-center bg-amber-600 text-white font-semibold px-7 rounded-xl">Checkout</Link>



            </div>

        </section>
        <div>
            <p className="p-5">
                {data?.description}
            </p>
        </div>

    </div>;
};
export default ServiceDetailsPage;
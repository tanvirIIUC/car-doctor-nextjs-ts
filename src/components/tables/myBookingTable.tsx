"use client"

import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loading from "@/app/loading";
import { ServiceData } from "@/types";
type MyBookingTableProps = {
  data: ServiceData[];
  setData: React.Dispatch<React.SetStateAction<ServiceData[]>>;
};

const MyBookingTable: React.FC<MyBookingTableProps> = ({ data, setData }) => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    setLoading(true);
    const res = await fetch(`http://localhost:3000/api/service/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.acknowledged === true) {
      toast.success("Delete successful!");
      setData((prevData) => prevData?.filter((item) => item?._id !== id));
      setLoading(false);
      router.refresh();
    } else {
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2 text-left">ID</th>
                <th className="border px-4 py-2 text-left">Service Image</th>
                <th className="border px-4 py-2 text-left">Service Title</th>
                <th className="border px-4 py-2 text-left">Service Date</th>
                <th className="border px-4 py-2 text-left">Service Price</th>
                <th className="border px-4 py-2 text-left">Address</th>
                <th className="border px-4 py-2 text-left">Edit</th>
                <th className="border px-4 py-2 text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">
                    <Image
                      src={item.service_image}
                      width={50}
                      height={50}
                      alt="Service Image"
                    />
                  </td>
                  <td className="border px-4 py-2">{item.service_name}</td>
                  <td className="border px-4 py-2">{item.date}</td>
                  <td className="border px-4 py-2">{item.service_price}</td>
                  <td className="border px-4 py-2">{item.address}</td>
                  <td className="border px-4 py-2 cursor-pointer">
                    <Link href={`/myBooking/${item._id}`}>
                      <FaRegEdit />
                    </Link>
                  </td>
                  <td
                    onClick={() => handleDelete(item._id)}
                    className="border px-4 py-2 cursor-pointer"
                  >
                    <MdDelete />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default MyBookingTable;
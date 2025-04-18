"use client"
import MyBookingTable from "@/components/tables/myBookingTable";
import { ServiceData } from "@/types";
import { useState, useEffect } from "react";
import Loading from "../loading";

const MyBookingPage = () => {
  const [data, setData] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // const [totalAmount,setTotalAmount] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://car-doctor-nextjs-ts.vercel.app/api/service");
        const data = await res.json();
        setData(data);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalAmount = data?.reduce((acc, curr) => {
    return acc + parseFloat(curr.service_price);
  }, 0);




  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {
            (data.length) ?
              <>
                <MyBookingTable data={data} setData={setData} />
                <p className=" text-center font-semibold text-xl mt-10"><span className=" text-blue-700">Total Amount :</span> {totalAmount}</p></>
              : <p className="text-[red] font-semibold text-2xl text-center mt-20">No Booking Found!</p>
          }

        </>

      )}
    </div>
  );

};
export default MyBookingPage;
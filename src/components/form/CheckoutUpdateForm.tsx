"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loading from "@/app/loading";
import { BookingData, FormData } from "@/types";


type Props = {
  data: BookingData;
};

const CheckoutUpdateForm: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const session = useSession();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: data?.phone || "",
    date: data?.date || "",
    price: data?.price || "",
    address: data?.address || "",
    created_at: new Date(),
  });

  // Populate user info from session
  useEffect(() => {
    const user = session?.data?.user;
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [session?.data?.user]);


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.price || !formData.address) {
      setError("All fields are required!");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:3000/api/my-booking/${data?._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.acknowledged === true) {
        toast.success("Booking updated successfully!");
        router.push("/myBooking");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-4">
            Update Booking: {data?.service_name}
          </h2>

          {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium">Full Name</label>
              <input
                readOnly
                type="text"
                name="name"
                className="w-full border px-3 py-2 rounded"
                value={formData.name}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                readOnly
                type="email"
                name="email"
                className="w-full border px-3 py-2 rounded"
                value={formData.email}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 font-medium">Phone Number</label>
              <input
                type="tel"
                name="phone"
                className="w-full border px-3 py-2 rounded"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Booking Date */}
            <div>
              <label className="block text-gray-700 font-medium">Booking Date</label>
              <input
                type="date"
                name="date"
                className="w-full border px-3 py-2 rounded"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-gray-700 font-medium">Price</label>
              <input
                readOnly
                type="number"
                name="price"
                className="w-full border px-3 py-2 rounded"
                value={formData.price}
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-gray-700 font-medium">Present Address</label>
              <textarea
                name="address"
                className="w-full border px-3 py-2 rounded"
                value={formData.address}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full cursor-pointer bg-[#FF3811] text-white py-2 rounded hover:bg-[#ff3911b3] transition"
            >
              Update Booking
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default CheckoutUpdateForm;

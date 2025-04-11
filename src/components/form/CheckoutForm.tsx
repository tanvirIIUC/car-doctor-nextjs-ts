"use client";

import { useSession } from "next-auth/react";
import { useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

interface CheckoutFormProps {
  data: {
    price: number;
    title: string;
    img: string;
    service_id: string;
  };
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  price: number;
  address: string;
  service_id: string;
  service_name: string;
  service_price: number;
  service_image: string;
  created_at: Date;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ data }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [formData, setFormData] = useState<FormData>({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    phone: "",
    date: "",
    price: data?.price,
    address: "",
    service_id: data?.service_id,
    service_name: data?.title,
    service_price: data?.price,
    service_image: data?.img,
    created_at: new Date(),
  });

  const [error, setError] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Update name/email from session
    const updatedFormData = {
      ...formData,
      name: session?.user?.name || "",
      email: session?.user?.email || "",
    };

    if (
      !updatedFormData.name ||
      !updatedFormData.email ||
      !updatedFormData.phone ||
      !updatedFormData.date ||
      !updatedFormData.price ||
      !updatedFormData.address
    ) {
      setError("All fields are required!");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFormData),
      });

      const result = await res.json();

      if (result.acknowledged === true) {
        toast.success("Booking submitted successfully!");
        router.push("/myBooking");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      toast.error("Server error occurred!");
    } finally {
      setLoading(false);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">
        Book Service: {data?.title}
      </h2>

      {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Full Name</label>
          <input
            readOnly
            type="text"
            name="name"
            className="w-full border px-3 py-2 rounded"
            defaultValue={session?.user?.name || ""}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            readOnly
            type="email"
            name="email"
            className="w-full border px-3 py-2 rounded"
            defaultValue={session?.user?.email || ""}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Phone Number</label>
          <input
            type="tel"
            name="phone"
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Booking Date</label>
          <input
            type="date"
            name="date"
            className="w-full border px-3 py-2 rounded"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Price</label>
          <input
            readOnly
            type="number"
            name="price"
            className="w-full border px-3 py-2 rounded"
            defaultValue={data?.price}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Present Address</label>
          <textarea
            name="address"
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer bg-[#FF3811] text-white py-2 rounded hover:bg-[#ff3911b3] transition"
        >
          Submit Booking
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;

import CheckoutUpdateForm from "@/components/form/CheckoutUpdateForm";


const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  // console.log()
  const id = (await params)?.id;
  const res = await fetch(`https://car-doctor-nextjs-ts.vercel.app/api/my-booking/${id}`);
  const data = await res.json()

  return <div>

    <CheckoutUpdateForm data={data} />
  </div>;
};
export default Page;
import CheckoutUpdateForm from "@/components/form/CheckoutUpdateForm";


const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  // console.log()
  const id = (await params)?.id;
  const res = await fetch(`http://localhost:3000/api/my-booking/${id}`);
  const data = await res.json()

  return <div>

    <CheckoutUpdateForm data={data} />
  </div>;
};
export default Page;
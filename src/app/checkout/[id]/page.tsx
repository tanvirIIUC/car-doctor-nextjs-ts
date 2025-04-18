import CheckoutForm from "@/components/form/CheckoutForm";

const CheckoutPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = await params;
  const res = await fetch(`https://car-doctor-nextjs-ts.vercel.app/api/service/${id?.id}`);
  const data = await res.json();
  // console.log(data)
  return <div>
    <CheckoutForm data={data} />
  </div>;
};
export default CheckoutPage;
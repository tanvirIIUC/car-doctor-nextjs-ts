import CheckoutForm from "@/components/form/CheckoutForm";

const CheckoutPage = async ({ params }:{params:any}) => {
    const id = await params;
    const res = await fetch(`http://localhost:3000/api/service/${id?.id}`);
    const data = await res.json();
    // console.log(data)
    return <div>
      <CheckoutForm data={data}/>
    </div>;
};
export default CheckoutPage;
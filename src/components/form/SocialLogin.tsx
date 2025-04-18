"use client"

import { signIn, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
const SocialLogin = () => {
    // const router = useRouter();
    const {status}= useSession()
    const handleSocial = async (providerName:string) => {
        signIn(providerName)

    }

    useEffect(()=>{
        if(status==="authenticated"){
            // router.push('/myBooking');
            window.location.href = "/myBooking";
        }

    },[status])

    return <div className="my-5">
        <p className="text-center">Or Log in with</p>
        <div className="flex justify-center gap-6 mt-5 ">
            <p onClick={() => handleSocial("google")} className=" flex justify-center items-center cursor-pointer w-[30px] h-[30px] rounded-full bg-blue-100">  <FaGoogle /></p>
            {/* <p onClick={()=>handleSocial("github")} className="flex justify-center items-center w-[30px] h-[30px] rounded-full bg-blue-100"> <FaGithub /></p> */}


        </div>
    </div>;
};
export default SocialLogin;
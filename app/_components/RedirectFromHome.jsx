'use client';
import { verifyToken } from "@/features/authHandler";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function RedirectFromHome() {
    const router = useRouter();
    useEffect(()=>{
        console.log("it's root")
        async function verify(){
            const isVerified = await verifyToken();
            if(isVerified) router.replace('/dashboard');
            else router.replace('/home');
        }
        verify();
    },[])
    return null;
}

export default RedirectFromHome;
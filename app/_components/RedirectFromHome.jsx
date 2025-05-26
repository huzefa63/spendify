'use client';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function RedirectFromHome() {
    const router = useRouter();
    useEffect(()=>{
    if (localStorage.getItem("token")) router.replace("/dashboard");
    else router.replace('/home');
    })
    return null;
}

export default RedirectFromHome;
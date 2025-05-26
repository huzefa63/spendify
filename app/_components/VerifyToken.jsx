'use client';
import { verifyToken } from "@/features/authHandler";
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef } from "react"

function VerifyToken() {
    const pathname = usePathname();
    const router = useRouter();
    const privateRoutes = useRef(['dashboard','transaction-history','settings']);
    useEffect(()=>{
        if(!privateRoutes.current.includes(pathname.slice(1))) return;
        async function verify(){
        const isVerified = await verifyToken();
        if(!isVerified) router.replace('login');
        }
        verify();
    },[pathname])
    return (
        <div>
            
        </div>
    )
}

export default VerifyToken

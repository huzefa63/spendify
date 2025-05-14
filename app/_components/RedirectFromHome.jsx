'use client';
import { useRouter } from "next/navigation";

function RedirectFromHome() {
    const router = useRouter();
    if(localStorage.getItem('token')) router.replace('/dashboard');
    return null;
}

export default RedirectFromHome

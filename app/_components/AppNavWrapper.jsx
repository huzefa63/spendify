'use client';
import AppNav from "@/app/_components/AppNav"
import { cookies } from "next/headers"
import { useEffect, useState } from "react";



async function AppNavWrapper() {
    const [user,setUser] = useState();
   
   useEffect(()=>{
    async function getUser(){

        const token = localStorage.getItem('token') || '';
        if(!token) return;
        try{
            const userRes = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/expenses/getTransaction?${queryString}`,{},{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            setUser(userRes)
        }
      
    catch(err){
        console.log(err);
   }
}
getUser();
   },[])
    // const user = await res.json();
    
    return (
        <AppNav user={user}/>
    )
}

export default AppNavWrapper

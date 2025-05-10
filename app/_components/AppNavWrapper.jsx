"use client";
import AppNav from "@/app/_components/AppNav";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

function AppNavWrapper() {
  const {data,isPending,error} = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    refetchOnWindowFocus:false,
  });

  async function getUser(){
    const token = localStorage.getItem('token') || '';
      if(!token) return;
      try{
        const userRes = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/getUser`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('hello',userRes);
        sessionStorage.setItem('username',userRes.data.userName);
        sessionStorage.setItem('email',userRes.data.email);
        return userRes;
      }catch(err){
        console.log(err);
      }
  }

  return <AppNav user={data} />;
}

export default AppNavWrapper;

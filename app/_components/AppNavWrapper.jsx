"use client";
import AppNav from "@/app/_components/AppNav";
import axios from "axios";
import { useEffect, useState } from "react";

function AppNavWrapper() {
  const [user, setUser] = useState();
  useEffect(() => {
    async function getUser() {
        console.log('fetching user')
      const token = localStorage.getItem('token') || '';
      if(!token) return;
      try {
        const userRes = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/getUser`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("userRes", userRes);
        setUser(userRes);
      } catch (err) {
        console.log(err);
      }
    }
    getUser();
  }, []);
  // const user = await res.json();

  return <AppNav user={user} />;
}

export default AppNavWrapper;

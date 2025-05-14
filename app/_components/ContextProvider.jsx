'use client';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();
function ContextProvider({children}) {
  const [menuPosition, setMenuPosition] = useState({});
  const [showModel, setShowModel] = useState(false);
  const [formType,setFormType] = useState('');
  const [transactionObj, setTransactionObj] = useState({});
  const router = useRouter();
  const { data, isPending, error } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    refetchOnWindowFocus: false,
  });
  const { data: categoryData } = useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
    placeholderData: (previousData, previousQuery) => previousData,
  });

  async function getUser() {
    const token = localStorage.getItem("token") || "";
    if (!token) return null;
    try {
      const userRes = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/getUser`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return userRes?.data || false;
    } catch (err) {
      console.log(err);
      return false
    }
  }
useEffect(()=>{
  if(localStorage.getItem('token')) router.replace('/transaction-history');
  // else router.replace('home');
})
  async function getCategory() {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/getCategories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(res.data.categories)
      return res.data.categories;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  return (
    <Context.Provider
      value={{
        data,
        categoryData,
        menuPosition,
        setMenuPosition,
        transactionObj,
        setTransactionObj,
        showModel,
        setShowModel,
        formType,
        setFormType,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useMyContext(){
    return useContext(Context);
}

export default ContextProvider

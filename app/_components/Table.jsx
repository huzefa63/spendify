'use client';
import { HiDotsVertical } from "react-icons/hi";
import PaginationController from "./PaginationController";
import { BiRupee } from "react-icons/bi";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";

function Row({data,i}){

  const date = dayjs(data.createdAt).format("MMM D, YYYY");
  const page = useSearchParams().get('page');
  const pageSize = 10;

  return (
    <div className="grid grid-cols-12 py-3  px-5 gap-10 border-b-1 border-gray-200 dark:border-gray-800">
      <p>{(page - 1) * pageSize + i + 1}</p>
      <p className="col-span-2">{data.category}</p>
      <p className="col-span-2">{data.transactionType}</p>
      <p className="col-span-3">{data.title}</p>
      <p className="col-span-2 tracking-widest">{date}</p>
      <p className="flex col-span-2 justify-between ">
        <span className="flex gap-1 items-center">
          {data.amount} <BiRupee />
        </span>{" "}
        <HiDotsVertical className="hover:bg-[var(--border)] transition-all duration-300 ease-in-out hover:cursor-pointer text-2xl py-1" />
      </p>
    </div>
  );
}

function Table({heading}) {
    const router = useRouter();
  let data;
   useEffect(async () => {
    const token = localStorage.getItem('token') || '';
    if(!token){
      router.route('/login');
    }
    try{
    const transaction = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/expenses/getTransaction?${queryString}`,{},{
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    data = await transaction.json();
    
  }catch(err){
    console.log(err);
  }
  },[])
    return (
      <div className="bg-[var(--surface)] relative  border-[var(--border)] border-1 overflow-hidden shadow-sm rounded-md w-full h-full  text-[var(--textDark)] flex flex-col">
        <div className="grid bg-[var(--background)] gap-10 py-2 px-5 grid-cols-12 overflow-auto ">
          <p>No</p>
          <p className="col-span-2">category</p>
          <p className="col-span-2">type</p>
          <p className="col-span-3">title</p>
          <p className="col-span-2">date</p>
          <p className="col-span-2 flex justify-between">amount</p>
        </div>
        <div className="flex-1 scroll-bar  pt-2 overflow-auto">
          {data?.transaction?.map((el, i) => (
            <Row key={i} data={el} i={i} />
          ))}
        </div>
        <div className="w-full bg-[var(--background)] border-1 border-[var(--border)] overflow-hidden px-5 h-[8%] flex items-center">
          <PaginationController pages={data?.totalPages}/>
        </div>
      </div>
    );
}

export default Table;

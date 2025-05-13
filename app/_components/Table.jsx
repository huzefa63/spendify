'use client';
import { HiDotsVertical } from "react-icons/hi";
import PaginationController from "./PaginationController";
import { BiRupee } from "react-icons/bi";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ImSpinner9 } from "react-icons/im";
import { useMyContext } from "./ContextProvider";


function Row({data,i}){
  const {setMenuPosition,setTransactionObj} = useMyContext();
  const date = dayjs(data.date).format("MMM D, YYYY");
  const dateInShort = dayjs(data.date).format('MM/DD/YYYY')
  const page = useSearchParams().get('page');
  const pageSize = 10;

  const handleClick = (e) => {
    console.log(e)
    const rect = e.target.closest('button').getBoundingClientRect();
    setMenuPosition({top: rect.y + rect.height + 8,right:window.innerWidth - rect.width - rect.x});
    setTransactionObj(data);
  }

  return (
    <div className="grid lg:grid-cols-12 grid-cols-4 lg:text-lg text-xs  py-3 px-1  lg:px-5 gap-10 border-b-1 border-gray-200 dark:border-gray-800">
      <p className="hidden lg:block">{(page - 1) * pageSize + i + 1}</p>
      <p className="lg:col-span-2">{data.category}</p>
      <p className="lg:col-span-2 hidden lg:block">{data.transactionType}</p>
      <p className="lg:col-span-3">{data.title}</p>
      <p className="lg:col-span-2 tracking-widest lg:text-lg hidden lg:block">{date}</p>
      <p className="lg:col-span-2 tracking-widest lg:text-lg lg:hidden">{dateInShort}</p>
      <p className="flex lg:col-span-2 justify-between">
        <span
          className="flex gap-1 items-center "
          style={
            data.transactionType === "income"
              ? { color: "#22c55e" }
              : { color: "#ef4444" }
          }
        >
          {data.amount} <BiRupee className=""/>
        </span>{" "}
        <button
          className="focus:ring-blue-500 focus:ring-1"
          onClick={handleClick}
        >
          <HiDotsVertical className="hover:bg-[var(--border)] transition-all duration-300 ease-in-out hover:cursor-pointer lg:text-2xl lg:py-1" />
        </button>
      </p>
    </div>
  );
}

function Table({heading}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.toString();
    console.log("from outside query fn", searchParams.toString());
    const {
      data,
      isPending,
      error,
      isFetching,
    } = useQuery({
      queryKey: ["transactions", search],
      queryFn: () => getTransactions(search),
      placeholderData: (previousData, previousQuery) => previousData,
      // placeholderData:{ },
    });


    async function getTransactions(queryString) {
      const token = localStorage.getItem("token") || ""; 
      if (!token) {
        router.replace("/login");
      }
      // const queryString = searchParams.toString(); holds old value
      try {
        let dataRes = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/transactions/getTransaction?${queryString}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // setPages(dataRes.data.totalPages);
        // setTransactions(dataRes.data.transaction);
        // setData(dataRes.data);.data?
        // console.log("dataRes", dataRes.data);
        return dataRes;
      } catch (err) {
        console.log(err);
        return [];
      }
    }
 
  
    return (
      <div className="bg-[var(--surface)] relative lg:text-lg text-sm px-1 border-[var(--border)] border-1 overflow-hidden shadow-sm rounded-md w-full h-full  text-[var(--textDark)] flex flex-col">
        <div className="grid bg-[var(--background)] gap-10 py-2 lg:px-5 px-1 grid-cols-4 lg:grid-cols-12 overflow-auto ">
          <p className="hidden lg:block">No</p>
          <p className="lg:col-span-2">category</p>
          <p className="lg:col-span-2 hidden lg:block">type</p>
          <p className="lg:col-span-3">title</p>
          <p className="lg:col-span-2">date</p>
          <p className="lg:col-span-2 flex justify-between">amount</p>
        </div>
        <div className="flex-1 scroll-bar  pt-2 overflow-auto">
          {!data?.data?.transaction && <span className="absolute top-[20%] left-1/2 -translate-x-1/2 "><ImSpinner9 className="text-3xl text-blue-500 animate-spin"/></span>}
          {data?.data?.transaction?.map((el, i) => (
            <Row key={i} data={el} i={i} />
          ))}
        </div>
        <div className="w-full bg-[var(--background)] border-1 border-[var(--border)] overflow-hidden px-5 h-[8%] flex items-center">
          <PaginationController pages={data?.data?.totalPages} isPending={isPending}/>
        </div>
      </div>
    );
}

export default Table;

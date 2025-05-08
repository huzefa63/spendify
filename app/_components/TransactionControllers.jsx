"use client";

import Button from "@/app/_ui/Button";
// React icons
import { useEffect, useRef, useState } from "react";
import { MdFilterList, MdSort } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoCheckmark } from "react-icons/io5";
import { MdAccessTime, MdCalendarToday, MdAttachMoney, MdMoneyOff, MdMoney, MdCategory } from "react-icons/md";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { FaListUl } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useSearchParams,useRouter } from "next/navigation";
import Dropdown from "./Dropdown";
import DatePicker from "./DatePicker";
import DatePickerr from "./DatePicker";
import { H1Icon } from "@heroicons/react/24/outline";

const filterOptions = ["all", "amount", "expense", "income", "category"];

const iconMap = {
  all: <FaListUl size={15} />,
  date: <MdCalendarToday size={20} />,
  amount: <MdAttachMoney size={20} />,
  expense: <MdMoneyOff size={20} />,
  income: <MdMoney size={20} />,
  category: <MdCategory size={20} />,
};


function TransactionControllers({ filterObj }) {
  // hooks
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCategory,setShowCategory] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const searchParams = useSearchParams(); // to set or append searchParams
  const router = useRouter(); // for navigation
  const pathname = usePathname();
  const filterButtonRef = useRef(null);
  const sortButtonRef = useRef(null);
  // effect
  
  useEffect(() => {
    console.log(filterObj)
   
    // if(!transaction || !transaction?.length) return;
    const params = new URLSearchParams(searchParams);
      params.set("filter", "all");
      params.set('page','1');
      router.replace(`${pathname}?${params.toString()}`);
  }, []);
  // handlers

  function filterHandler(filter,nestedFilterValue) {
    const params = new URLSearchParams(searchParams);
    if(filter !== 'all') params.delete('filter');

    if (filter === "all") {
      const keys = Array.from(params.keys());
      keys.forEach((key) => params.delete(key));
      params.set("filter", "all");
    }

    if(filter === 'expense' || filter === 'income'){
      params.set("transactionType", filter);
    }
    if(filter === 'category') params.set('category',nestedFilterValue);
    params.set('page','1');
    router.replace(`${pathname}?${params.toString()}`);
  }

  function showActiveFilter(filter){
    if(searchParams.get('filter') && filter === 'all') return <IoCheckmark className="text-blue-500 " />;
    if(searchParams.get('amount') && filter === 'amount') return <IoCheckmark className="text-blue-500 " />;
    if(searchParams.get('transactionType') && searchParams.get('transactionType') === filter) return <IoCheckmark className="text-blue-500 " />;
  }

  return (
    <div className="flex gap-2 justify-between">
      <div className="flex gap-4">
        <Button type="secondary">+ New entry</Button>
        <div className="relative">
          <div ref={filterButtonRef} className="buttonDiv">
            <Button handler={() => setShowDropdown(!showDropdown)}>
              <div className="flex gap-1 items-center ">
                <MdFilterList size={20} /> Filter <MdKeyboardArrowDown />
              </div>
            </Button>

            {/* dropdown menu */}
            <AnimatePresence>
              {showDropdown && (
                <Dropdown close={setShowDropdown} button={filterButtonRef}>
{/* const filterOptions = ["recent", "amount", "expense", "income", "category"]; */}

                  {filterOptions.map((el, i) => {
                    return (
                      <div key={i}>
                        <button
                          onClick={() => {
                            if (el === "category") return setShowCategory(!showCategory);
                            filterHandler(el);
                          }}
                          className="rounded-md transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:cursor-pointer p-2 w-full text-left flex items-center justify-between"
                        >
                          <div className="w-full">
                            <div className={`flex ${el === 'all' && 'pl-1'} gap-2 items-center w-full`}>
                              {iconMap[el]}
                              {el}
                              <span className="ml-auto">{showActiveFilter(el)}</span>
                              
                              {el === 'category' && <span className="ml-auto">
                               <IoIosArrowDown />
                              </span>}
                            </div>
                          </div>
                        </button>

                        {el === "category" && showCategory ? (
                          <div className="flex flex-col ">
                            {["Food", "Entertainment", "Transport"].map((el) => (
                              <button key={el} onClick={()=>{
                                filterHandler('category',el)
                              }} className="py-2 pl-8 text-left rounded-md transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:cursor-pointer">
                                {el}
                              </button>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </Dropdown>
              )}
            </AnimatePresence>
            {/* dropdown complete */}
          </div>
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <DatePickerr label="From" type="from" />
        <FaArrowRightArrowLeft className="dark:text-white"/>
        <DatePickerr label="To" type="to" />
      </div>
      <div className="relative">
        <Button type="primary" handler={()=>{
          const params = new URLSearchParams(searchParams);
          params.delete('to');
          params.delete('from');
          router.replace(`${pathname}?${params.toString()}`);
        }}>
            reset date
        </Button>
      </div>
    </div>
  );
}
export default TransactionControllers;
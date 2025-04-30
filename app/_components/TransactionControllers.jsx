"use client";

import Button from "@/app/_ui/Button";
// React icons
import { useEffect, useRef, useState } from "react";
import { MdFilterList, MdSort } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoCheckmark } from "react-icons/io5";
import { MdAccessTime, MdCalendarToday, MdAttachMoney, MdMoneyOff, MdMoney, MdCategory } from "react-icons/md";


import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Dropdown from "./Dropdown";

const filterOptions = ["recent","date", "amount", "expense", "income", "category"];

const iconMap = {
  recent: <MdAccessTime size={20} />,
  date: <MdCalendarToday size={20} />,
  amount: <MdAttachMoney size={20} />,
  expense: <MdMoneyOff size={20} />,
  income: <MdMoney size={20} />,
  category: <MdCategory size={20} />,
};


function TransactionControllers({ filterObj }) {
  // hooks
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const ref = useRef(null);
  const searchParams = useSearchParams(); // to set or append searchParams
  const router = useRouter(); // for navigation
  const pathname = usePathname();

  // effect
  useEffect(function () {
    function detectClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.documentElement.addEventListener("click", detectClick);
    return () =>
      document.documentElement.removeEventListener("click", detectClick);
  }, []);

  useEffect(function(){
    const params = new URLSearchParams(searchParams);
    if(!params.has('filter')){
      params.set('filter','recent');
      router.replace(`${pathname}?${params}`);
    } 
  },[])

  // handlers

  function filterHandler(filter) {
    const params = new URLSearchParams(searchParams);
    const currentFilters = params.getAll("filter");
    if (currentFilters?.includes(filter)) {
      params.delete("filter", filter);
      router.replace(`${pathname}?${params.toString()}`);
      return;
    }
    if(filter === 'expense'){
      params.delete('filter','income');
    }
    if(filter === 'income'){
      params.delete('filter','expense');
    }
    params.append("filter", filter);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex gap-2 justify-between">
      <div className="flex gap-4">
        <Button type="secondary">+ New entry</Button>
        <div className="relative">
          <div ref={ref}>
            <Button handler={() => setShowDropdown(!showDropdown)}>
              <div className="flex gap-1 items-center ">
                <MdFilterList size={20} /> Filter <MdKeyboardArrowDown />
              </div>
            </Button>

            {/* dropdown menu */}
            {/* <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`text-[var(--textDark)] absolute left-0 top-full mt-2 z-50 w-52 flex flex-col p-3 bg-[var(--surface)]  shadow-sm`}
                  >
                    
                    {filterOptions.map((el, i) => {
                      return (
                        <button
                          onClick={() => filterHandler(el)}
                          key={i}
                          className="rounded-md transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:cursor-pointer p-2 w-full text-left flex items-center justify-between"
                        >
                          <div className="flex gap-2">
                            {iconMap[el]}
                            {el}
                          </div>
                          {filterObj?.filter?.includes(el) && (
                            <IoCheckmark className="text-blue-500 " />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence> */}
            <AnimatePresence>
              {showDropdown && (
                <Dropdown options={filterOptions} iconMap={iconMap} handler={filterHandler}/>
              )}
            </AnimatePresence>
            {/* dropdown complete */}
          </div>
        </div>
      </div>
      <div className="relative">
        <Button handler={() => setShowSort(!showSort)}>
          <div className="flex gap-1 items-center ml-auto">
            <MdSort size={20} /> Sort <MdKeyboardArrowDown />
          </div>
        </Button>
        <AnimatePresence>
          {showSort && (
            <Dropdown
              options={filterOptions}
              iconMap={iconMap}
              position="right-0"
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
export default TransactionControllers;
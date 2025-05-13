"use client";

import Button from "@/app/_ui/Button";
// React icons
import { useEffect, useRef, useState } from "react";
import { MdFilterList } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoCheckmark } from "react-icons/io5";
import {
  MdCalendarToday,
  MdAttachMoney,
  MdMoneyOff,
  MdMoney,
  MdCategory,
} from "react-icons/md";
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { AnimatePresence } from "framer-motion";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Dropdown from "./Dropdown";
import DatePickerr from "./DatePicker";
import ModelWindow from "./ModelWindow";
import TransactionForm from "./TransactionForm";
import { useMyContext } from "./ContextProvider";
import ContextMenu from "./ContextMenu";
import RenderContextMenu from "./RenderContextMenu";

const filterOptions = ["newest", "oldest", "expense", "income", "amount"];

const iconMap = {
  newest: <FaSortAmountDownAlt size={15} />,
  oldest: <FaSortAmountUpAlt size={15} />,
  date: <MdCalendarToday size={20} />,
  amount: <MdAttachMoney size={20} />,
  expense: <MdMoneyOff size={20} />,
  income: <MdMoney size={20} />,
  category: <MdCategory size={20} />,
};

function TransactionControllers({ filterObj }) {
  // hooks
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputType,setInputType] = useState('text');
  const [inputType2,setInputType2] = useState('text');
  const [showAmount, setShowAmount] = useState(false);
  // const [showModel, setShowModel] = useState(false);
  const searchParams = useSearchParams(); // to set or append searchParams
  const router = useRouter(); // for navigation
  const pathname = usePathname();
  const filterButtonRef = useRef(null);
  const { categoryData, menuPosition,transactionId,showModel,setShowModel,setFormType } = useMyContext();
  // effect

  useEffect(() => {
    console.log("category", categoryData);

    // if(!transaction || !transaction?.length) return;
    if (Object.keys(filterObj).length > 0) return;
    const params = new URLSearchParams(searchParams);
    params.set("filter", "newest");
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  }, []);
  // handlers

  function handleParams(params, paramName, value) {
    // console.log(params.get(paramName),value);
    if (params.get(paramName) === value) {
      params.delete(paramName);
    } else {
      params.set(paramName, value);
    }
  }

  async function filterHandler(filter, nestedFilterValue) {
    const params = new URLSearchParams(searchParams);

    if (filter === "newest" || filter === "oldest") {
      params.set("filter", filter);
    }

    if (filter === "expense" || filter === "income")
      handleParams(params, "transactionType", filter);
    if (filter === "category")
      handleParams(params, "category", nestedFilterValue);
    if (filter === "amount") handleParams(params, "amount", nestedFilterValue);
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  }

  function showActiveFilter(filter) {
    if (searchParams.get("filter") && filter === searchParams.get("filter"))
      return <IoCheckmark className="text-blue-500 " />;
    if (
      searchParams.get("transactionType") &&
      searchParams.get("transactionType") === filter
    )
      return <IoCheckmark className="text-blue-500 " />;
  }

  return (
    <div className="lg:flex gap-2 justify-between items-center">
      {menuPosition?.right && menuPosition?.top && <RenderContextMenu />}
      {showModel && (
        <ModelWindow
          close={() => {
            setShowModel(!showModel);
          }}
        >
          <TransactionForm />
        </ModelWindow>
      )}

      <div className="lg:flex gap-4">
        <div className="flex gap-4 justify-between px-2 lg:px-0">
          <Button
            type="secondary"
            handler={() => {
              setShowModel(true);
              setFormType("create");
            }}
          >
            <span className="lg:block hidden">+ New entry</span>
            <span className="lg:hidden text-xs">+ add</span>
          </Button>
          <div className="relative">
            <div ref={filterButtonRef} className="buttonDiv">
              <Button
                handler={() => {
                  setShowDropdown(!showDropdown);
                }}
              >
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
                        <div key={i} className="h-fit">
                          <button
                            onClick={() => {
                              if (el === "amount")
                                return setShowAmount(!showAmount);
                              filterHandler(el);
                            }}
                            className="rounded-md transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:cursor-pointer p-2 w-full text-left flex items-center justify-between"
                          >
                            <div className="w-full">
                              <div
                                className={`flex ${
                                  (el === "newest" || el === "oldest") && "pl-1"
                                } gap-2 items-center w-full`}
                              >
                                {iconMap[el]}
                                {el}
                                <span className="ml-auto">
                                  {showActiveFilter(el)}
                                </span>
                                {el === "amount" && (
                                  <IoIosArrowDown
                                    className={`ml-auto transition-all duration-300 ${
                                      showAmount && "rotate-180"
                                    }`}
                                  />
                                )}
                              </div>
                            </div>
                          </button>

                          {el === "amount" && showAmount ? (
                            <NestedDropdown
                              filterName="amount"
                              filterObj={filterObj}
                              options={["low-to-high", "high-to-low"]}
                              filterHandler={filterHandler}
                            />
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
          <select
            disabled={categoryData?.length < 1}
            value={filterObj?.category}
            onChange={(e) => filterHandler("category", e.target.value)}
            className="bg-transparent col-span-2 lg:col-span-1 disabled:cursor-not-allowed border-[var(--border)] border-1 text-[var(--text)] lg:px-8 h-fit py-2 rounded-sm "
          >
            <option
              value=""
              className="dark:bg-gray-800 transition-all duration-300  ease-in-out"
            >
              {categoryData?.length > 0 ? "all category" : "add category first"}
            </option>
            {categoryData?.map((el, i) => {
              return (
                <option
                  key={i}
                  value={el.categoryName}
                  className="dark:bg-gray-800 transition-all duration-300 ease-in-out"
                >
                  {el.categoryName}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="flex relative lg:gap-5 mt-2 lg:mt-0 gap-2 lg:items-center max-w-full px-1 lg:px-0">
        <DatePickerr label="From" type="from" />
        <FaArrowRightArrowLeft className="dark:text-white hidden lg:flex" />
        <DatePickerr label="To" type="to" />
        <div className="relative text-center lg:mt-0 lg:hidden self-end">
          <Button
            type="primary"
            handler={() => {
              const params = new URLSearchParams(searchParams);
              params.delete("to");
              params.delete("from");
              router.replace(`${pathname}?${params.toString()}`);
            }}
          >
            reset
          </Button>
        </div>
      </div>
      <div className="text-center lg:mt-0 hidden lg:flex ">
        <Button
          type="primary"
          handler={() => {
            const params = new URLSearchParams(searchParams);
            params.delete("to");
            params.delete("from");
            router.replace(`${pathname}?${params.toString()}`);
          }}
        >
          reset date
        </Button>
      </div>
    </div>
  );
}

function NestedDropdown({ filterObj, options, filterHandler, filterName }) {
  return (
    <div className="flex flex-col lg:max-h-32 overflow-auto">
      {options?.map((el) => (
        <button
          key={el}
          onClick={() => {
            filterHandler(filterName, el);
          }}
          className="py-2 pl-8 text-left pr-2 items-center rounded-md flex transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:cursor-pointer"
        >
          {el}
          {filterObj[filterName] === el && (
            <IoCheckmark className="ml-auto text-blue-500" />
          )}
        </button>
      ))}
    </div>
  );
}

export default TransactionControllers;

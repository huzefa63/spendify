'use client';
import Button from "@/app/_ui/Button";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosArrowForward,IoIosArrowBack } from "react-icons/io";
function PaginationController({pages}) {
  console.log(pages);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams(); 
  const page = searchParams.get('page') || 1;
  function nextPage(){
    const params = new URLSearchParams(searchParams);
    let page = params.get('page');
    params.set('page',Number(page) + 1);
    router.replace(`${pathname}?${params}`);
  }
  function previousPage(){
    const params = new URLSearchParams(searchParams);
    let page = params.get("page");
    params.set('page',Number(page) - 1);
    router.replace(`${pathname}?${params}`);
  }
    return (
      <div className="flex justify-between items-center w-full">
        {pages > 0 ? (
          <div className="">
            page {page} out of {pages}
          </div>
        ) : (
          "no pages found!"
        )}
        <div className="flex gap-3">
          <button
            onClick={previousPage}
            disabled={!pages || page <= 1}
            className={`flex disabled:cursor-not-allowed disabled:opacity-50 gap-2 text-[var(--text)]  ${
              !pages || page <= 1
                ? ""
                : "hover:bg-blue-600 hover:text-white"
            } transition-all duration-300 ease-in-out hover:cursor-pointer py-1 px-2 rounded-sm items-center`}
          >
            <IoIosArrowBack /> previous
          </button>
          <button
            onClick={nextPage}
            disabled={!pages || page >= pages}
            className={`flex disabled:cursor-not-allowed disabled:opacity-50 gap-2 text-[var(--text)]  ${
              !pages || page >= pages
                ? ""
                : "hover:bg-blue-600 hover:text-white"
            } transition-all duration-300 ease-in-out hover:cursor-pointer py-1 px-2 rounded-sm items-center`}
          >
            Next <IoIosArrowForward />{" "}
          </button>
        </div>
      </div>
    );
}

export default PaginationController;

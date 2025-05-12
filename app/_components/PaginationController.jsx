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
  const [page,setPage] = useState(1);
  
  function nextPage(){
    const newPage = page + 1;
    const params = new URLSearchParams(searchParams);
    setPage(newPage);
    params.set('page',newPage);
    router.replace(`${pathname}?${params}`);
  }
  function previousPage(){
    const newPage = page - 1;
    const params = new URLSearchParams(searchParams);
    setPage(newPage);
    params.set('page',newPage);
    router.replace(`${pathname}?${params}`);
  }
  // useEffect(function(){
  //   const params = new URLSearchParams(searchParams);
  //   if(params.get('page')){
  //     setPage(Number(params.get('page')));
  //   }
  // },[searchParams])
  

    return (
      <div className="flex justify-between items-center w-full">
        {pages > 0 ? <div className="">
          page {searchParams.get('page')} out of {pages}
        </div> : 'no pages found!'}
        <div className="flex gap-3">
          <button
          onClick={previousPage}
            disabled={!pages || page <= 1}
            className={`flex disabled:cursor-not-allowed disabled:opacity-50 gap-2 text-[var(--text)]  ${
              !pages || page <= 1 ? "" : "hover:bg-blue-600 hover:text-white"
            } transition-all duration-300 ease-in-out hover:cursor-pointer py-1 px-2 rounded-sm items-center`}
          >
            <IoIosArrowBack /> previous
          </button>
          <button
            onClick={nextPage}
            disabled={!pages || page >= pages}
            className={`flex disabled:cursor-not-allowed disabled:opacity-50 gap-2 text-[var(--text)]  ${
              !pages || page >= pages ? "" : "hover:bg-blue-600 hover:text-white"
            } transition-all duration-300 ease-in-out hover:cursor-pointer py-1 px-2 rounded-sm items-center`}
          >
            Next <IoIosArrowForward />{" "}
          </button>
        </div>
      </div>
    );
}

export default PaginationController;

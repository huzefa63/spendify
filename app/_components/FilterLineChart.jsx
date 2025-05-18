'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMyContext } from "./ContextProvider";

function FilterLineChart() {
    const {categoryData} = useMyContext();
    const pathname = usePathname();
    const router = useRouter();
    const params = useSearchParams();
    function handleChange(e){
      const param = new URLSearchParams(params);
      param.set('category',e.target.value);
      router.replace(`${pathname}?${param.toString()}`);
    }
    return (
      <select
      onChange={handleChange}
        name=""
        id=""
        className="border-1 border-[var(--border)] lg:px-8 lg:py-2 px-2 py-0.5 rounded-sm"
      >
        <option className="bg-[var(--background)]" value="">no filter</option>
        {categoryData?.map((el,i) => {
            return <option key={i} className="bg-[var(--background)]" value={el?.categoryName}>{el.categoryName}</option>
        })}
      </select>
    );
}

export default FilterLineChart

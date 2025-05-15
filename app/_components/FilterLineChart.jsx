'use client';

import { useParams, usePathname, useRouter } from "next/navigation";
import { useMyContext } from "./ContextProvider";

function FilterLineChart() {
    const {categoryData} = useMyContext();
    const pathname = usePathname();
    const router = useRouter();
    const params = useParams();
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
        className="border-1 border-[var(--border)] px-8 py-2 rounded-sm"
      >
        <option className="dark:bg-gray-700" value="">no filter</option>
        {categoryData?.map((el,i) => {
            return <option key={i} className="dark:bg-gray-700" value={el?.categoryName}>{el.categoryName}</option>
        })}
      </select>
    );
}

export default FilterLineChart

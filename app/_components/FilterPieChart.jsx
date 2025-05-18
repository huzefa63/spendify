'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMyContext } from "./ContextProvider";

function FilterPieChart() {
    const pathname = usePathname();
    const router = useRouter();
    const params = useSearchParams();
    function handleChange(e){
      const param = new URLSearchParams(params);
      param.set('transactionType',e.target.value);
      router.replace(`${pathname}?${param.toString()}`,{scroll:false});
    }
    return (
      <select
        onChange={handleChange}
        value={params.get("transactionType") || "income"}
        name=""
        id=""
        className="border-1 border-[var(--border)] lg:px-8 lg:py-2 px-2 py-0.5 rounded-sm"
      >
        <option className="bg-[var(--background)]" value="income">
          Income
        </option>
        <option className="bg-[var(--background)]" value="expense">
          Expense
        </option>
      </select>
    );
}

export default FilterPieChart

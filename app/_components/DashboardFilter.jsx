'use client';
import { FaFilter } from "react-icons/fa"
import Button from "../_ui/Button"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const months = ['january','february','march','april','may','june','july','august','september','october','november','december'];

function DashboardFilter() {
    const pathname = usePathname();
    const params = useSearchParams();
    const router = useRouter();

    function handleChange(e,param){
        const searchParam = new URLSearchParams(params);
        searchParam.set(param,e.target.value)
        router.replace(`${pathname}?${searchParam.toString()}`)
    }
    useEffect(() => {
      const param = new URLSearchParams(params);
      if (!params?.year) param.set("year", new Date().getFullYear());
      if(!params?.month) param.set('monthNumber','fullYear');
      if(!params?.transactionType) param.set('transactionType','income');
      
    router.replace(`${pathname}?${param.toString()}`);
    }, []);
    return (
        <div className="space-x-3">
            <select value={params.get('monthNumber') || 'fullYear'} onChange={(e) => handleChange(e,'monthNumber')} name="" id=""  className="py-2 px-3 border-1 border-[var(--border)]">
                <option value="fullYear" className="bg-[var(--surface)]">full year</option>
                {months.map((el,i) => <option key={i} value={i} className="bg-[var(--surface)]">{el}</option>)}
            </select>
            <select name="" id="" value={new URLSearchParams(params).get('year') || new Date().getFullYear()} onChange={(e)=>handleChange(e,'year')} className="py-2 px-3 border-1 border-[var(--border)]">
                {['2023','2024','2025'].map((el,i) => <option className="bg-[var(--surface)]" key={i} value={el}>{el}</option>)}
            </select>
        </div>
    )
}

export default DashboardFilter

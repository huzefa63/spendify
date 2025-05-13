'use client';
import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";

export default function App({label,type}) {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  function handleDate(date){
    const urlParams = new URLSearchParams(params);
    urlParams.set(type,`${date?.$M + 1}-${date?.$D}-${date?.$y}`);
    router.replace(`${pathname}?${urlParams}`);
  }
  function dateValue(type){
    if(params.get(type)){
      return dayjs(params.get(type));
    }
    else{
      return null;
    }
  }
  function htmlDateValue(type){
    if(params.get(type)){
      return dayjs(params.get(type));
    }
    else{
      return '';
    }
  }
  function handlehtmlDate(e){
    const urlParams = new URLSearchParams(params);
    urlParams.set(type,e.target.value);
    router.replace(`${pathname}?${urlParams}`);
  }
  return (
    <div className="">
      <div className="lg:block hidden">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            onChange={handleDate}
            className=""
            label={label}
            value={type === "from" ? dateValue("from") : dateValue("to")}
            slotProps={{
              textField: {
                size: "small",

                error: false,
                InputProps: {
                  style: {
                    color: "var(--text)", // Input text color
                    border: "1px solid var(--border)",
                  },
                  sx: {
                    width: "100%",
                    m: 0,
                    svg: {
                      color: "var(--text)", // Calendar icon color
                    },
                  },
                },
                InputLabelProps: {
                  style: {
                    color: "var(--text)", // Label color
                  },
                },
              },
            }}
          />
        </LocalizationProvider>
      </div>
      <div className="lg:hidden">
        <label htmlFor="" className="text-[var(--text)] text-xs ml-1">{type}</label>
        <input
          onChange={handlehtmlDate}
          value={type === "from" ? htmlDateValue("from") : htmlDateValue("to")}
          type="date"
          placeholder="from"
          className="border-1 border-[var(--border)] px-3 py-1 text-[var(--text)] lg:hidden"
        />
      </div>
    </div>
  );
}

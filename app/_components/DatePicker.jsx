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
  return (
    <div className="">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          onChange={handleDate}
          label={label}
          value={type==='from' ?dateValue('from') : dateValue('to')}
          slotProps={{
            textField: {
              size: "small",
              error:false,
              InputProps: {
                style: {
                  color: "var(--text)", // Input text color
                  border: "1px solid var(--border)",
                },
                sx: {
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
  );
}

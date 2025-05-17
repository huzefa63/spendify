'use client';
import { getPieChartData } from "@/features/dashboardHandlers";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { PureComponent } from "react";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from "recharts";

// const data01 = [
//   { name: "food", income: 400, expense:500 },
//   { name: "entertainment", income: 300, expense:500 },
//   { name: "others", income: 300, expense:500 },
//   { name: "health", income: 200, expense:500 },
  
  
 
  
// ];

// const data02 = [
//   { name: "Group A", value: 2400 },
//   { name: "Group B", value: 4567 },
//   { name: "Group C", value: 1398 },
//   { name: "Group D", value: 9800 },
//   { name: "Group E", value: 3908 },
//   { name: "Group F", value: 4800 },
//   { name: "Group F", value: 4800 },
//   { name: "Group F", value: 4800 },
//   { name: "Group F", value: 4800 },
//   { name: "Group F", value: 4800 },
//   { name: "Group F", value: 4800 },
//   { name: "Group F", value: 4800 },
//   { name: "Group F", value: 4800 },
// ];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // Add more if needed
const textColors = ["blue-500", "green-500", "orange-500", "red-500"]; // Add more if needed



function PieChartDashboard(){
  const param = useSearchParams();
  const {data} = useQuery({
    queryKey:['categoryDataMonthly',param.get('transactionType')],
    queryFn:()=>getPieChartData(param)
  })
    return (
      <div className="overflow-y-auto h-full  customized-scroll-bar ">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            
              <Pie
                dataKey="totalAmount"
                isAnimationActive={false}
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={120}
                label={({ payload }) => payload?.payload?._id}
              >
                {data?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            
            <Tooltip content={<CustomToolTip />} />
            <Legend
              width="40%"
              align="right"
              layout="vertical"
              verticalAlign="middle"
              content={({ payload }, i) => {
                // console.log('payload',payload[0]);
                return (
                  <div
                    key={i}
                    className="border-1 max-h-[20rem] bg-[var(--background)] rounded-sm px-4 py-2 border-[var(--border)] overflow-auto customized-scroll-bar w-[40%]"
                  >
                    {payload?.map((entry, i) => (
                      <p
                        className={`text-${textColors[i % textColors.length]}`}
                        key={i}
                      >
                        {entry?.payload?._id}
                      </p>
                    ))}
                  </div>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
}

export default PieChartDashboard;

function formatCurrency(amount) {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(amount);
  return formattedAmount;
}

function CustomToolTip({active,payload,label}){
  const params = useSearchParams(); 
  const year = new URLSearchParams(params).get('year');
  const amount = formatCurrency(payload[0]?.value);
  const type = params.get("transactionType");
  return(
    <div className="bg-[var(--background)] space-y-3 p-5 border-1 border-[var(--border)]">
      <h1>year {year}</h1>
      <h1>category: {payload[0]?.payload?._id}</h1>
      {/* <p className="text-green-500">income: {income}</p> */}
      <p className={type === 'income'?'text-green-500':'text-red-500'}>{type === 'income'?'amount gained':'amount spent'}: {amount}</p>
    </div>
  )
}
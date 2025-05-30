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
  const totalAmount = data?.reduce((acc,cur) => acc + cur?.totalAmount,0);
    return (
      <>
        {data?.length < 1 && (
          <div className="h-full flex items-center justify-center">
            <p className="lg:text-3xl lg:tracking-wider">
              No {param.get('transactionType')} data available to display pie chart!
            </p>
          </div>
        )}
        {data?.length > 0 && (
          <>
            <div className="overflow-y-auto w-full h-full hidden lg:block customized-scroll-bar">
              <PieChartComponent
                totalAmount={totalAmount}
                size={120}
                data={data}
              />
            </div>
            <div className="overflow-y-auto h-full lg:hidden customized-scroll-bar">
              <PieChartComponent
                totalAmount={totalAmount}
                size={80}
                data={data}
                position={{
                  align: "center",
                  verticalAlign: "bottom",
                  layout: "horizontal",
                }}
              />
            </div>
          </>
        )}
      </>
    );
}

export default PieChartDashboard;

const renderCustomizedLabel = ({
  totalAmount,
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {totalAmount}
    </text>
  );
};

function PieChartComponent({size,data,position,totalAmount}){
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          dataKey="totalAmount"
          labelLine={!position?.align}
          isAnimationActive={true}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={size}
          label={position?.align ?  ({
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            percent,
            index,
            payload,
          }) => {
            const RADIAN = Math.PI / 180;
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);
            const amount = ((payload?.payload?.totalAmount / totalAmount) * 100).toFixed(2);
            return (
              <text
                x={x}
                y={y}
                fill="white"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={12}
              >
                {amount}%
              </text>
            );
          } : ({ cx, cy, midAngle, innerRadius, outerRadius, payload }) => {
            const RADIAN = Math.PI / 180;
            const radius = outerRadius + 40; // <-- Push label text outward
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);
          
            const text =
              (payload?.payload?.totalAmount / totalAmount * 100).toFixed(2) + '%'
          
            return (
              <text
                x={x}
                y={y}
                fill="white"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={12}
              >
                {text}
              </text>
            )}}
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip content={<CustomToolTip />} />
        <Legend
          width="40%"
          align={"right"}
          layout={"vertical"}
          verticalAlign={"middle"}
          content={({ payload }, i) => {
            // console.log('payload',payload[0]);
            return (
              <div
                key={i}
                className="border-1 max-h-[20rem] bg-[var(--background)] rounded-sm px-4 py-2 border-[var(--border)] overflow-auto customized-scroll-bar lg:w-1/2"
              >
                <h1 className="border-b-1 border-[var(--border)] pb-1 mb-3">
                  Categories
                </h1>
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
  );
}

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
  return (
    <div className="bg-[var(--background)] space-y-3 p-5 border-1 border-[var(--border)]">
      <h1>year {year}</h1>
      <h1>category: {payload[0]?.payload?._id}</h1>
      {/* <p className="text-green-500">income: {income}</p> */}
      <p
        className={`${
          type === "income" ? "text-green-500" : "text-red-500"
        }w-full break-all`}
      >
        {type === "income" ? "amount gained" : "amount spent"}: {amount}
      </p>
    </div>
  );
}
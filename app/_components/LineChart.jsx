"use client";
import { getLineChartData } from "@/features/dashboardHandlers";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function formatCurrency(amount){
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(amount);
  return formattedAmount
}

function CustomToolTip({active,payload,label}){
  const params = useSearchParams(); 
  const year = new URLSearchParams(params).get('year');
  const income = formatCurrency(payload[1]?.value);
  const expense = formatCurrency(payload[0]?.value);

  return(
    <div className="bg-[var(--background)] space-y-3 p-5 border-1 border-[var(--border)]">
      <h1>{label}, {year}</h1>
      <p className="text-green-500">income: {income}</p>
      <p className="text-red-500">expense: {expense}</p>
    </div>
  )
}
{/* <YAxis tick={{ fontSize: "15px" }} style={{ fill: "white" }} domain={[0,100]}/>
<XAxis
  dataKey="name"
  tick={{ fontSize: "12px", dy: 3 }}
  interval={0}
  style={{ fill: "white" }}
/> */}
function DashboardLineChart({searchParams}) {
  const { data: monthlyTransaction, isPending } = useQuery({
    queryKey: ["monthlyTransaction",searchParams],
    queryFn: ()=>getLineChartData(searchParams),
    refetchOnWindowFocus:false
  });
  return (
    <div className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={monthlyTransaction}
          
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" tickFormatter={(val) => val.slice(0,3)} tick={{fontSize:'10px',dy:3}}/>
          <YAxis tick={{fontSize:'10px'}}/>
          <Tooltip content={<CustomToolTip />}/>
          <Legend />
          <Line
            type="monotone"
            dataKey="Expense"
            stroke="#ef4444"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="Income" stroke="#22c55e" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DashboardLineChart;

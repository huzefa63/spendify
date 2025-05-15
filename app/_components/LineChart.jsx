"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
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

const data = [
  {
    name: "jan",
    income: 4000,
    expense: 2400,
  },
  {
    name: "feb",
    income: 3000,
    expense: 1398,
    amt: 2210,
  },
  {
    name: "march",
    income: 2000,
    expense: 9800,
    amt: 2290,
  },
  {
    name: "april",
    income: 2780,
    expense: 3908,
    amt: 2000,
  },
  {
    name: "may",
    income: 1890,
    expense: 4800,
    amt: 2181,
  },
  {
    name: "june",
    income: 2390,
    expense: 3800,
    amt: 2500,
  },
  {
    name: "july",
    income: 3490,
    expense: 4300,
    amt: 2100,
  },
  {
    name: "august",
    income: 2000,
    expense: 9800,
    amt: 2290,
  },
  {
    name: "sept",
    income: 2780,
    expense: 3908,
    amt: 2000,
  },
  {
    name: "oct",
    income: 1890,
    expense: 4800,
    amt: 2181,
  },
  {
    name: "nov",
    income: 2390,
    expense: 3800,
    amt: 2500,
  },
  {
    name: "dec",
    income: 3490,
    expense: 4300,
    amt: 2100,
  },
];

function DashboardLineChart({searchParams}) {
  const { data: monthlyTransaction, isPending } = useQuery({
    queryKey: ["monthlyTransaction",searchParams],
    queryFn: getMonthlyTransaction,
    refetchOnWindowFocus:false
  });

  async function getMonthlyTransaction() {
    const token = localStorage.getItem("token");
    const params = new URLSearchParams(searchParams).toString();
    console.log(params);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/transactions/getYearlyTransaction?${params}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      return res.data.transactions;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  return (
    <div className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={monthlyTransaction}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
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

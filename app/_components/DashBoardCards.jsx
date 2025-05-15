'use client';
import { MdSwapHoriz, MdArrowUpward, MdArrowDownward } from "react-icons/md";
import { BiRupee, BiTransfer } from "react-icons/bi";
import { HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const cardData = [
    {label:'Total Transaction', icon:'totalTransaction',amount:32000},
    {label:'Total Income', icon:'totalIncome',amount:23000},
    {label:'Total Expense', icon:'totalExpense',amount:9000},
]
const icons = {
    totalTransaction:<MdSwapHoriz />,
    totalIncome:<MdArrowUpward className="text-green-500"/>,
    totalExpense:<MdArrowDownward className="text-red-500"/>,
}
function DashBoardCards({params}) {
  const {data} = useQuery({
    queryKey:['financialStats'],
    queryFn:getStats

  })
  async function getStats(){
    const token = localStorage.getItem('token');
    const param = new URLSearchParams(params).toString();
    try{
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/transactions/getFinancialStats?${param}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    console.log(res);
      if(res.data.status === 'success') return res.data.transactionFlow[0];
      return null;
    }catch(err){
      console.log(err);
      return null;
    }
  }
  const cardData = [
    { label: "Total Transaction", icon: "totalTransaction", amount: data?.totalTransaction },
    { label: "Total Income", icon: "totalIncome", amount: data?.income },
    { label: "Total Expense", icon: "totalExpense", amount: data?.expense },
  ];
  return (
    <div className="grid grid-cols-3 lg:gap-3 gap-1">
      {cardData.map((el,i) => <Cards key={i} data={el}/>)}
    </div>
  );
}

function Cards({data}) {
  return (
    <div className="bg-[var(--surface)] lg:px-4 lg:py-5 lg:space-y-3 space-y-2 py-2 px-1 border-1 border-[var(--border)]">
      <h1 className="flex gap-1 items-center text-xs lg:text-xl">{icons[data.icon]}{data.label}</h1>
        <h1 className="flex gap-1 items-center text-sm lg:text-3xl">{data.amount} <BiRupee /></h1>
    </div>
  );
}

export default DashBoardCards;

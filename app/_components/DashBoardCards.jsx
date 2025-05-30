'use client';
import { MdSwapHoriz, MdArrowUpward, MdArrowDownward } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { getDashboardCardsData } from "@/features/dashboardHandlers";

const cardData = [
    {label:'Total Transaction', icon:'totalTransaction',amount:32000},
    {label:'Total Income', icon:'totalIncome',amount:23000},
    {label:'Total Expense', icon:'totalExpense',amount:9000},
]
const icons = {
    totalTransaction:<MdSwapHoriz className="text-blue-500"/>,
    totalIncome:<MdArrowUpward className="text-green-500"/>,
    totalExpense:<MdArrowDownward className="text-red-500"/>,
}
function DashBoardCards({params}) {
  const {data} = useQuery({
    queryKey:['financialStats',params?.year,params?.monthNumber],
    queryFn:()=>getDashboardCardsData(params),
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus:false,
  })

  
  const cardData = [
    { label: "Total Transaction", yearLabelColor:'bg-blue-500', icon: "totalTransaction", amount: data?.totalTransaction },
    { label: "Total Income", yearLabelColor:'bg-green-500', icon: "totalIncome", amount: data?.income },
    { label: "Total Expense", yearLabelColor:'bg-red-500', icon: "totalExpense", amount: data?.expense },
  ];
  return (
    <div className="grid grid-cols-3 lg:gap-3 gap-1">
      {cardData.map((el,i) => <Cards key={i} data={el} year={params?.year} month={params?.monthNumber}/>)}
    </div>
  );
}
const months = ['jan','feb','march','april','may','june','july','aug','sep','oct','nov','dec'];

function Cards({data,year,month}) {
  const formattedAmount = new Intl.NumberFormat('en-US',{style:'currency',currency:'INR'}).format(data?.amount);
  return (
    <div className="bg-[var(--surface)] break-words lg:px-4 lg:py-5 lg:space-y-3 space-y-2 py-2 px-1 border-1 border-[var(--border)]">
      <h1 className="flex gap-1 items-center text-xs lg:text-xl">
        {icons[data.icon]}{data.label} {year && <span className={`px-4 hidden lg:block ml-2 py-1 rounded-3xl text-xs ${data?.yearLabelColor}`}>{year} {month && month !== 'fullYear' ? `, ${months[month]}`: ''}</span>}
      </h1>
        <h1 className={`flex gap-1 break-all items-center text-sm lg:text-3xl ${data?.yearLabelColor?.replace('bg','text')}`}>{formattedAmount.includes('NaN') ? 'no records':formattedAmount}</h1>
    </div>
  );
}

export default DashBoardCards;

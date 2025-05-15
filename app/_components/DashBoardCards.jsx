import { MdSwapHoriz, MdArrowUpward, MdArrowDownward } from "react-icons/md";
import { BiRupee, BiTransfer } from "react-icons/bi";
import { HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";

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
function DashBoardCards() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {cardData.map((el,i) => {
        return <Cards data={el} key={i}/>
      })}
    </div>
  );
}

function Cards({data}) {
  return (
    <div className="bg-[var(--surface)] px-4 py-5 space-y-3 border-1 border-[var(--border)]">
      <h1 className="flex gap-1 items-center text-xl">{icons[data.icon]}{data.label}</h1>
        <h1 className="flex gap-1 items-center lg:text-3xl">{data.amount} <BiRupee /></h1>
    </div>
  );
}

export default DashBoardCards;

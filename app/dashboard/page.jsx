import { Poppins } from "next/font/google";
import DashboardFilter from "../_components/DashboardFilter";
import DashBoardCards from "../_components/DashBoardCards";
import PieChart from "../_components/PieChart";
import PieChartDashboard from "../_components/PieChart";
import DashboardLineChart from "../_components/LineChart";
import FilterLineChart from "../_components/FilterLineChart";
import FilterPieChart from "../_components/FilterPieChart";
import { GiMoneyStack } from "react-icons/gi";
import { RxDashboard } from "react-icons/rx";
const poppins = Poppins({
    subsets:['latin'],
    variable:'poppins',
    weight:'600'
})
const month = ['january','february','march','april','may','june','july','august','september','october','november','december'];
async function Page({searchParams}) {
    const searchParamsObj = await searchParams;
    const {monthNumber,year,category} = searchParamsObj;
    const pieChartHeading =
      monthNumber !== "fullYear" ? (
        <p className="">
          {`Each Category Income/Expense Distribution for `}
          <span className="text-cyan-500 font-extrabold">
            {month[monthNumber]?.toUpperCase()} {year}
          </span>{" "}
        </p>
      ) : (
        <p>
          {`Each Category Income/Expense Distribution for Year `}
          <span className="text-cyan-500 font-extrabold">
            {year}
          </span>{" "}
        </p>
      );
    return (
      // padding top and left due to navbar and sidebar
      <div
        className={`lg:pl-60 pt-20 px-2 lg:px-0 w-full h-screen ${poppins.className} text-[var(--text)]`}
      >
        <main className="w-full h-full">
          <div className="flex justify-between items-center">
            <h1 className="lg:text-3xl text-lg flex gap-3 items-center"> <RxDashboard /> Dashboard</h1>
            <DashboardFilter />
          </div>
          <div className="mt-5">
            <DashBoardCards params={searchParamsObj} />
          </div>

          <div className="w-full lg:h-[70%] h-1/2 bg-[var(--surface)] mt-5 lg:p-5 py-5  flex flex-col">
            <div className="lg:flex justify-between items-center mb-6 ml-3">
              <h1 className="lg:text-3xl px-1 flex  gap-3">
                <GiMoneyStack className="mt-1 text-lg lg:text-3xl text-green-500" />
                Income/Expense Distribution {category && `of ${category} in `} Year{" "}
                <span className="text-cyan-500">{year}</span>
              </h1>
              <div className="ml-auto lg:ml-0 mt-2 lg:mt-0 pl-1 lg:pl-0">
                <FilterLineChart />
              </div>
            </div>
            <div className="flex-1 ">
              <DashboardLineChart searchParams={searchParamsObj} />
            </div>
          </div>
          <div className="lg:h-[70%] h-1/2 w-full bg-[var(--surface)] mt-5 lg:p-5 py-5 px-1 flex flex-col">
            <div className="lg:flex justify-between ml-3">
              <h1 className="lg:text-3xl  flex  gap-3">
                <GiMoneyStack className=" mt-1 text-lg lg:text-3xl text-green-500" />
                {pieChartHeading}
              </h1>
              <div className="ml-auto lg:ml-0 mt-2 lg:mt-0">
                <FilterPieChart />
              </div>
            </div>
            <div className="flex-1">
              <PieChart />
            </div>
          </div>
        </main>
      </div>
    );
}

export default Page

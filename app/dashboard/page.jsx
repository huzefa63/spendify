import { Poppins } from "next/font/google";
import DashboardFilter from "../_components/DashboardFilter";
import DashBoardCards from "../_components/DashBoardCards";
import PieChart from "../_components/PieChart";
import PieChartDashboard from "../_components/PieChart";
import DashboardLineChart from "../_components/LineChart";
import FilterLineChart from "../_components/FilterLineChart";

const poppins = Poppins({
    subsets:['latin'],
    variable:'poppins',
    weight:'600'
})
async function Page({searchParams}) {
    const searchParamsObj = await searchParams;
    return (
      // padding top and left due to navbar and sidebar
      <div
        className={`lg:pl-60 pt-20 pr-4 w-full h-screen ${poppins.className} text-[var(--text)]`}
      >
        <main className="w-full h-full">
          <div className="flex justify-between">
            <h1 className="lg:text-3xl">Dashboard</h1>
            <DashboardFilter />
          </div>
          <div className="lg:mt-5">
            <DashBoardCards />
          </div>
          {/* <div className="lg:h-1/2 lg:mt-5 bg-[var(--surface)] border-1 border-[var(--border)]  grid grid-cols-3 py-5 px-2">
            <PieChartDashboard />
            <div className=" col-span-2 h-full">
                <DashboardLineChart />
            </div>
          </div> */}
          <div className="w-full h-[70%] bg-[var(--surface)] mt-5 p-5 flex flex-col">
            <div className="flex justify-between items-center mb-6 ml-3">
              <h1 className="lg:text-3xl ">
                Income and Expense Distribution This Month
              </h1>
              <FilterLineChart />
            </div>
            <div className="flex-1">
              <DashboardLineChart searchParams={searchParamsObj} />
            </div>
          </div>
        </main>
      </div>
    );
}

export default Page

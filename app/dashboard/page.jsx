import { Poppins } from "next/font/google";
import DashboardFilter from "../_components/DashboardFilter";
import DashBoardCards from "../_components/DashBoardCards";
import PieChart from "../_components/PieChart";
import PieChartDashboard from "../_components/PieChart";
import DashboardLineChart from "../_components/LineChart";
import FilterLineChart from "../_components/FilterLineChart";
import FilterPieChart from "../_components/FilterPieChart";

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
          <div className="flex justify-between items-center">
            <h1 className="lg:text-3xl text-lg">Dashboard</h1>
            <DashboardFilter />
          </div>
          <div className="mt-5">
            <DashBoardCards params={searchParamsObj} />
          </div>
          {/* <div className="lg:h-1/2 lg:mt-5 bg-[var(--surface)] border-1 border-[var(--border)]  grid grid-cols-3 py-5 px-2">
            <PieChartDashboard />
            <div className=" col-span-2 h-full">
                <DashboardLineChart />
            </div>
          </div> */}
          <div className="w-full lg:h-[70%] h-1/2 bg-[var(--surface)] mt-5 lg:p-5 py-5 px-1 flex flex-col">
            <div className="lg:flex justify-between items-center mb-6 ml-3">
              <h1 className="lg:text-3xl ">
                Income and Expense Distribution Year {searchParamsObj?.year}
              </h1>
              <div className="ml-auto lg:ml-0 w-full lg:w-fit mt-2 lg:mt-0">
                <FilterLineChart />
              </div>
            </div>
            <div className="flex-1">
              <DashboardLineChart searchParams={searchParamsObj} />
            </div>
          </div>
          <div className="lg:h-[70%] h-1/2 w-full bg-[var(--surface)] mt-5 lg:p-5 py-5 px-1 flex flex-col">
            <div className="lg:flex justify-between ml-3">
              <h1 className="lg:text-3xl  ">
                Each Category Income and Expense Distribution For Year{" "}
                {searchParamsObj?.year}
              </h1>
              <div className="ml-auto lg:ml-0 w-full lg:w-fit mt-2 lg:mt-0">
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

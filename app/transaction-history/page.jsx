import { Inter } from "next/font/google";
import TransactionControllers from "@/app/_components/TransactionControllers";
import Table from "@/app/_components/Table";

const inter = Inter({
  subsets:['latin'],
  variable:'inter',
  weight:'600',
})
async function Page({searchParams}) {
  const searchParamsObj = await searchParams;
  
  return (
    // padding top and left in page due to side and app navbar
    <div
      className={`bg-[var(--background)] relative border ${inter.className} tracking-wider px-1 lg:pl-60 pt-20 lg:pr-10 h-screen w-full`}
    >
      <main className="h-full border-white border-1 flex flex-col gap-5">
        <div className="">
          <TransactionControllers filterObj={searchParamsObj} />
        </div>

        
          <Table />

      </main>
    </div>
  );
}

export default Page

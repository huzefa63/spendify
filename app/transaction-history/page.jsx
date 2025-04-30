import Image from "next/image";
import Slide from "../_animation/Slide";
import { Inter } from "next/font/google";
import Button from "@/app/_ui/Button";
import TransactionControllers from "@/app/_components/TransactionControllers";
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
        className={`bg-[var(--background)] border ${inter.className} tracking-wider pl-64 pt-20 pr-10 h-screen w-full`}
      >
        {/* <button className="bg-[var(--surface)] text-purple-500 px-3 py-2 shadow-sm rounded-md hover:cursor-pointer hover:bg-[var(--background)] transition-all duration-300">+ New entry</button> */}
        <main className="">
          <div className="">
            <TransactionControllers filterObj={searchParamsObj}/>
          </div>
        </main>
      </div>
    );
}

export default Page

import Image from "next/image";
import Slide from "../_animation/Slide";
import { Inter } from "next/font/google";
import Button from "@/app/_ui/Button";
import TransactionControllers from "@/app/_components/TransactionControllers";
import Table from "@/app/_components/Table";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const inter = Inter({
  subsets:['latin'],
  variable:'inter',
  weight:'600',
})
async function Page({searchParams}) {
  const searchParamsObj = await searchParams;
  const cookieStore = await cookies();
  let jwt = cookieStore.get('jwt')?.value;
  // if(!jwt) redirect('/login');
  console.log(jwt);
  const queryString = new URLSearchParams(searchParamsObj).toString();
  let transactionData;
  try{
    const transaction = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/expenses/getTransaction?${queryString}`,{
      headers:{
        Cookie:`jwt=${jwt}`
      }
    });
    transactionData = await transaction.json();
    
  }catch(err){
    console.log(err);
  }
  
  return (
      // padding top and left in page due to side and app navbar
      <div
        className={`bg-[var(--background)] relative border ${inter.className} tracking-wider pl-64 pt-20 pr-10 h-screen w-full`}
      >
        {/* <button className="bg-[var(--surface)] text-purple-500 px-3 py-2 shadow-sm rounded-md hover:cursor-pointer hover:bg-[var(--background)] transition-all duration-300">+ New entry</button> */}
        <main className="h-full flex flex-col gap-5">
          <div className="">
            <TransactionControllers filterObj={searchParamsObj} entries={transactionData}/>
          </div>
          <Table data={transactionData}/>
        </main>
      </div>
    );
}

export default Page

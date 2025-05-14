import { Poppins } from "next/font/google";
import Navbar from "@/app/_components/Navbar";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
const poppins = Poppins({
  variable:'poppins',
  subsets:['latin'],
  weight:'100'
})



export default async function Home() {
   redirect('/home');
}

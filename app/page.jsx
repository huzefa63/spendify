import { Poppins } from "next/font/google";
import Navbar from "@/app/_components/Navbar";
import { redirect } from "next/navigation";
const poppins = Poppins({
  variable:'poppins',
  subsets:['latin'],
  weight:'100'
})

export default function Home() {
  redirect('/transaction-history');
  // redirect('/home');
  return (null)
}

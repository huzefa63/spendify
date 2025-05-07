"use client";
import Link from "next/link";
import AuthForm from "../_components/AuthForm";
function Page() {
  return (
    <div className="flex items-center w-full h-full  justify-center  border-red-300 ">
      <AuthForm type='login'/>
    </div>
  );
}

export default Page;

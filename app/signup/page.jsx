'use client';
import Link from 'next/link';
import AuthForm from '@/app/_components/AuthForm';
function Page() {
    return (
      <div className="flex items-center w-full h-full  justify-center  border-red-300 ">
        <AuthForm type='signup'/>
      </div>
    );
}

export default Page

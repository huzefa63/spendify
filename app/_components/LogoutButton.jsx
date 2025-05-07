'use client';

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
function LogoutButton() {
  const router = useRouter();
    return (
      <button
        onClick={async () => {
          try{
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
            method: "POST",
            credentials: "include",
          });
          router.replace('/home');
          toast.success('logged out!');
          }catch(err){
            console.log(err)
            toast.error('unable to logout, please try again');
          }
        }}
        className="flex items-center w-full hover:cursor-pointer"
      >
        <p className="flex items-center p-3 w-full text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
          <svg
            className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
            />
          </svg>
          <span className="ms-3">Sign out</span>
        </p>
      </button>
    );
}
export default LogoutButton
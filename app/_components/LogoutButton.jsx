'use client';

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
function LogoutButton() {
  const router = useRouter();
    return (
      <button
        onClick={() => {
         localStorage.removeItem('token');
         router.replace('/home');
        }}
        className="flex  items-center transition-all duration-300 ease-in-out w-fit lg:w-full mt-4 lg:mt-0 hover:cursor-pointer"
      >
        <p className="flex items-center lg:p-3 py-2 px-3  w-full text-gray-900 rounded-lg bg-red-500  dark:text-white hover:bg-red-600 group">
          <svg
            className="shrink-0 w-5 h-5 text-gray-500  transition duration-300 ease-in-out dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
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
'use client';

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { TbLogout2 } from "react-icons/tb";
function LogoutButton() {
  const router = useRouter();
    return (
      <button
        onClick={() => {
          localStorage.removeItem("token");
          router.replace("/home");
        }}
        className="flex  items-center transition-all text-gray-900 rounded-lg bg-red-500  dark:text-white hover:bg-red-600 duration-300 ease-in-out w-fit lg:w-full mt-4 lg:mt-0 hover:cursor-pointer"
      >
        <p className="flex items-center lg:p-3 py-2 px-3  w-full  group">
          <TbLogout2 className="text-white lg:text-xl" />
          <span className="ms-3">Sign out</span>
        </p>
      </button>
    );
}
export default LogoutButton
'use client';
import Link from "next/link";
import { GrTransaction } from "react-icons/gr";
import { FaGear } from "react-icons/fa6";
import LogoutButton from "@/app/_components/LogoutButton";
import { usePathname } from "next/navigation";
import Image from "next/image";
function Sidebar() {
  const pathname = usePathname();
  console.log(pathname)
    return (
      <nav className="z-[999]  fixed top-0 left-0 w-54 h-screen border-r-1 border-[var(--border)] bg-[var(--surface)]">
        <aside
          id="logo-sidebar"
          className="  transition-transform "
          aria-label="Sidebar"
        >
          <div className="h-screen px-3 py-4 pt-8 overflow-y-auto">
            <div className=" flex gap-2 items-center">
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image src="/favicon.ico" alt="logo" fill />
            </div>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Spendify
            </span>
            </div>
            <div className="space-y-2 flex flex-col gap-1 font-medium  pt-15">
              <Link href="/dashboard">
                <p
                  className={`flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                    pathname === "/dashboard" && "bg-gray-100 dark:bg-gray-700"
                  }`}
                >
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ms-3">Dashboard</span>
                </p>
              </Link>
              <Link href="/transaction-history">
                <p
                  className={`flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                    pathname === "/transaction-history" &&
                    "bg-gray-100 dark:bg-gray-700"
                  }`}
                >
                  <GrTransaction className="text-gray-500 h-5 w-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    transaction-history
                  </span>
                </p>
              </Link>
              <Link href="/settings">
                <p
                  className={`flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                    pathname === "/settings" && "bg-gray-100 dark:bg-gray-700"
                  }`}
                >
                  <FaGear className="text-gray-500 h-5 w-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    settings
                  </span>
                </p>
              </Link>
              <LogoutButton />
            </div>
          </div>
        </aside>
      </nav>
    );
}

export default Sidebar

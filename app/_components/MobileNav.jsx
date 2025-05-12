'use client';
import Link from "next/link";
import { createPortal } from "react-dom"
import { FaGear } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";
import LogoutButton from "./LogoutButton";
import { usePathname } from "next/navigation";
import SideNavLinks from "./SideNavLinks";

function MobileNav({close}) {
    const pathname = usePathname();
    return createPortal(
      // padding top 16 due to app nav
      <div className="fixed z-[999] lg:hidden flex flex-col p-5 text-[var(--text)] left-0 top-16 h-screen w-full bg-[var(--background)]">
        <Link onClick={()=>close(false)} href="/dashboard">
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
        <Link onClick={()=>close(false)} href="/transaction-history">
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
        <Link onClick={()=>close(false)} href="/settings">
          <p
            className={`flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
              pathname === "/settings" && "bg-gray-100 dark:bg-gray-700"
            }`}
          >
            <FaGear className="text-gray-500 h-5 w-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            <span className="flex-1 ms-3 whitespace-nowrap">settings</span>
          </p>
        </Link>
        <LogoutButton />
      </div>,
      document.getElementById("mobile-nav")
    );
}

export default MobileNav


              
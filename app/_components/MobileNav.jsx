'use client';
import Link from "next/link";
import { createPortal } from "react-dom"
import { FaGear } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";
import LogoutButton from "./LogoutButton";
import { usePathname } from "next/navigation";
import SideNavLinks from "./SideNavLinks";
import { RxDashboard } from "react-icons/rx";
import AppNavLinks from "./AppNavLinks";

function MobileNav({close}) {
    const pathname = usePathname();
    return createPortal(
      // padding top 16 due to app nav
      <div className="fixed z-[999] lg:hidden flex flex-col p-5 text-[var(--text)] left-0 top-16 h-screen w-full bg-[var(--background)]">
        {/* <Link onClick={()=>close(false)} href="/dashboard">
          <p
            className={`flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
              pathname === "/dashboard" && "bg-gray-100 dark:bg-gray-700"
            }`}
          >
            <RxDashboard />
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
        </Link> */}
        <AppNavLinks close={close} pathname={pathname}/>
        <LogoutButton />
      </div>,
      document.getElementById("mobile-nav")
    );
}

export default MobileNav


              
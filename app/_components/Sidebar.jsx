'use client';
import Link from "next/link";
import { GrTransaction } from "react-icons/gr";
import { FaGear } from "react-icons/fa6";
import LogoutButton from "@/app/_components/LogoutButton";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { RxDashboard } from "react-icons/rx";
import AppNavLinks from "./AppNavLinks";
function Sidebar() {
  const pathname = usePathname();
    return (
      <nav className="z-[999] hidden lg:block fixed top-0 left-0 w-54 h-screen border-r-1 border-[var(--border)] bg-[var(--surface)]">
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
             <AppNavLinks pathname={pathname}/>
              <div className="absolute bottom-24 -translate-x-1/2 left-1/2 w-3/4">
                <LogoutButton />
              </div>
            </div>
          </div>
        </aside>
      </nav>
    );
}

export default Sidebar

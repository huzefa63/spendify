"use client";

import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import NightMode from "./NightMode";

const inter = Inter({
  variable:'inter',
  subsets:['latin'],
  weight:'600'
})
const privateRoute = ["transaction-history", "settings", "dashboard"];
function AppNav() {
  const pathname = usePathname();
  if (privateRoute.includes(pathname.slice(1))){
    return (
      <nav
        className={`${inter.className} lg:h-16 z-50 h-12 fixed top-0 lg:px-15 bg-[var(--surface)] border-b-1 border-[var(--border)] w-full flex items-center justify-between`}
      >
        {/* margin left 44 due to sidebar width  */}
        <h1 className="text-2xl ml-44 text-[var(--text)]">
          {" "}
          welcome back,{" "}
          <strong className="text-[var(--textDark)]">Olivia!</strong>
        </h1>
        <div className="flex gap-3 items-center">
          <NightMode />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyW2MAFrFnfa_bT1jSttLbmvfotJcqQyCCGg&s"
            alt=""
            className="w-11 h-10 rounded-full"
          />
          <h1 className="text-[var(--textDark)]">olivia martin</h1>
        </div>
      </nav>
    );
  }
}

export default AppNav;

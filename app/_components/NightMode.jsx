'use client';
import { useEffect, useState } from "react";
import { HiMoon, HiSun } from "react-icons/hi"

function NightMode() {
     const [dark, setDark] = useState("");
     useEffect(function () {
       const isDark = localStorage.getItem("mode") || "light";
       setDark(isDark);
       if (isDark === "dark") document.documentElement.classList.add("dark");
     }, []);

     function handleDarkMode() {
       document.documentElement.classList.toggle("dark");
       setDark((state) => (state === "light" ? "dark" : "light"));
       localStorage.setItem("mode", dark === "light" ? "dark" : "light");
     }
    return (
      <div className="flex gap-3 rounded-full  dark:bg-gray-800 shadow-sm py-2 px-3">
        <HiSun
          className={`text-[1.8rem] hover:cursor-pointer p-1 rounded-full transition-all duration-200 ${
            dark === "dark"
              ? "bg-transparent text-white"
              : "bg-black text-white"
          }`}
          onClick={handleDarkMode}
        />
        <HiMoon
          className={`text-[1.8rem] hover:cursor-pointer p-1 rounded-full transition-all duration-200 ${
            dark === "light" ? "bg-white text-black" : "bg-white text-black"
          }`}
          onClick={handleDarkMode}
        />
      </div>
    );
}

export default NightMode;

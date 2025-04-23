'use client';
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMoon, HiSun } from "react-icons/hi";
import { MdOutlineMenu } from "react-icons/md";
import { RiCloseLargeFill } from "react-icons/ri";
import { Squada_One } from "next/font/google";

const squada = Squada_One({
  variable: "squada",
  subsets: ["latin"],
  weight: "400",
});

const pages = ["home", "about", "features", "pricing"];
const menuPages = ["home", "about", "features", "pricing", "signup"];

function Navbar() {
  const pathName = usePathname();
  const [dark, setDark] = useState(false);
  const [isMenu, setIsMenu] = useState('');
  const menuRef = useRef(null); // Add a ref to detect clicks outside the menu

  useEffect(() => {
    // This function will toggle the menu visibility when clicking outside the menu
    function toggleMenu(e) {
      // Check if the click is outside of the menu
      
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenu(state => {
          localStorage.setItem('mode',!state ? 'dark' : 'light');
          return !state;
        }); // Close the menu if the click is outside
      }
    }

    

    // Add event listener to listen for clicks on the body
    document.body.addEventListener("click", toggleMenu);

    // Clean up the event listener on component unmount
    return () => document.body.removeEventListener("click", toggleMenu);
  }, []);

  useEffect(function(){
      const isDark = localStorage.getItem("mode") || "light";
      setDark(isDark);
      
    },[])

    function handleDarkMode(){
      document.documentElement.classList.toggle("dark");
      setDark(state => state === 'light' ? 'dark' : 'light');
      localStorage.setItem('mode',dark === 'light' ? 'dark' : 'light');
    }

  return (
    <>
      <nav className="lg:h-20 z-50 h-16 lg:px-15 px-5 bg-[var(--surface)] border-b-1 border-[var(--border)] fixed top-0 w-full flex items-center justify-between">
        <div className="rounded-full lg:hidden p-2 hover:bg-[var(--muted)] hover:cursor-pointer">
          {isMenu ? (
            <RiCloseLargeFill
              className="text-xl text-[var(--textDark)]"
              onClick={() => setIsMenu(!isMenu)}
            />
          ) : (
            <MdOutlineMenu
              className="text-xl text-[var(--textDark)]"
              onClick={() => setIsMenu(!isMenu)}
            />
          )}
        </div>
        <div className="flex gap-5 items-center">
          <img
            src="/favicon.ico"
            alt="app logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <h1
            className={`lg:text-3xl text-2xl text-[var(--secondary)] tracking-wider lg:tracking-widest ${squada.className}`}
          >
            Spendify
          </h1>
        </div>

        <ul className="lg:flex hidden lg:gap-10 lg:text-xl text-[var(--textDark)]">
          {pages.map((el, i) => {
            const pageName = el.charAt(0).toUpperCase() + el.slice(1);
            const isActive =
              (pathName === "/" && el === "home") || pathName === `/${el}`
                ? "border-b-1 border-[var(--primary)] text-[var(--primary)]"
                : "";
            return (
              <Link
                href={`/${el}`}
                className={`hover:text-blue-500 font-semibold ${isActive} lg:tracking-widest pb-2`}
                key={i}
              >
                {pageName}
              </Link>
            );
          })}
        </ul>

        <div className="lg:flex items-center gap-10">
          {dark === 'light' ? (
            <HiSun
              color="black"
              className="hover:cursor-pointer text-[2rem]"
              onClick={handleDarkMode}
            />
          ) : (
            <HiMoon
              color="white"
              className="hover:cursor-pointer text-[2rem]"
              onClick={handleDarkMode}
            />
          )}
          <Link
            href="/auth/signup"
            type="button"
            className="text-white lg:flex tracking-widest hidden hover:cursor-pointer bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Start now
          </Link>
        </div>
      </nav>

      {isMenu && (
        <div
          ref={menuRef} // Attach the ref here to detect clicks outside
          className="lg:hidden brightness-95 border-x-1 border-[var(--border)] z-[1000] fixed w-full top-16 bg-[var(--surface)]"
        >
          <ul className="flex flex-col text-[var(--text)] z-[1000]">
            {menuPages.map((el, i) => {
              const pageName = el.charAt(0).toUpperCase() + el.slice(1);
              return (
                <Link
                  onClick={()=>setIsMenu(false)}
                  className="border-b-1 w-full z-50 border-[var(--border)] hover:text-[var(--textDark)] font-semibold text-2xl py-3 px-3"
                  href={el === "signup" ? "/auth/signup" : `/${el}`}
                  key={i}
                >
                  {pageName}
                </Link>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;

'use client';
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMoon, HiSun } from "react-icons/hi";
import { MdOutlineMenu } from "react-icons/md";
import { RiCloseLargeFill } from "react-icons/ri";
import { Squada_One } from "next/font/google";
import { motion,AnimatePresence } from "framer-motion";
import { IoMdHome } from "react-icons/io";
import { FaCircleInfo } from "react-icons/fa6";
import { IoIosRocket } from "react-icons/io";
import { FaTags } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa6";
import Button from "@/app/_ui/Button";
import NightMode from "./NightMode";
const squada = Squada_One({
  variable: "squada",
  subsets: ["latin"],
  weight: "400",
});

const pages = ["home", "about", "features", "pricing"];
const menuPages = ["home", "about", "features", "pricing", "signup"];

function Navbar() {
  const pathName = usePathname();
  const [isMenu, setIsMenu] = useState(false);
  const menuRef = useRef(null); // Add a ref to detect clicks outside the menu
  const darkRef = useRef(null);
  useEffect(() => {
    // This function will toggle the menu visibility when clicking outside the menu
    function toggleMenu(e) {
      // Check if the click is outside of the menu
      
      if (menuRef.current && !menuRef.current.contains(e.target) && e.target.closest('.icons') !== darkRef.current) {
        // console.log(darkRef.current, 'fasdaf', e.target.closest('.icons'));
        setIsMenu(state => !state);
      }
    }
    // Add event listener to listen for clicks on the body
    document.body.addEventListener("click", toggleMenu);

    // Clean up the event listener on component unmount
    return () => document.body.removeEventListener("click", toggleMenu);
  }, []);

  return (
    <>
      <nav className="lg:h-20 z-50 h-16 lg:px-15 px-5 bg-[var(--surface)] border-b-1 border-[var(--border)] w-full flex items-center justify-between">
        <div onClick={() => setIsMenu(!isMenu)} className="rounded-full lg:hidden  hover:bg-[var(--muted)] hover:cursor-pointer">
          {isMenu ? (
            <RiCloseLargeFill
              className="text-2xl  text-[var(--textDark)]"
              
            />
          ) : (
            <MdOutlineMenu
              className="text-2xl  text-[var(--textDark)]"
              
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
                ? "border-b-2 border-[var(--primary)] text-[var(--primary)]"
                : "";
            return (
              <Link
                href={`/${el}`}
                className={`hover:text-blue-500 hover:transition-all duration-100 ease-in font-semibold ${isActive} lg:tracking-widest pb-2`}
                key={i}
              >
                {pageName}
              </Link>
            );
          })}
        </ul>

        <div className="lg:flex items-center gap-10">
            <NightMode />
          <div className="lg:flex hidden">
            <Button type="login">Sign In</Button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenu && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            ref={menuRef} // Attach the ref here to detect clicks outside
            className="lg:hidden shadow-sm overflow-hidden brightness-95 border-x-1 border-[var(--border)] z-[1000] fixed w-full top-16 bg-[var(--surface)]"
          >
            <ul className="flex flex-col text-[var(--text)] z-[1000]">
              {menuPages.map((el, i) => {
                const pageName = el.charAt(0).toUpperCase() + el.slice(1);
                return (
                  <Link
                    onClick={() => setIsMenu(false)}
                    className="border-b-1 flex items-center gap-4 w-full z-50 border-[var(--border)] hover:text-[var(--textDark)] tracking-widest text-xl py-3 px-4"
                    href={`/${el}`}
                    key={i}
                  >
                    {el === "home" && <IoMdHome />}
                    {el === "about" && <FaCircleInfo />}
                    {el === "features" && <IoIosRocket />}
                    {el === "pricing" && <FaTags />}
                    {el === "signup" && <FaUserPlus />}
                    {pageName}
                  </Link>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;

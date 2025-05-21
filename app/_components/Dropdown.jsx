'use client';
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { IoCheckmark } from "react-icons/io5";

function Dropdown({close, width = 52, position = "left-0",children, button }) {
    const ref = useRef(null);
    useEffect(function () {
        function detectClick(e) {
          if (ref.current && !ref.current.contains(e.target) && e.target.closest('.buttonDiv') !== button.current) {
            console.log(e.target.closest('div'));
            console.log(e.target);
            // console.log(button.current);
            close(false);
          }
        }
        document.documentElement.addEventListener("click", detectClick);
        return () =>
          document.documentElement.removeEventListener("click", detectClick);
      }, []);
  return (
    
      <motion.div ref={ref}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`text-[var(--textDark)] border-1 rounded-sm dark:border-gray-700 border-gray-300 absolute ${position} top-full mt-2 z-50 lg:w-52 w-44 flex flex-col p-3 bg-[var(--surface)]  shadow-sm`}
      >
        {children}
      </motion.div>
   
  );
}

export default Dropdown

'use client';
import { AnimatePresence, motion } from "framer-motion";
import { IoCheckmark } from "react-icons/io5";

function Dropdown({ options, width = 52, iconMap, position = "left-0" }) {
  return (
    
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`text-[var(--textDark)] absolute ${position} top-full mt-2 z-50 w-${width} flex flex-col p-3 bg-[var(--surface)]  shadow-sm`}
      >
        {options.map((el, i) => {
          return (
            <button
              onClick={() => filterHandler(el)}
              key={i}
              className="rounded-md transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:cursor-pointer p-2 w-full text-left flex items-center justify-between"
            >
              <div className="flex gap-2">
                {iconMap[el]}
                {el}
              </div>
              {/* {filterObj?.filter?.includes(el) && (
                      <IoCheckmark className="text-blue-500 " />
                    )} */}
            </button>
          );
        })}
      </motion.div>
   
  );
}

export default Dropdown

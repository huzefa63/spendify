"use client";
import { motion } from "framer-motion";
import Link from "next/link";
function Button({ type='primary', children, handler,ref }) {
  if (type === "login") {
    return (
      <Link href="/login">
        <button
          type="button"
          className="text-white bg-blue-700 py-2.5 px-5 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <span className="flex items-center gap-0">
            {children}
            <motion.svg
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </motion.svg>
          </span>
        </button>
      </Link>
    );
  }
  if (type === "primary") {
    return <button
    ref={ref}
      onClick={handler}
      type="button"
      className="text-white transition-all duration-300 hover:cursor-pointer w-fit bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      {children}
    </button>;
  }
  if (type === "secondary") {
    return <button
    ref={ref}
      onClick={handler}
      type="button"
      className="text-white transition-all duration-300 hover:cursor-pointer w-fit bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
    >
      {children}
    </button>;
  }
}

export default Button;

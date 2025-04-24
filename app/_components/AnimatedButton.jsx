"use client";
import { motion } from "framer-motion";
import Link from "next/link";
function AnimatedButton({children}) {
  return (
    <Link href='/auth/signup'>
      <motion.button
        whileHover={{ scale: 1.05 }}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        type="button"
        className="text-white w-fit tracking-widest bg-blue-700 hover:cursor-pointer hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Get Started
      </motion.button>
    </Link>
  );
}

export default AnimatedButton;

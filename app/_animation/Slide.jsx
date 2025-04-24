'use client';
import { motion } from "framer-motion";

const variantsMap = {
  up: {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
  down: {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
  left: {
    hidden: { x: 20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },
  right: {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },
};

function Slide({type,delay=0.1,children}) {
    const variant = variantsMap[type] || variantsMap.up;
    return (
        <motion.div 
        variants={variant}
            initial='hidden'
            animate='visible'
            transition={{duration:0.5,delay}}
        >
            {children}
        </motion.div>
    )
}

export default Slide

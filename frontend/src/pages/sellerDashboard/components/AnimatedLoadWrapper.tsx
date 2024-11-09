import { ReactNode } from "react";
import { motion } from "framer-motion";

interface AnimatedLoadWrapperProps {
  children: ReactNode;
}

export default function AnimatedLoadWrapper({
  children,
}: AnimatedLoadWrapperProps) {
  return (
    <motion.h1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.h1>
  );
}

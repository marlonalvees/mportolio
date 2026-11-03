import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE } from "../lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/** Faz o conteúdo surgir de baixo quando entra na tela (uma vez). */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 36,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

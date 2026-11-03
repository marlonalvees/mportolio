import { motion } from "framer-motion";

interface CodeGlyphProps {
  char: string;
  rotate?: number;
  delay?: number;
}

/** Símbolo de código "3D" que entra com mola e fica flutuando. */
export default function CodeGlyph({ char, rotate = 0, delay = 0 }: CodeGlyphProps) {
  return (
    <motion.span
      aria-hidden
      className="block select-none"
      initial={{ opacity: 0, scale: 0.4, rotate: rotate - 35 }}
      animate={{ opacity: 1, scale: 1, rotate }}
      transition={{ type: "spring", stiffness: 120, damping: 13, delay }}
    >
      <motion.span
        className="glyph"
        animate={{ y: [0, -12, 0], rotate: [0, -5, 0] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + 1.2,
        }}
      >
        {char}
      </motion.span>
    </motion.span>
  );
}

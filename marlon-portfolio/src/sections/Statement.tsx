import { useRef } from "react";
import type { ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { MotionValue } from "framer-motion";

const TEXT =
  "Da ideia ao deploy. Sites e sistemas rápidos, seguros e fáceis de manter, construídos com código limpo, arquitetura bem pensada e foco total no resultado do seu negócio.";

const words = TEXT.split(" ");

/** Frase que vai "acendendo" palavra por palavra conforme a rolagem. */
export default function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  });

  return (
    <section aria-label="Como eu trabalho" className="py-20 lg:py-[22vh]">
      <div className="container-x">
        <p
          ref={ref}
          className="mx-auto max-w-[860px] text-center type-statement text-balance"
        >
          {words.map((word, index) => (
            <Word
              key={`${word}-${index}`}
              progress={scrollYProgress}
              range={[index / words.length, (index + 1) / words.length]}
              static={Boolean(reduceMotion)}
            >
              {word}
            </Word>
          ))}
        </p>
      </div>
    </section>
  );
}

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  static: boolean;
}

function Word({ children, progress, range, static: isStatic }: WordProps) {
  const opacity = useTransform(progress, range, [0.16, 1]);

  return (
    <>
      <motion.span style={isStatic ? undefined : { opacity }}>{children}</motion.span>{" "}
    </>
  );
}

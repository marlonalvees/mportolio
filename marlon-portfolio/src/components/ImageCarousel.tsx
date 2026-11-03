import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EASE } from "../lib/motion";

interface ImageCarouselProps {
  images: string[];
  title: string;
}

const variants = {
  enter: (direction: number) => ({ x: direction >= 0 ? "10%" : "-10%", opacity: 0 }),
  center: { x: "0%", opacity: 1 },
  exit: (direction: number) => ({ x: direction >= 0 ? "-10%" : "10%", opacity: 0 }),
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function ImageCarousel({ images, title }: ImageCarouselProps) {
  const [[index, direction], setPage] = useState<[number, number]>([0, 0]);
  const count = images.length;

  const paginate = (step: number) =>
    setPage(([current]) => [(current + step + count) % count, step]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") setPage(([current]) => [(current + 1) % count, 1]);
      if (event.key === "ArrowLeft") setPage(([current]) => [(current - 1 + count) % count, -1]);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [count]);

  return (
    <div className="relative size-full overflow-hidden bg-ink">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={index}
          src={images[index]}
          alt={`${title}: imagem ${index + 1} de ${count}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: EASE }}
          drag={count > 1 ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.5}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) paginate(1);
            else if (info.offset.x > 60) paginate(-1);
          }}
          draggable={false}
          className="absolute inset-0 size-full cursor-grab object-contain p-4 active:cursor-grabbing md:p-8"
        />
      </AnimatePresence>

      {count > 1 && (
        <>
          <span className="absolute top-4 left-4 rounded-md bg-paper/10 px-2.5 py-1 type-small text-paper tabular-nums backdrop-blur-sm">
            {pad(index + 1)} / {pad(count)}
          </span>

          <div className="absolute right-4 bottom-4 flex gap-2">
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Imagem anterior"
              className="grid size-10 place-items-center rounded-xl bg-paper text-ink transition hover:bg-paper/85"
            >
              <ChevronLeft size={18} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Próxima imagem"
              className="grid size-10 place-items-center rounded-xl bg-paper text-ink transition hover:bg-paper/85"
            >
              <ChevronRight size={18} aria-hidden />
            </button>
          </div>

          <div className="absolute bottom-7 left-4 flex gap-1.5">
            {images.map((image, i) => (
              <button
                key={image}
                type="button"
                onClick={() => setPage(([current]) => [i, i >= current ? 1 : -1])}
                aria-label={`Ir para a imagem ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-paper" : "w-1.5 bg-paper/35 hover:bg-paper/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

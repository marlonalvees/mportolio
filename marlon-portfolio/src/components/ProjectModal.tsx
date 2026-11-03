import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowUpRight, X } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import type { Project } from "../types";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { EASE } from "../lib/motion";
import ImageCarousel from "./ImageCarousel";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const lenis = useLenis();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Trava o scroll da página, prende o foco no modal e fecha com Esc.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      lenis?.start();
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, [lenis, onClose]);

  const panelMotion = isDesktop
    ? {
        initial: { opacity: 0, y: 40, scale: 0.97 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 24, scale: 0.98 },
      }
    : {
        initial: { y: "100%" },
        animate: { y: "0%" },
        exit: { y: "100%" },
      };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/70 backdrop-blur-sm md:items-center md:p-6"
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        {...panelMotion}
        transition={{ duration: 0.55, ease: EASE }}
        onClick={(event) => event.stopPropagation()}
        className="relative flex max-h-[92svh] w-full flex-col overflow-hidden rounded-t-[24px] bg-paper md:h-[min(780px,88vh)] md:max-w-[1180px] md:flex-row md:rounded-[24px]"
      >
        <div className="relative h-[36svh] min-h-[220px] shrink-0 md:h-auto md:w-[58%]">
          <ImageCarousel images={project.images} title={project.name} />
        </div>

        <div
          data-lenis-prevent
          className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain p-6 md:p-10"
        >
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 type-small text-ink/65">
            <span>{project.type}</span>
            {project.status === "Online" && (
              <span className="inline-flex items-center gap-1.5 text-ink">
                <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
                No ar
              </span>
            )}
          </p>
          <h3
            id="project-modal-title"
            className="mt-2 text-[clamp(2.25rem,3.6vw,3.25rem)] leading-none font-semibold tracking-[-0.02em]"
          >
            {project.name}
          </h3>
          <p className="mt-5 type-body text-ink/80">{project.description}</p>

          <h4 className="mt-8 type-small font-semibold">/Funcionalidades</h4>
          <ul className="mt-3 space-y-2">
            {project.features.map((feature) => (
              <li key={feature} className="flex gap-3 type-body">
                <span className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-ink" aria-hidden />
                {feature}
              </li>
            ))}
          </ul>

          <h4 className="mt-8 type-small font-semibold">/Tecnologias</h4>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <li key={tech} className="rounded-lg border border-ink/15 px-3 py-1 type-small">
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap gap-3 pt-8">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3.5 type-small font-medium whitespace-nowrap text-paper transition hover:bg-ink/85"
            >
              Ver site no ar
              <ArrowUpRight size={16} aria-hidden />
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-ink/20 px-5 py-3.5 type-small font-medium whitespace-nowrap transition hover:border-ink hover:bg-ink/5"
              >
                <FaGithub size={16} aria-hidden />
                Código no GitHub
              </a>
            )}
          </div>
        </div>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fechar detalhes do projeto"
          className="absolute top-4 right-4 z-10 grid size-10 place-items-center rounded-xl bg-paper text-ink shadow-[0_6px_20px_-6px_rgb(0_0_0/0.35)] transition hover:bg-paper/85"
        >
          <X size={18} strokeWidth={2.25} aria-hidden />
        </button>
      </motion.div>
    </motion.div>
  );
}

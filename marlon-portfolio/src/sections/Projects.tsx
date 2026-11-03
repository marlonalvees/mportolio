import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ArrowLink from "../components/ArrowLink";
import ProjectModal from "../components/ProjectModal";
import Reveal from "../components/Reveal";
import { site } from "../config/site";
import { projects } from "../data/projects";
import { EASE } from "../lib/motion";
import type { Project } from "../types";

const hostOf = (url: string) => new URL(url).hostname.replace(/^www\./, "");

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <section id="projetos" className="py-14 lg:py-16">
      <div className="container-x">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <h2 className="type-h2">
              Projetos
              <br />
              em destaque
            </h2>
          </Reveal>
          {site.socials.github && (
            <Reveal delay={0.1}>
              <ArrowLink href={site.socials.github} external>
                Ver GitHub
              </ArrowLink>
            </Reveal>
          )}
        </div>

        <div className="mt-12 grid gap-x-4 gap-y-10 md:grid-cols-2 md:gap-y-8 lg:mt-16">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={index}
              onOpen={() => setSelected(project)}
            />
          ))}
          <CtaCard />
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal key={selected.name} project={selected} onClose={close} />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ------------------------------------------------------------------ */

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: () => void;
}

function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const cover = project.cover ?? project.images[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay: (index % 2) * 0.08 }}
      className="group relative"
    >
      <div
        className="relative aspect-[1.455] overflow-hidden rounded-[20px]"
        style={{ background: project.backdrop }}
      >
        <div className="absolute inset-x-[8%] top-[9%] overflow-hidden rounded-xl bg-paper shadow-[0_30px_60px_-24px_rgb(0_0_0/0.6)] transition-transform duration-700 ease-out-expo group-hover:-translate-y-2 group-hover:scale-[1.015]">
          <div className="flex h-6 items-center gap-1.5 border-b border-ink/10 px-3 lg:h-7">
            <span className="size-2 rounded-full bg-ink/15" />
            <span className="size-2 rounded-full bg-ink/15" />
            <span className="size-2 rounded-full bg-ink/15" />
            <span className="ml-2 truncate rounded bg-ink/5 px-2 text-[11px] leading-5 text-ink/55">
              {hostOf(project.link)}
            </span>
          </div>
          <img
            src={cover}
            alt={`Tela do projeto ${project.name}`}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="aspect-[4/3] w-full object-cover"
            style={{ objectPosition: project.coverPosition ?? "top" }}
          />
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="type-h3">
            {/* O ::after estica o botão para o card inteiro ser clicável. */}
            <button
              type="button"
              onClick={onOpen}
              className="text-left after:absolute after:inset-0 after:rounded-[20px] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-accent"
            >
              {project.name}
            </button>
          </h3>
          <p className="mt-1 type-small text-ink/65">{project.type}</p>
        </div>
        <span
          aria-hidden
          className="mt-1 grid size-9 shrink-0 place-items-center rounded-lg border border-ink transition-colors duration-300 group-hover:bg-ink group-hover:text-paper"
        >
          <ArrowUpRight
            size={18}
            className="transition-transform duration-300 ease-out-expo group-hover:rotate-45"
          />
        </span>
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */

function CtaCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
      className="flex min-h-[320px] flex-col justify-between gap-10 rounded-[20px] bg-ink p-6 text-paper md:p-7"
    >
      <p className="text-[clamp(1.875rem,3vw,2.75rem)] leading-[1.15] tracking-[-0.03em]">
        Tem um projeto em mente? Vamos tirar ele do papel.
      </p>
      <ArrowLink href="#contato" tone="paper">
        Fale comigo
      </ArrowLink>
    </motion.div>
  );
}

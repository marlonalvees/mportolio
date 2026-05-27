import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "../types";
import { projects } from "../data/projects";

const ALL = "Todos";

const stackColors: Record<Project["stack"], string> = {
  "Full Stack": "bg-violet-500/20 text-violet-300 border-violet-500/30",
  Frontend: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Backend: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
};

const statusColors: Record<Project["status"], string> = {
  Online: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "Em desenvolvimento": "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  Concluído: "bg-zinc-500/20 text-zinc-300 border-zinc-500/30",
};

function ImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setCurrent((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="relative w-full h-full bg-zinc-800 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt={`${title} - ${current + 1}`}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
          className="w-full h-full object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-zinc-900/70 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-zinc-800 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-zinc-900/70 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-zinc-800 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-1.5 h-1.5 rounded-full transition ${i === current ? "bg-white" : "bg-white/30"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const cols = Math.ceil(project.tech.length / 5);
  const techColumns = Array.from({ length: cols }, (_, i) =>
    project.tech.slice(i * 5, i * 5 + 5),
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-4 bg-black/70 backdrop-blur-sm"
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 32 }}
          onClick={(e) => e.stopPropagation()}
          className="md:hidden w-full max-h-[92vh] rounded-t-2xl border-t border-white/10 bg-zinc-900 shadow-2xl overflow-y-auto"
        >
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          <div className="relative w-full h-52 bg-zinc-800">
            <ImageCarousel images={project.images} title={project.title} />
            <div className="absolute top-3 left-3 flex gap-2 z-10">
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full border backdrop-blur-sm ${stackColors[project.stack]}`}
              >
                {project.stack}
              </span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full border backdrop-blur-sm flex items-center gap-1.5 ${statusColors[project.status]}`}
              >
                {project.status === "Online" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                )}
                {project.status}
              </span>
            </div>
          </div>

          <div className="p-5">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <h3 className="text-lg font-bold text-white mb-2 pr-8">
              {project.title}
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-5">
              {project.description}
            </p>

            <h4 className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-2">
              Funcionalidades
            </h4>
            <ul className="flex flex-col gap-1.5 mb-5">
              {project.features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-sm text-zinc-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <h4 className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-2">
              Tecnologias usadas
            </h4>
            <div className="flex gap-6 mb-6">
              {Array.from(
                { length: Math.ceil(project.tech.length / 5) },
                (_, i) => project.tech.slice(i * 5, i * 5 + 5),
              ).map((col, colIndex) => (
                <ul key={colIndex} className="flex flex-col gap-1.5">
                  {col.map((t) => (
                    <li
                      key={t}
                      className="flex items-center gap-2 text-sm text-zinc-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              ))}
            </div>

            <div className="flex gap-3">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center rounded-full bg-violet-500 py-2.5 text-sm font-semibold text-white hover:bg-violet-400 transition"
              >
                Ver site →
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center rounded-full border border-white/10 py-2.5 text-sm text-zinc-400 hover:text-white transition"
              >
                GitHub
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          className="hidden md:flex relative w-full max-w-[85vw] max-h-[90vh] rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl overflow-hidden flex-row"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="relative w-3/5 shrink-0 bg-zinc-800 min-h-[780px]">
            <div className="absolute top-3 left-3 flex gap-2 z-10">
              <span
                className={`text-xs px-3 py-1 rounded-full border backdrop-blur-sm ${stackColors[project.stack]}`}
              >
                {project.stack}
              </span>
              <span
                className={`text-xs px-3 py-1 rounded-full border backdrop-blur-sm flex items-center gap-1.5 ${statusColors[project.status]}`}
              >
                {project.status === "Online" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                )}
                {project.status}
              </span>
            </div>
            <ImageCarousel images={project.images} title={project.title} />
          </div>

          <div className="flex flex-col overflow-y-auto p-8 flex-1">
            <h3 className="text-xl font-bold text-white mb-2 pr-8">
              {project.title}
            </h3>
            <p className="text-zinc-300 text-base leading-relaxed mb-6">
              {project.description}
            </p>

            <h4 className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
              Funcionalidades
            </h4>
            <ul className="flex flex-col gap-2 mb-6">
              {project.features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-base text-zinc-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <h4 className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
              Tecnologias usadas
            </h4>
            <div className="flex gap-8 mb-6">
              {techColumns.map((col, colIndex) => (
                <ul key={colIndex} className="flex flex-col gap-2">
                  {col.map((t) => (
                    <li
                      key={t}
                      className="flex items-center gap-2 text-base text-zinc-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              ))}
            </div>

            <div className="flex gap-4 pt-4 border-t border-white/10 mt-auto">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center rounded-full bg-violet-500 py-2.5 text-sm font-semibold text-white hover:bg-violet-400 transition"
              >
                Ver site →
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center rounded-full border border-white/10 py-2.5 text-sm text-zinc-400 hover:text-white hover:border-white/30 transition"
              >
                GitHub
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [activeTech, setActiveTech] = useState<string>(ALL);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(projects.map((p) => p.category)))],
    [],
  );

  const techs = useMemo(
    () => [ALL, ...Array.from(new Set(projects.flatMap((p) => p.tech)))],
    [],
  );

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchCategory =
        activeCategory === ALL || p.category === activeCategory;
      const matchTech = activeTech === ALL || p.tech.includes(activeTech);
      return matchCategory && matchTech;
    });
  }, [activeCategory, activeTech]);

  return (
    <section id="projetos" className="bg-zinc-950 py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="text-violet-400 text-sm font-semibold uppercase tracking-widest">
            Portfólio
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">
            Projetos recentes
          </h2>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
            Uma seleção dos trabalhos que desenvolvi — clique na imagem para ver
            detalhes e funcionalidades.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-10 flex flex-col gap-4"
        >
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                  activeCategory === cat
                    ? "bg-violet-500 border-violet-500 text-white"
                    : "border-white/10 text-zinc-400 hover:border-violet-500/40 hover:text-violet-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {techs.map((tech) => (
              <button
                key={tech}
                onClick={() => setActiveTech(tech)}
                className={`px-3 py-1 rounded-full text-xs border transition ${
                  activeTech === tech
                    ? "bg-violet-500/20 border-violet-500 text-violet-300"
                    : "border-white/10 text-zinc-500 hover:border-violet-500/30 hover:text-zinc-300"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              filtered.map((project) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -4 }}
                  className="group relative rounded-2xl border border-white/10 bg-zinc-900 overflow-hidden hover:border-violet-500/40 transition-colors"
                >
                  <div
                    className="relative w-full h-36 bg-zinc-800 overflow-hidden cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-violet-950/30 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="bg-zinc-900/80 backdrop-blur-sm text-white text-xs px-4 py-2 rounded-full border border-white/10">
                        Ver detalhes
                      </span>
                    </div>

                    <div className="absolute top-2 left-2 flex gap-1.5">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full border backdrop-blur-sm ${stackColors[project.stack]}`}
                      >
                        {project.stack}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full border backdrop-blur-sm flex items-center gap-1 ${statusColors[project.status]}`}
                      >
                        {project.status === "Online" && (
                          <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                        )}
                        {project.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-3 py-1.5 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-white hover:text-violet-400 transition"
                      >
                        Ver site →
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-zinc-400 hover:text-white transition"
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-3 text-center text-zinc-500 py-16"
              >
                Nenhum projeto encontrado com esses filtros.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

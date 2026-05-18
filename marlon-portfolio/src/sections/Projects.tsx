import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";
import type { Project } from "../types";

const ALL = "Todos";

function ProjectCard({
  project,
  onImageClick,
}: {
  project: Project;
  onImageClick: (project: Project, index: number) => void;
}) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1,
    );
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="group relative rounded-2xl border border-white/10 bg-zinc-900 overflow-hidden hover:border-violet-500/40 transition-colors flex flex-col"
    >
      <div
        className="relative w-full h-48 bg-zinc-800 overflow-hidden cursor-zoom-in"
        onClick={() => onImageClick(project, currentImage)}
      >
        <img
          src={project.images[currentImage]}
          alt={`${project.title} - Imagem ${currentImage + 1}`}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-violet-950/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        <span className="absolute top-3 left-3 text-xs px-3 py-1 rounded-full bg-zinc-950/80 text-violet-300 border border-violet-500/20 backdrop-blur-sm z-10 pointer-events-none">
          {project.category}
        </span>

        {project.images.length > 1 && (
          <>
            <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={prevImage}
                className="p-1.5 rounded-full bg-black/60 text-white hover:bg-violet-500 transition-colors backdrop-blur-sm"
                aria-label="Imagem anterior"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="p-1.5 rounded-full bg-black/60 text-white hover:bg-violet-500 transition-colors backdrop-blur-sm"
                aria-label="Próxima imagem"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
              {project.images.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentImage ? "bg-violet-400 w-3" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-6 flex flex-col grow">
        <h3 className="text-lg font-semibold text-white mb-2">
          {project.title}
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed mb-5 grow">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-3 py-1 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mt-auto">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white font-medium hover:text-violet-400 transition"
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
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [activeTech, setActiveTech] = useState<string>(ALL);

  const [lightboxProject, setLightboxProject] = useState<Project | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxProject) return;

      if (e.key === "Escape") setLightboxProject(null);
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev + 1) % lightboxProject.images.length);
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev === 0 ? lightboxProject.images.length - 1 : prev - 1,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxProject]);

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

  const handleOpenLightbox = (project: Project, index: number) => {
    setLightboxProject(project);
    setLightboxIndex(index);
  };

  return (
    <section id="projetos" className="bg-zinc-950 py-28 px-6 relative">
      <div className="max-w-5xl mx-auto">
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
            Uma seleção dos trabalhos que desenvolvi — cada projeto com foco em
            qualidade, performance e boa experiência.
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

        <motion.div layout className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              filtered.map((project) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  onImageClick={handleOpenLightbox}
                />
              ))
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-2 text-center text-zinc-500 py-16"
              >
                Nenhum projeto encontrado com esses filtros.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightboxProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxProject(null)}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 cursor-zoom-out"
          >
            <button
              onClick={() => setLightboxProject(null)}
              className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-white bg-zinc-900/60 hover:bg-zinc-800 rounded-full transition-colors z-50 backdrop-blur-sm border border-white/10"
              aria-label="Fechar imagem"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {lightboxProject.images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) =>
                    prev === 0 ? lightboxProject.images.length - 1 : prev - 1,
                  );
                }}
                className="absolute left-6 p-3 rounded-full bg-zinc-900/60 text-white hover:bg-violet-500 transition-colors backdrop-blur-sm z-50 border border-white/10"
                aria-label="Imagem anterior"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
            )}

            <motion.img
              key={lightboxIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={lightboxProject.images[lightboxIndex]}
              alt="Projeto expandido"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl cursor-default select-none"
              onClick={(e) => e.stopPropagation()}
            />

            {lightboxProject.images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(
                    (prev) => (prev + 1) % lightboxProject.images.length,
                  );
                }}
                className="absolute right-6 p-3 rounded-full bg-zinc-900/60 text-white hover:bg-violet-500 transition-colors backdrop-blur-sm z-50 border border-white/10"
                aria-label="Próxima imagem"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            )}

            {lightboxProject.images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-zinc-900/80 text-zinc-300 px-4 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm border border-white/10">
                {lightboxIndex + 1} / {lightboxProject.images.length}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

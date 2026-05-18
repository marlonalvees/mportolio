import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";

const ALL = "Todos";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [activeTech, setActiveTech] = useState<string>(ALL);

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
                  <div className="relative w-full h-48 bg-zinc-800 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-violet-950/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="absolute top-3 left-3 text-xs px-3 py-1 rounded-full bg-zinc-950/80 text-violet-300 border border-violet-500/20 backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-5">
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

                    <div className="flex gap-4">
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
    </section>
  );
}

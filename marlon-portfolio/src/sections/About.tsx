import { motion } from "framer-motion";

const techs = [
  {
    name: "React",
    color: "group-hover:text-[#61DAFB] group-hover:border-[#61DAFB]/40",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M11.955 12.046c1.616 0 2.925 1.31 2.925 2.925s-1.31 2.925-2.925 2.925-2.925-1.31-2.925-2.925 1.31-2.925 2.925-2.925zm0 1.62c-.722 0-1.305.583-1.305 1.305s.583 1.305 1.305 1.305 1.305-.583 1.305-1.305-.583-1.305-1.305-1.305zm0-10.166c3.437 0 6.358.842 8.518 2.356l1.637-2.836C19.391 4.51 15.805 3.5 12 3.5c-3.805 0-7.391 1.01-10.155 2.82l1.637 2.836C5.642 7.642 8.563 6.8 12 6.8zm-8.518 2.356c-2.16 1.514-3.482 3.482-3.482 5.644 0 2.162 1.322 4.13 3.482 5.644l-1.637 2.836C.426 21.05 0 18.59 0 16c0-2.59.426-5.05 1.845-7.28l1.637 2.836zm17.036 0l1.637-2.836C23.574 10.95 24 13.41 24 16c0 2.59-.426 5.05-1.845 7.28l-1.637-2.836c2.16-1.514 3.482-3.482 3.482-5.644 0-2.162-1.322-4.13-3.482-5.644zM12 20.5c-3.437 0-6.358-.842-8.518-2.356l-1.637 2.836C4.609 19.49 8.195 20.5 12 20.5c3.805 0 7.391-1.01 10.155-2.82l-1.637-2.836C18.358 19.658 15.437 20.5 12 20.5z" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    color: "group-hover:text-[#3178C6] group-hover:border-[#3178C6]/40",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zM12.9 16.942c.866 0 1.57.177 2.113.53l.836-1.606c-.636-.445-1.488-.718-2.557-.718-2.22 0-3.693 1.258-3.693 3.328 0 1.95 1.267 2.872 3.018 3.513 1.275.467 1.62.775 1.62 1.298 0 .584-.576 1.002-1.464 1.002-.853 0-1.748-.306-2.433-.807l-.807 1.625c.82.597 1.928.93 3.125.93 2.378 0 3.844-1.218 3.844-3.4 0-1.875-1.168-2.793-3.03-3.486-1.2-.44-1.57-.754-1.57-1.258 0-.53.512-.953 1.405-.953zM21.57 15.6H16.29v8.083h-2.106V15.6h-5.28v-1.85h12.666v1.85z" />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    color: "group-hover:text-[#06B6D4] group-hover:border-[#06B6D4]/40",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    ),
  },
  {
    name: "Next.js",
    color: "group-hover:text-white group-hover:border-white/40",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M11.987 0c-6.628 0-12 5.373-12 12s5.372 12 12 12c6.627 0 12-5.373 12-12s-5.373-12-12-12zm4.333 16.516l-5.69-8.498h-2.146v8.498h1.866v-6.398l5.228 7.848c.241.171.503.32.782.443v-8.411h-1.86v6.518h-.18z" />
      </svg>
    ),
  },
  {
    name: "JavaScript",
    color: "group-hover:text-[#F7DF1E] group-hover:border-[#F7DF1E]/40",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.81.39.015.75.09 1.106.345.383.275.642.715.75 1.155l1.83-1.22c-.22-.725-.664-1.345-1.275-1.765-.875-.6-2.13-.81-3.21-.765-1.2.045-2.315.345-3.015 1.185-.56.66-.75 1.53-.615 2.37.15 1.035.795 1.71 1.68 2.22 1.23.75 2.685.915 3.03 1.515.15.285.225.615.135.915-.15.54-.78.78-1.32.795-.69.015-1.275-.165-1.65-.63-.495-.57-.615-1.125-.705-1.695l-1.92.885c.195 1.185.675 2.145 1.575 2.76 1.095.735 2.595.885 3.885.78 1.305-.105 2.475-.615 3.12-1.635.63-1.005.81-2.16.585-3.33zM10.22 19.864c.21-1.575.315-3.15.42-4.725.075-1.14.135-2.265.195-3.405h-2.16c-.045.96-.09 1.935-.135 2.91-.075 1.365-.165 2.73-.24 4.095-.03.375-.06.75-.12 1.11-.12.6-.525 1.11-1.095 1.29-.69.21-1.425.105-1.935-.39-.465-.45-.6-1.11-.645-1.725l-2.025.555c.12 1.185.63 2.19 1.53 2.79.975.645 2.31.75 3.39.525 1.125-.24 2.01-.975 2.4-2.04.285-.81.36-1.68.42-2.985z" />
      </svg>
    ),
  },
  {
    name: "Figma",
    color: "group-hover:text-[#F24E1E] group-hover:border-[#F24E1E]/40",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M8 24a4 4 0 1 0 0-8v8zm4-12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-4 0a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm4 0a4 4 0 1 0 4-4 4 4 0 0 0-4 4zm-4 4a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
      </svg>
    ),
  },
  {
    name: "Git",
    color: "group-hover:text-[#F05032] group-hover:border-[#F05032]/40",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.759 2.759c.64-.213 1.381-.07 1.89.442.691.691.691 1.815 0 2.508-.691.69-1.815.69-2.508 0-.511-.512-.656-1.25-.438-1.892l-2.759-2.757v3.916c.22.184.363.46.363.771 0 .553-.448 1-1 1s-1-.447-1-1c0-.313.143-.591.365-.776v-3.918c-.222-.185-.365-.463-.365-.776 0-.317.146-.597.371-.781l-2.761-2.76-4.526 4.526c-.603.604-.603 1.584 0 2.188l10.478 10.478c.605.604 1.585.604 2.189 0l10.478-10.478c.605-.604.605-1.584 0-2.188z" />
      </svg>
    ),
  },
  {
    name: "Node.js",
    color: "group-hover:text-[#339933] group-hover:border-[#339933]/40",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M11.838 0c-.392 0-.825.092-1.28.272l-8.083 4.673A2.88 2.88 0 001 7.42v9.16c0 1.054.55 2.015 1.474 2.548l8.084 4.673c.896.518 1.996.518 2.893 0l8.073-4.662c.924-.533 1.474-1.494 1.474-2.548V7.42a2.88 2.88 0 00-1.474-2.475l-8.084-4.673C12.87.16 12.355 0 11.838 0zm.068 2.083c.27 0 .584.072.846.223l8.073 4.661c.542.313.876.88.876 1.494v8.139l-4.108-2.37v-4.128L11.84 6.78 6.066 10.1v4.128l-4.108 2.37V7.42c0-.613.334-1.18.876-1.494l8.084-4.673c.261-.15.545-.223.824-.223zM7.228 12.11L11.84 9.45l4.61 2.662v5.324l-4.61 2.663-4.61-2.663v-5.324z" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <section id="sobre" className="bg-zinc-900 py-28 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-violet-400 text-sm font-semibold uppercase tracking-widest">
            Sobre mim
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white leading-tight">
            Desenvolvedor <br />
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Olá! Sou o Marlon, desenvolvedor apaixonado por criar interfaces
            bonitas e funcionais. Trabalho com foco em performance,
            acessibilidade e experiência do usuário.
          </p>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            Meu objetivo é transformar ideias em produtos digitais que as
            pessoas realmente gostem de usar — com código limpo e atenção aos
            detalhes.
          </p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {techs.map((tech) => (
              <motion.span
                variants={itemVariants}
                key={tech.name}
                className={`group flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-white/10 text-zinc-300 bg-zinc-800 transition-all duration-300 ${tech.color}`}
              >
                <span className="text-zinc-400 transition-colors duration-300">
                  {tech.icon}
                </span>
                {tech.name}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-4"
        >
          {[
            { value: "2+", label: "Anos de experiência" },
            { value: "20+", label: "Projetos entregues" },
            { value: "100%", label: "Dedicação" },
            { value: "∞", label: "Vontade de aprender" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-zinc-800 p-6 text-center hover:border-violet-500/30 transition"
            >
              <p className="text-4xl font-bold text-violet-400">{stat.value}</p>
              <p className="mt-2 text-sm text-zinc-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

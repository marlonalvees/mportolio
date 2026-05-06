import { motion } from "framer-motion";

const techs = [
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Next.js",
  "JavaScript",
  "Figma",
  "Git",
  "Node.js",
];

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
            <span className="text-violet-400">Front-end</span>
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Olá! Sou o Marlon, desenvolvedor front-end apaixonado por criar
            interfaces bonitas e funcionais. Trabalho com foco em performance,
            acessibilidade e experiência do usuário.
          </p>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            Meu objetivo é transformar ideias em produtos digitais que as
            pessoas realmente gostem de usar — com código limpo e atenção aos
            detalhes.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {techs.map((tech) => (
              <span
                key={tech}
                className="text-sm px-4 py-1.5 rounded-full border border-white/10 text-zinc-300 bg-zinc-800 hover:border-violet-500/40 hover:text-violet-300 transition"
              >
                {tech}
              </span>
            ))}
          </div>
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

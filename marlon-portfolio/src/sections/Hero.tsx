import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center bg-zinc-950 text-white px-6 overflow-hidden"
    >
      <div className="absolute w-125 h-[500px] bg-violet-500/20 blur-[120px] rounded-full top-[-100px] left-1/2 -translate-x-1/2" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="text-center max-w-3xl relative"
      >
        <motion.h1
          variants={item}
          className="text-5xl md:text-7xl font-bold leading-tight text-white"
        >
          Criando <span className="text-violet-400">interfaces modernas</span> e
          funcionais
        </motion.h1>

        <motion.p variants={item} className="mt-6 text-zinc-400 text-lg">
          Eu desenvolvo sites e aplicações com foco em design, performance e
          experiência do usuário.
        </motion.p>

        <motion.div variants={item} className="mt-8 flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-violet-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-violet-400 transition"
          >
            Ver projetos
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition"
          >
            Contato
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

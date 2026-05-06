import { motion } from "framer-motion";
import { services } from "../data/services";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function Services() {
  return (
    <section id="servicos" className="bg-zinc-950 py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <span className="text-violet-400 text-sm font-semibold uppercase tracking-widest">
            O que eu faço
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">
            Serviços
          </h2>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
            Ofereço soluções completas de front-end — do design à entrega final,
            com qualidade e atenção aos detalhes.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={item}
              className="group rounded-2xl border border-white/10 bg-zinc-900 p-7 hover:border-violet-500/40 transition-colors"
            >
              <span className="text-3xl">{service.icon}</span>
              <h3 className="mt-4 text-lg font-semibold text-white">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

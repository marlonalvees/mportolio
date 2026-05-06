import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contato" className="bg-zinc-900 py-28 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-violet-400 text-sm font-semibold uppercase tracking-widest">
            Contato
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">
            Vamos trabalhar juntos?
          </h2>
          <p className="mt-4 text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Tem um projeto em mente ou quer bater um papo? Me manda uma mensagem
            — responderei em breve.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-12 flex flex-col gap-4 text-left"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-zinc-400">Nome</label>
              <input
                type="text"
                placeholder="Seu nome"
                className="rounded-xl border border-white/10 bg-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-violet-500/60 transition"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-zinc-400">E-mail</label>
              <input
                type="email"
                placeholder="seu@email.com"
                className="rounded-xl border border-white/10 bg-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-violet-500/60 transition"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-zinc-400">Mensagem</label>
            <textarea
              rows={5}
              placeholder="Conte um pouco sobre seu projeto..."
              className="rounded-xl border border-white/10 bg-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-violet-500/60 transition resize-none"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="mt-2 w-full rounded-full bg-violet-500 py-3.5 text-sm font-semibold text-white hover:bg-violet-400 transition"
          >
            Enviar mensagem
          </motion.button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex justify-center gap-6"
        >
          {[
            { label: "GitHub", href: "#" },
            { label: "LinkedIn", href: "#" },
            { label: "Instagram", href: "#" },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-400 hover:text-violet-400 transition"
            >
              {social.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

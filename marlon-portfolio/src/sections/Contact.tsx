import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<
    "idle" | "success" | "error"
  >("idle");

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    setIsSubmitting(true);
    setStatusMessage("idle");

    // As chaves virão do seu .env depois
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          setStatusMessage("success");
          form.current?.reset();
        },
        (error) => {
          console.error("Erro ao enviar e-mail:", error);
          setStatusMessage("error");
        },
      )
      .finally(() => {
        setIsSubmitting(false);
        // Remove a mensagem de sucesso/erro após 5 segundos
        setTimeout(() => setStatusMessage("idle"), 5000);
      });
  };

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
            Buscando um desenvolvedor para o seu time?
          </h2>
          <p className="mt-4 text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Estou disponível para conversar sobre novas oportunidades e
            desafios. Deixe sua mensagem abaixo e vamos descobrir como posso
            ajudar a sua empresa.
          </p>
        </motion.div>

        <motion.form
          ref={form}
          onSubmit={sendEmail}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-12 flex flex-col gap-4 text-left"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="user_name" className="text-sm text-zinc-400">
                Nome
              </label>
              <input
                id="user_name"
                name="user_name"
                type="text"
                required
                placeholder="Seu nome"
                className="rounded-xl border border-white/10 bg-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-violet-500/60 transition"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="user_email" className="text-sm text-zinc-400">
                E-mail
              </label>
              <input
                id="user_email"
                name="user_email"
                type="email"
                required
                placeholder="seu@email.com"
                className="rounded-xl border border-white/10 bg-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-violet-500/60 transition"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-sm text-zinc-400">
              Mensagem
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Conte um pouco sobre seu projeto..."
              className="rounded-xl border border-white/10 bg-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-violet-500/60 transition resize-none"
            />
          </div>

          <motion.button
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full rounded-full bg-violet-500 py-3.5 text-sm font-semibold text-white hover:bg-violet-400 transition disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Enviando...
              </>
            ) : (
              "Enviar mensagem"
            )}
          </motion.button>

          {statusMessage === "success" && (
            <p className="text-emerald-400 text-sm text-center mt-2">
              Mensagem enviada com sucesso! Retorno em breve.
            </p>
          )}
          {statusMessage === "error" && (
            <p className="text-red-400 text-sm text-center mt-2">
              Ops! Algo deu errado. Tente me contatar pelas redes sociais.
            </p>
          )}
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex justify-center gap-6"
        >
          {[
            { label: "GitHub", href: "https://github.com/seu-usuario" },
            { label: "LinkedIn", href: "https://linkedin.com/in/seu-usuario" },
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

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { LoaderCircle } from "lucide-react";
import Reveal from "../components/Reveal";
import { socialLinks } from "../config/socials";
import { EASE } from "../lib/motion";

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full rounded-[10px] border border-paper/25 bg-transparent px-3.5 py-3 type-small text-paper placeholder:text-paper/45 outline-none transition-colors focus:border-paper/70";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  // Esconde a mensagem de sucesso/erro depois de alguns segundos.
  useEffect(() => {
    if (status !== "success" && status !== "error") return;
    const timer = window.setTimeout(() => setStatus("idle"), 6000);
    return () => window.clearTimeout(timer);
  }, [status]);

  const sendEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current) return;

    setStatus("sending");
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      formRef.current.reset();
      setStatus("success");
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      setStatus("error");
    }
  };

  const sending = status === "sending";

  return (
    <section id="contato" className="py-14 lg:py-16">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_500px] lg:gap-20">
        <div className="flex flex-col justify-between gap-10">
          <div>
            <Reveal>
              <h2 className="type-h2">Vamos conversar.</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-5 max-w-[560px] type-body">
                Tem um projeto, uma ideia ou uma vaga em mente? Preencha o
                formulário e eu te respondo o quanto antes.
              </p>
            </Reveal>
          </div>

          {socialLinks.length > 0 && (
            <Reveal delay={0.12}>
              <ul className="flex flex-wrap gap-4">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      title={label}
                      className="grid size-10 place-items-center rounded-lg bg-ink/10 text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
                    >
                      <Icon size={18} aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>

        <motion.form
          ref={formRef}
          onSubmit={sendEmail}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          className="flex flex-col gap-5 rounded-[20px] bg-ink p-4 text-paper sm:p-5"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="user_name" className="type-small">
              Nome
            </label>
            <input
              id="user_name"
              name="user_name"
              type="text"
              required
              autoComplete="name"
              placeholder="Seu nome"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="user_email" className="type-small">
              E-mail
            </label>
            <input
              id="user_email"
              name="user_email"
              type="email"
              required
              autoComplete="email"
              placeholder="seu@email.com"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="type-small">
              Mensagem
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Conte um pouco sobre o seu projeto ou a vaga"
              className={`${inputClass} resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="mt-1 flex items-center justify-center gap-2 rounded-[10px] bg-paper py-3.5 type-small font-medium text-ink transition hover:bg-paper/85 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {sending ? (
              <>
                <LoaderCircle size={18} className="animate-spin" aria-hidden />
                Enviando...
              </>
            ) : (
              "Enviar mensagem"
            )}
          </button>

          <div aria-live="polite" className="min-h-0">
            <AnimatePresence>
              {(status === "success" || status === "error") && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`text-center type-small ${
                    status === "success" ? "text-emerald-300" : "text-rose-300"
                  }`}
                >
                  {status === "success"
                    ? "Mensagem enviada! Retorno em breve."
                    : "Ops, algo deu errado. Tente de novo ou fale comigo pelas redes."}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Ellipsis, X } from "lucide-react";
import type { NavItem } from "../types";
import { site } from "../config/site";
import { profileLinks } from "../config/socials";
import { useActiveSection } from "../hooks/useActiveSection";
import { EASE } from "../lib/motion";

const navItems: NavItem[] = [
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Projetos", href: "#projetos" },
  { label: "Stack", href: "#stack" },
  { label: "Contato", href: "#contato" },
];

// "inicio" entra na observação para nenhum item ficar ativo enquanto se está no topo.
const sectionIds = ["inicio", ...navItems.map((item) => item.href.slice(1))];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const activeId = useActiveSection(sectionIds);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
      className="pointer-events-none fixed inset-x-0 top-5 z-50 flex justify-center px-5 md:top-[30px]"
    >
      <nav
        ref={navRef}
        aria-label="Navegação principal"
        className="pointer-events-auto w-full overflow-hidden rounded-[20px] bg-ink text-paper shadow-[0_12px_40px_-12px_rgb(0_0_0/0.45)] md:w-[320px]"
      >
        <div className="flex h-[60px] items-center justify-between gap-3 pr-3 pl-4">
          <a
            href="#inicio"
            onClick={close}
            className="text-[22px] font-semibold tracking-[-0.04em]"
          >
            {site.shortName}
          </a>

          <div className="flex items-center gap-2">
            {profileLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="grid size-9 place-items-center rounded-lg bg-paper/10 text-paper transition-colors duration-300 hover:bg-paper hover:text-ink"
              >
                <Icon size={16} aria-hidden />
              </a>
            ))}

            {site.cvUrl && (
              <a
                href={site.cvUrl}
                download
                title="Baixar currículo (PDF)"
                className="grid h-9 place-items-center rounded-lg bg-paper/10 px-3 type-small font-medium text-paper transition-colors duration-300 hover:bg-paper hover:text-ink"
              >
                CV
              </a>
            )}

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="menu-principal"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className={`grid size-9 place-items-center rounded-lg text-ink transition-colors duration-300 ${
                open ? "bg-paper/85" : "bg-paper hover:bg-paper/85"
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                  transition={{ duration: 0.18 }}
                  className="grid place-items-center"
                >
                  {open ? (
                    <X size={18} strokeWidth={2.25} aria-hidden />
                  ) : (
                    <Ellipsis size={22} strokeWidth={3} aria-hidden />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="menu-principal"
              key="menu"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <ul className="flex flex-col items-start gap-2 px-4 pt-1 pb-5">
                {navItems.map((item, index) => {
                  const active = activeId === item.href.slice(1);
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, transition: { duration: 0.1 } }}
                      transition={{ duration: 0.4, ease: EASE, delay: 0.06 + index * 0.04 }}
                    >
                      <a
                        href={item.href}
                        onClick={close}
                        aria-current={active ? "location" : undefined}
                        className="inline-flex items-center gap-2 rounded-lg bg-paper px-4 py-1.5 type-small text-ink transition-colors hover:bg-paper/80"
                      >
                        {active && (
                          <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                        )}
                        {item.label}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}

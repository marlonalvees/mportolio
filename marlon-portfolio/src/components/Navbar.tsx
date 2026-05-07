import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { NavItem } from "../types";
import { useActiveSection } from "../hooks/useActiveSection";

const navItems: NavItem[] = [
  { label: "Início", href: "#inicio" },
  { label: "Projetos", href: "#projetos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Contato", href: "#contato" },
];

const sectionIds = navItems.map((item) => item.href.replace("#", ""));

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useActiveSection(sectionIds);

  const closeMenu = () => setMenuOpen(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#inicio" className="text-lg font-bold text-white">
          Marlon<span className="text-violet-400">.dev</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const isActive = activeId === item.href.replace("#", "");
            return (
              <a
                key={item.label}
                href={item.href}
                className={`relative text-sm transition ${
                  isActive
                    ? "text-violet-400"
                    : "text-zinc-400 hover:text-violet-400"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="active-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-violet-400 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        <a
          href="#contato"
          className="hidden md:block rounded-full bg-violet-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-violet-400"
        >
          Fale comigo
        </a>

        {/* btn hamburguer */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex md:hidden flex-col justify-center items-center w-8 h-8 gap-1.5"
          aria-label="Abrir menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="block h-0.5 w-6 bg-white rounded-full origin-center"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="block h-0.5 w-6 bg-white rounded-full"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="block h-0.5 w-6 bg-white rounded-full origin-center"
          />
        </button>
      </nav>

      {/* menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/10 bg-zinc-950/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-5">
              {navItems.map((item, index) => {
                const isActive = activeId === item.href.replace("#", "");
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={closeMenu}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.07 }}
                    className={`text-base transition ${
                      isActive
                        ? "text-violet-400 font-medium"
                        : "text-zinc-300 hover:text-violet-400"
                    }`}
                  >
                    {item.label}
                  </motion.a>
                );
              })}

              <motion.a
                href="#contato"
                onClick={closeMenu}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.07 }}
                className="mt-2 w-full text-center rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-400 transition"
              >
                Fale comigo
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

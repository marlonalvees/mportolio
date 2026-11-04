import { ArrowUpRight, Download } from "lucide-react";
import type { NavItem } from "../types";
import { site } from "../config/site";
import { socialLinks } from "../config/socials";

const YEAR = new Date().getFullYear();

const quickLinks: NavItem[] = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Projetos", href: "#projetos" },
  { label: "Stack", href: "#stack" },
  { label: "Contato", href: "#contato" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="container-x grid gap-14 pt-24 pb-10 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr] lg:gap-16 lg:pt-32">
        <p className="text-[clamp(2.5rem,4.7vw,4.25rem)] leading-none font-semibold tracking-[-0.02em] md:col-span-2 lg:col-span-1">
          Vamos tirar
          <br />
          sua ideia
          <br />
          do papel?
        </p>

        <nav aria-label="Links rápidos" className="lg:pt-16">
          <h2 className="text-[1.625rem] font-medium tracking-[-0.02em]">/Links rápidos</h2>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-block rounded-lg bg-paper px-4 py-1.5 type-small text-ink transition-colors hover:bg-paper/80"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:pt-16">
          <h2 className="text-[1.625rem] font-medium tracking-[-0.02em]">/Contato</h2>
          <ul className="mt-5 space-y-2.5 type-body">
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`} className="transition-opacity hover:opacity-70">
                  {site.email}
                </a>
              </li>
            )}
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-70"
                >
                  <Icon size={16} aria-hidden />
                  {label}
                </a>
              </li>
            ))}
            {site.cvUrl && (
              <li>
                <a
                  href={site.cvUrl}
                  download
                  className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-70"
                >
                  <Download size={16} aria-hidden />
                  Currículo (PDF)
                </a>
              </li>
            )}
            <li>
              <a
                href="#contato"
                className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-70"
              >
                Formulário de contato
                <ArrowUpRight size={16} aria-hidden />
              </a>
            </li>
          </ul>
          <p className="mt-10 type-small text-paper/50">
            © {YEAR} {site.name}
          </p>
        </div>
      </div>

      <p
        aria-hidden
        className="pointer-events-none -mb-[0.2em] text-center text-[19.5vw] leading-[0.8] font-bold tracking-[-0.03em] whitespace-nowrap text-paper/10 select-none"
      >
        {site.shortName.toUpperCase()}
      </p>
    </footer>
  );
}

import type { IconType } from "react-icons";
import { FaGithub, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { site } from "./site";

export interface SocialLink {
  label: string;
  href: string;
  icon: IconType;
  /** Perfil profissional (o que recrutadores procuram primeiro). */
  profile: boolean;
}

const all: (Omit<SocialLink, "href"> & { href: string | null })[] = [
  { label: "LinkedIn", href: site.socials.linkedin, icon: FaLinkedinIn, profile: true },
  { label: "GitHub", href: site.socials.github, icon: FaGithub, profile: true },
  { label: "WhatsApp", href: site.socials.whatsapp, icon: FaWhatsapp, profile: false },
  { label: "Instagram", href: site.socials.instagram, icon: FaInstagram, profile: false },
];

/** Só as redes que têm link preenchido em `site.ts` (nada de link quebrado). */
export const socialLinks: SocialLink[] = all.filter(
  (s): s is SocialLink => Boolean(s.href),
);

/** LinkedIn e GitHub: ficam sempre visíveis na navbar e na seção Sobre. */
export const profileLinks: SocialLink[] = socialLinks.filter((s) => s.profile);

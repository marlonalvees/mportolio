import type { IconType } from "react-icons";
import { FaGithub, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { site } from "./site";

export interface SocialLink {
  label: string;
  href: string;
  icon: IconType;
}

const all: { label: string; href: string | null; icon: IconType }[] = [
  { label: "GitHub", href: site.socials.github, icon: FaGithub },
  { label: "LinkedIn", href: site.socials.linkedin, icon: FaLinkedinIn },
  { label: "WhatsApp", href: site.socials.whatsapp, icon: FaWhatsapp },
  { label: "Instagram", href: site.socials.instagram, icon: FaInstagram },
];

/** Só as redes que têm link preenchido em `site.ts` (nada de link quebrado). */
export const socialLinks: SocialLink[] = all.filter(
  (s): s is SocialLink => Boolean(s.href),
);

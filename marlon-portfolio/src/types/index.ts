export interface Project {
  /** Nome exibido em destaque no card (cliente ou produto). */
  name: string;
  /** Tipo de projeto, exibido abaixo do nome. */
  type: string;
  description: string;
  tech: string[];
  category: string;
  stack: "Frontend" | "Backend" | "Full Stack";
  status: "Online" | "Em desenvolvimento" | "Concluído";
  features: string[];
  images: string[];
  /** Imagem de capa do card. Padrão: a primeira de `images`. */
  cover?: string;
  /** `object-position` da capa, para escolher o recorte. Padrão: "top". */
  coverPosition?: string;
  /** Fundo do card: qualquer valor CSS de `background` (cor ou gradiente). */
  backdrop: string;
  link: string;
  /** Repositório público. Deixe vazio se o código for privado. */
  github?: string;
}

export interface Service {
  title: string;
  tags: string[];
}

export interface StackGroup {
  title: string;
  description: string;
  items: string[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  role: string;
  /** As duas linhas do título gigante do topo. */
  heroTitle: [string, string];
  url: string;
  available: boolean;
  email: string | null;
  cvUrl: string | null;
  socials: {
    github: string | null;
    linkedin: string | null;
    whatsapp: string | null;
    instagram: string | null;
  };
}

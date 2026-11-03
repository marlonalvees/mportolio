import type { SiteConfig } from "../types";

/**
 * Dados pessoais usados no site inteiro.
 * Campos `null` simplesmente não aparecem: preencha para exibi-los.
 */
export const site: SiteConfig = {
  name: "Marlon Alves",
  shortName: "Marlon",
  role: "Desenvolvedor Full Stack",
  heroTitle: ["Full Stack", "Developer"],
  url: "https://www.marlonalves.dev",
  available: true,

  // TODO: e-mail público de contato (ex.: "contato@marlonalves.dev").
  email: null,

  // TODO: coloque o PDF em /public e informe o caminho (ex.: "/Marlon-CV.pdf").
  cvUrl: null,

  socials: {
    github: "https://github.com/marlonalvees",
    // TODO: ex.: "https://www.linkedin.com/in/seu-usuario"
    linkedin: null,
    // TODO: ex.: "https://wa.me/5551999999999" (DDI + DDD + número, só dígitos)
    whatsapp: null,
    instagram: null,
  },
};

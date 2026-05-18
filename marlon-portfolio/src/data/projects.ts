import type { Project } from "../types";

export const projects: Project[] = [
  {
    title: "OrionStock | Gestão de Estoque",
    description:
      "Sistema de gerenciamento de estoque desenvolvido para clínicas veterinárias. Focado na usabilidade e no controle prático de insumos do dia a dia.",
    tech: ["React", "Tailwind CSS", "Node.js", "TypeScript"],
    category: "Sistemas",

    images: [
      "/projects/vetstock-1.png",
      "/projects/vetstock-2.png",
      "/projects/vetstock-3.png",
    ],
    link: "https://orionstock.vercel.app/login",
    github: "https://github.com/marlonalvees/orionstock",
  },
  {
    title: "Dashboard Admin",
    description:
      "Interface de painel administrativo com design limpo, gráficos e foco em produtividade para análise de dados.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    category: "Dashboard",
    images: ["/projects/dashboard.png"],
    link: "#",
    github: "#",
  },
  {
    title: "Landing Page Comercial",
    description:
      "Página moderna e responsiva focada em alta conversão e apresentação profissional de serviços digitais.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    category: "Sites",
    images: ["/projects/landing-page.png"],
    link: "#",
    github: "#",
  },
];

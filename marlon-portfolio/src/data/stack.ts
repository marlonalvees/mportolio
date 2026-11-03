import type { StackGroup } from "../types";

export const stack: StackGroup[] = [
  {
    title: "Front-end",
    description:
      "Interfaces rápidas, responsivas e acessíveis, com animações que guiam em vez de distrair.",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Back-end",
    description:
      "APIs REST organizadas e seguras, com autenticação e regras de negócio bem definidas.",
    items: ["Node.js", "Express", "TypeScript", "JWT"],
  },
  {
    title: "Dados & Deploy",
    description:
      "Bancos bem modelados, armazenamento de arquivos e deploy contínuo em produção.",
    items: ["Supabase", "SQLite", "Docker", "Vercel"],
  },
  {
    title: "Ferramentas",
    description:
      "Versionamento, design e build modernos no fluxo de trabalho do dia a dia.",
    items: ["Git", "GitHub", "Figma", "Vite"],
  },
];

import type { IconType } from "react-icons";
import {
  SiDocker,
  SiExpress,
  SiFigma,
  SiFramer,
  SiGit,
  SiGithub,
  SiJsonwebtokens,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiSqlite,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
} from "react-icons/si";

/** Ícone (monocromático) de cada tecnologia exibida na seção Stack. */
export const techIcons: Record<string, IconType> = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  "Framer Motion": SiFramer,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  JWT: SiJsonwebtokens,
  Supabase: SiSupabase,
  SQLite: SiSqlite,
  Docker: SiDocker,
  Vercel: SiVercel,
  Git: SiGit,
  GitHub: SiGithub,
  Figma: SiFigma,
  Vite: SiVite,
};

export interface Project {
  title: string;
  description: string;
  tech: string[];
  category: string;
  stack: "Frontend" | "Backend" | "Full Stack";
  status: "Online" | "Em desenvolvimento" | "Concluído";
  features: string[];
  images: string[];
  link: string;
  github: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}

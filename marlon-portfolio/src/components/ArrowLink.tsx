import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

interface ArrowLinkProps {
  href: string;
  children: ReactNode;
  /** "ink" para fundos claros, "paper" para fundos escuros. */
  tone?: "ink" | "paper";
  external?: boolean;
  download?: boolean;
  className?: string;
}

const tones = {
  ink: {
    text: "text-ink",
    box: "border-ink group-hover:bg-ink group-hover:text-paper",
  },
  paper: {
    text: "text-paper",
    box: "border-paper group-hover:bg-paper group-hover:text-ink",
  },
};

/** Link de texto com a caixinha de seta ↗ ao lado. */
export default function ArrowLink({
  href,
  children,
  tone = "ink",
  external = false,
  download = false,
  className = "",
}: ArrowLinkProps) {
  const t = tones[tone];

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      download={download || undefined}
      className={`group inline-flex items-center gap-2.5 type-body ${t.text} ${className}`}
    >
      <span>{children}</span>
      <span
        className={`grid size-7 shrink-0 place-items-center rounded-md border transition-colors duration-300 ${t.box}`}
      >
        <ArrowUpRight
          size={16}
          strokeWidth={2}
          className="transition-transform duration-300 ease-out-expo group-hover:rotate-45"
          aria-hidden
        />
      </span>
    </a>
  );
}

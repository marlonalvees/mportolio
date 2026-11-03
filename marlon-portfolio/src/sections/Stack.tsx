import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import { stack } from "../data/stack";
import { techIcons } from "../data/techIcons";
import { EASE } from "../lib/motion";

export default function Stack() {
  return (
    <section id="stack" className="py-14 lg:py-16">
      <div className="container-x">
        <Reveal>
          <h2 className="type-h2">Stack</h2>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {stack.map((group, index) => (
            <motion.article
              key={group.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.9, ease: EASE, delay: index * 0.08 }}
              className="flex min-h-[340px] flex-col justify-between gap-10 rounded-[20px] bg-ink p-5 text-paper transition-transform duration-500 ease-out-expo hover:-translate-y-1.5 lg:min-h-[360px]"
            >
              <div>
                <p className="type-small text-paper/50 tabular-nums">/0{index + 1}</p>
                <h3 className="mt-3 text-[1.625rem] leading-tight font-medium tracking-[-0.03em]">
                  {group.title}
                </h3>
                <p className="mt-3 type-body text-paper/80">{group.description}</p>
              </div>

              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => {
                  const Icon = techIcons[item];
                  return (
                    <li
                      key={item}
                      className="inline-flex items-center gap-2 rounded-lg bg-paper/10 px-3 py-1.5 type-small"
                    >
                      {Icon && <Icon size={14} aria-hidden className="shrink-0" />}
                      {item}
                    </li>
                  );
                })}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

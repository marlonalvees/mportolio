import { Fragment } from "react";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import { services } from "../data/services";
import { EASE } from "../lib/motion";

export default function Services() {
  return (
    <section id="servicos" className="py-14 lg:py-16">
      <div className="container-x">
        <Reveal>
          <h2 className="type-h2">Serviços</h2>
        </Reveal>

        <ul className="mt-12 lg:mt-20">
          {services.map((service, index) => (
            <motion.li
              key={service.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.8, ease: EASE, delay: index * 0.06 }}
              className="group flex flex-col gap-3 border-b border-ink/10 py-8 md:flex-row md:items-center md:justify-between md:gap-8 lg:py-12"
            >
              <h3 className="type-h3 transition-transform duration-500 ease-out-expo group-hover:translate-x-2">
                {service.title}
              </h3>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 type-body text-ink/60 transition-colors duration-500 group-hover:text-ink">
                {service.tags.map((tag, tagIndex) => (
                  <Fragment key={tag}>
                    {tagIndex > 0 && (
                      <span aria-hidden className="text-ink">
                        •
                      </span>
                    )}
                    <span>{tag}</span>
                  </Fragment>
                ))}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

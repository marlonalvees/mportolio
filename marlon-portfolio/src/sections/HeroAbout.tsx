import { useLayoutEffect, useRef } from "react";
import type { RefObject } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import ArrowLink from "../components/ArrowLink";
import CodeGlyph from "../components/CodeGlyph";
import Reveal from "../components/Reveal";
import { site } from "../config/site";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { EASE, clamp01 } from "../lib/motion";

const PHOTO = "/perfil.png";
/** Tamanho máximo da foto no topo da página, relativo ao tamanho final. */
const MAX_START_SCALE = 0.5;
/** Altura da foto no topo como fração da tela (diminui em telas baixas). */
const START_HEIGHT_RATIO = 0.25;
/** Distância (px) entre a foto e a borda de baixo da tela durante a animação. */
const EDGE_GAP = 20;

const smoothstep = (t: number) => t * t * (3 - 2 * t);

export default function HeroAbout() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  return (
    <>
      <Hero heroRef={heroRef} showPhoto={!isDesktop} />
      <About
        heroRef={heroRef}
        showPhoto={isDesktop}
        animatePhoto={isDesktop && !reduceMotion}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */

function PhotoFace({ back = false }: { back?: boolean }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden rounded-[20px] bg-ink backface-hidden ${
        back ? "rotate-y-180" : ""
      }`}
    >
      <img
        src={PHOTO}
        alt={back ? "" : `Foto de ${site.name}`}
        draggable={false}
        className={`size-full object-cover ${
          back ? "brightness-[0.7] contrast-[1.25] grayscale" : ""
        }`}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */

interface HeroProps {
  heroRef: RefObject<HTMLElement | null>;
  showPhoto: boolean;
}

function Hero({ heroRef, showPhoto }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const topGlyphY = useTransform(scrollY, [0, 900], [0, reduceMotion ? 0 : -180]);
  const bottomGlyphY = useTransform(scrollY, [0, 900], [0, reduceMotion ? 0 : -70]);

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative flex h-svh min-h-160 flex-col overflow-x-clip"
    >
      <div className="container-x flex flex-1 flex-col items-center justify-center pt-24 lg:pt-10">
        <div className="relative">
          <motion.div
            style={{ y: topGlyphY }}
            className="absolute top-[-34%] left-[-9%] sm:top-[-30%] sm:left-[-8%]"
          >
            <CodeGlyph char="{ }" rotate={-14} delay={0.7} />
          </motion.div>

          <h1 className="type-display text-center uppercase">
            <span className="sr-only">
              {site.name}, {site.role}.
            </span>
            <span aria-hidden>
              {site.heroTitle.map((line, index) => (
                <span key={line} className="block overflow-hidden pt-[0.06em]">
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1.1, ease: EASE, delay: 0.2 + index * 0.12 }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>

          <motion.div
            style={{ y: bottomGlyphY }}
            className="absolute right-[-7%] bottom-[-62%] sm:right-[-9%] sm:bottom-[-30%]"
          >
            <CodeGlyph char="</>" rotate={10} delay={0.85} />
          </motion.div>
        </div>

        {showPhoto && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.55 }}
            className="relative mt-16 aspect-400/456 w-[min(48vw,220px)]"
          >
            <PhotoFace />
          </motion.div>
        )}
      </div>

      <div className="container-x flex flex-col items-center gap-3 pb-6 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left lg:pb-5">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.5 }}
          className="text-[clamp(2rem,4.7vw,4.25rem)] leading-none font-semibold tracking-[-0.02em]"
        >
          {site.name}
        </motion.p>

        {site.available && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.6 }}
            className="flex items-center gap-2.5 type-body uppercase"
          >
            <span className="relative flex size-2.5" aria-hidden>
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
            </span>
            Disponível para projetos
          </motion.p>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

interface AboutProps {
  heroRef: RefObject<HTMLElement | null>;
  showPhoto: boolean;
  animatePhoto: boolean;
}

function About({ heroRef, showPhoto, animatePhoto }: AboutProps) {
  const slotRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Deslocamento da foto (do lugar final até o pé do hero) e quanto de scroll a animação dura.
  const startX = useMotionValue(0);
  const startY = useMotionValue(0);
  const startScale = useMotionValue(MAX_START_SCALE);
  const distance = useMotionValue(1);

  const progress = useTransform(() => clamp01(scrollY.get() / distance.get()));
  const x = useTransform(() => startX.get() * (1 - progress.get()));
  const y = useTransform(() => startY.get() * (1 - progress.get()));
  const scale = useTransform(
    () => startScale.get() + (1 - startScale.get()) * progress.get(),
  );
  const rotateY = useTransform(() => 180 * (1 - smoothstep(progress.get())));

  // Precisa vir DEPOIS dos useTransform: eles se inscrevem nas mudanças num
  // layout effect próprio, e uma medição feita antes disso seria ignorada.
  useLayoutEffect(() => {
    if (!animatePhoto) return;

    const measure = () => {
      const slot = slotRef.current;
      const hero = heroRef.current;
      if (!slot || !hero) return;

      const scroll = window.scrollY;
      const slotRect = slot.getBoundingClientRect();
      const heroRect = hero.getBoundingClientRect();
      const height = slotRect.height;
      const s0 = Math.min(
        MAX_START_SCALE,
        (window.innerHeight * START_HEIGHT_RATIO) / height,
      );

      const finalCenterX = slotRect.left + slotRect.width / 2;
      const finalCenterY = slotRect.top + scroll + height / 2;
      const startCenterX = heroRect.left + heroRect.width / 2;
      const startCenterY = heroRect.bottom + scroll - EDGE_GAP - (height * s0) / 2;
      const landingCenterY = window.innerHeight - EDGE_GAP - height / 2;

      startScale.set(s0);
      startX.set(startCenterX - finalCenterX);
      startY.set(startCenterY - finalCenterY);
      distance.set(Math.max(1, finalCenterY - landingCenterY));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    window.addEventListener("resize", measure);
    void document.fonts?.ready.then(measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [animatePhoto, heroRef, startX, startY, startScale, distance]);

  return (
    <section id="sobre" className="relative pt-16 pb-24 lg:pt-[34vh] lg:pb-36">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_400px_1fr] lg:gap-7.5">
        <div className="flex flex-col justify-between gap-10">
          <Reveal>
            <h2 className="type-h2">Olá!</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="type-lead max-w-82.5">
              Sou o Marlon, desenvolvedor full stack. Transformo ideias em sites,
              sistemas e produtos digitais que funcionam de verdade.
            </p>
          </Reveal>
        </div>

        {showPhoto && (
          <div ref={slotRef} className="relative z-10 aspect-400/456 w-full">
            {animatePhoto ? (
              <motion.div
                className="absolute inset-0 transform-3d will-change-transform"
                style={{ x, y, scale, rotateY, transformPerspective: 1400 }}
              >
                <PhotoFace />
                <PhotoFace back />
              </motion.div>
            ) : (
              <PhotoFace />
            )}
          </div>
        )}

        <div className="flex max-w-100 flex-col justify-end gap-4">
          <Reveal>
            <p className="type-body">
              Trabalho de ponta a ponta: da interface ao servidor, do banco de
              dados ao deploy, com React, Next.js, Node.js e TypeScript.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="type-body">
              Já entreguei sites, lojas virtuais e sistemas internos para
              empresas reais, sempre com foco em performance, código limpo e uma
              boa experiência para quem usa.
            </p>
          </Reveal>
          <Reveal delay={0.16} className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ArrowLink href="#contato">Vamos conversar</ArrowLink>
            {site.cvUrl && (
              <ArrowLink href={site.cvUrl} download>
                Baixar CV
              </ArrowLink>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

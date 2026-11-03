/** Curva padrão do site: começa rápido e desacelera suave (ease-out expo). */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

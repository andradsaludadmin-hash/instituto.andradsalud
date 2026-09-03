import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type Testimonio = {
  id: number;
  nombre: string;
  curso: string;
  texto: string;
  iniciales: string;
};

export function Testimonials({ testimonios }: { testimonios: Testimonio[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || testimonios.length === 0) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonios.length), 6000);
    return () => clearInterval(id);
  }, [paused, testimonios.length]);

  const go = (dir: number) => setIndex((i) => (i + dir + testimonios.length) % testimonios.length);

  if (testimonios.length === 0) return null;

  const actual = testimonios[index] ?? testimonios[0]!;

  return (
    <div
      className="mx-auto max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative rounded-3xl border border-border bg-card p-8 shadow-lg shadow-primary/5 sm:p-12">
        <Quote className="absolute right-8 top-8 h-10 w-10 text-primary/10" aria-hidden="true" />

        <div className="flex gap-1" aria-label="5 de 5 estrellas">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
          ))}
        </div>

        <blockquote
          key={actual.id}
          className="mt-6 text-lg leading-relaxed text-foreground duration-500 animate-in fade-in slide-in-from-bottom-2 sm:text-xl"
        >
          “{actual.texto}”
        </blockquote>

        <div className="mt-8 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-heading text-sm font-bold text-primary">
            {actual.iniciales}
          </div>
          <div>
            <p className="font-heading text-sm font-bold text-foreground">{actual.nombre}</p>
            <p className="text-sm text-muted-foreground">{actual.curso}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Testimonio anterior"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-2">
          {testimonios.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ver testimonio de ${t.nombre}`}
              aria-current={i === index}
              className={cn(
                "h-2 rounded-full transition-all",
                i === index ? "w-7 bg-primary" : "w-2 bg-border hover:bg-primary/40",
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Testimonio siguiente"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

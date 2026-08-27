import { ArrowRight, Calendar, CheckCircle2, Clock, MapPin, Briefcase, X } from "lucide-react";

import type { Curso } from "@/data/site-content";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

type Props = {
  curso: Curso | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInscribirme: (curso: Curso) => void;
};

export function CourseSheet({ curso, open, onOpenChange, onInscribirme }: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto p-0 sm:max-w-lg">
        {curso && (
          <>
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <img src={curso.imagen} alt={curso.titulo} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
              <span className="absolute bottom-4 left-6 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">
                {curso.categoria}
              </span>
              {/* Botón de cierre mejorado */}
              <SheetClose className="absolute right-4 top-4 z-50 rounded-full bg-background/80 p-2 text-foreground shadow-md backdrop-blur-sm transition-opacity hover:bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                <X className="h-5 w-5" />
                <span className="sr-only">Cerrar</span>
              </SheetClose>
            </div>

            <SheetHeader className="px-6 pt-6 text-left">
              <SheetTitle className="font-heading text-2xl font-bold text-foreground">
                {curso.titulo}
              </SheetTitle>
              <SheetDescription className="text-base leading-relaxed">
                {curso.descripcion}
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-8 px-6 pb-8 pt-6">
              <dl className="grid grid-cols-2 gap-3">
                {[
                  { icon: Clock, label: "Duración", value: curso.duracion },
                  { icon: Calendar, label: "Inicio", value: curso.inicio },
                  { icon: MapPin, label: "Modalidad", value: curso.modalidad },
                  { icon: Briefcase, label: "Vacantes", value: curso.cupos },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-border bg-muted/40 p-3">
                    <dt className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <item.icon className="h-3.5 w-3.5 text-primary" />
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-foreground">{item.value}</dd>
                  </div>
                ))}
              </dl>

              {curso.temario.length > 0 && (
                <div>
                  <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-foreground">
                    Qué vas a aprender
                  </h4>
                  <ul className="mt-4 space-y-3">
                    {curso.temario.map((tema) => (
                      <li
                        key={tema}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{tema}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {curso.salidaLaboral && (
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <h4 className="font-heading text-sm font-bold text-foreground">Salida laboral</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {curso.salidaLaboral}
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-3 border-t border-border pt-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground">Inversión</span>
                  <span className="font-heading text-xl font-bold text-primary">
                    {curso.precio}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onInscribirme(curso)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg"
                >
                  Inscribirme en este curso
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

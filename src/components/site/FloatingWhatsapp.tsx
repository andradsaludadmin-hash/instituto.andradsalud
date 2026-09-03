import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { institucion } from "@/data/site-content";

export function FloatingWhatsapp({ phone = institucion.contacto.whatsapp }: { phone?: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={`https://wa.me/${phone}?text=${encodeURIComponent("Hola, quiero información sobre los cursos del Instituto Andrad Salud.")}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribinos por WhatsApp"
      className={cn(
        "group fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-primary py-3.5 pl-4 pr-5 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition-all duration-300 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Consultar por WhatsApp</span>
      <span className="sm:hidden">WhatsApp</span>
    </a>
  );
}

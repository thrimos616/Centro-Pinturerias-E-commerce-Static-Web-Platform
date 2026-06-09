import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CheckCircle } from "lucide-react";

const highlights = [
  "Más de 20 años de experiencia en el rubro",
  "Red de sucursales en todo el país",
  "Marcas líderes al mejor precio",
  "Asesoramiento técnico personalizado",
  "Sistema de envíos a domicilio",
];

export function About() {
  return (
    <section className="py-12 md:py-16 bg-white dark:bg-slate-900 transition-colors" id="nosotros">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="rounded-2xl overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1659390825881-b9d0b451f292?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMHBhaW50aW5nJTIwaW50ZXJpb3IlMjB3YWxsfGVufDF8fHx8MTc3NTIzMTM4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Sobre nosotros"
              className="w-full h-72 md:h-96 object-cover"
            />
          </div>
          <div>
            <p className="text-[#68b859] dark:text-[#68b859] text-sm mb-2 uppercase tracking-wide" style={{ fontWeight: 600 }}>Sobre nosotros</p>
            <h2 className="text-2xl md:text-3xl text-gray-800 dark:text-slate-100 mb-4" style={{ fontWeight: 700 }}>
              Tu pinturería de confianza
            </h2>
            <p className="text-gray-600 dark:text-slate-300 mb-6">
              En Centro Pinturerias somos especialistas en pinturas, revestimientos y todo lo que necesitás para tus proyectos de decoración y construcción. Contamos con un equipo de profesionales listos para asesorarte en cada paso.
            </p>
            <ul className="space-y-3">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-gray-700 dark:text-slate-300">
                  <CheckCircle className="w-5 h-5 text-[#68b859] dark:text-[#68b859] flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Calendar, ArrowRight, Tag } from "lucide-react";

const news = [
  {
    id: 1,
    tag: "Promoción",
    title: "Semana del Color: hasta 35% OFF en toda la línea Alba",
    excerpt: "Aprovechá descuentos increíbles en toda la línea de pinturas Alba durante esta semana. Válido para compras en sucursal y online.",
    date: "28 Mar 2026",
    image: "https://images.unsplash.com/photo-1763741226847-f5ef0c846506?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMGNhbnMlMjBzdG9yZSUyMGNvbG9yZnVsfGVufDF8fHx8MTc3NTIzMTM4NXww&ixlib=rb-4.1.0&q=80&w=1080",
    featured: true,
  },
  {
    id: 2,
    tag: "Tendencia",
    title: "Los 5 colores tendencia para otoño 2026",
    excerpt: "Descubrí las paletas que van a dominar la temporada y cómo aplicarlas en tu hogar.",
    date: "25 Mar 2026",
    image: "https://images.unsplash.com/photo-1690743300963-c09faf1d06f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMGNvbG9yJTIwc3dhdGNoZXMlMjBwYWxldHRlfGVufDF8fHx8MTc3NTIzMTM4N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    featured: false,
  },
  {
    id: 3,
    tag: "Guía",
    title: "Cómo preparar tus paredes antes de pintar",
    excerpt: "Una guía paso a paso para lograr un acabado profesional desde la preparación.",
    date: "20 Mar 2026",
    image: "https://images.unsplash.com/photo-1659390825881-b9d0b451f292?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMHBhaW50aW5nJTIwaW50ZXJpb3IlMjB3YWxsfGVufDF8fHx8MTc3NTIzMTM4NXww&ixlib=rb-4.1.0&q=80&w=1080",
    featured: false,
  },
  {
    id: 4,
    tag: "Evento",
    title: "Workshop gratuito: técnicas de pintura decorativa",
    excerpt: "Sumate a nuestro taller presencial donde aprenderás técnicas profesionales de decoración.",
    date: "15 Mar 2026",
    image: "https://images.unsplash.com/photo-1516962080544-eac695c93791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMHJvbGxlciUyMGJydXNoJTIwdG9vbHN8ZW58MXx8fHwxNzc1MjIzNTkyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    featured: false,
  },
  {
    id: 5,
    tag: "Novedad",
    title: "Nueva línea de impermeabilizantes ecológicos",
    excerpt: "Llegaron los nuevos impermeabilizantes base agua, más amigables con el medio ambiente.",
    date: "10 Mar 2026",
    image: "https://images.unsplash.com/photo-1723056347299-893ec22e809f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcnByb29mJTIwY29hdGluZyUyMHdhbGwlMjBleHRlcmlvcnxlbnwxfHx8fDE3NzUyMzEzODd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    featured: false,
  },
];

const tagColors: Record<string, string> = {
  "Promoción": "bg-red-100 text-red-700",
  "Tendencia": "bg-purple-100 text-purple-700",
  "Guía": "bg-blue-100 text-blue-700",
  "Evento": "bg-amber-100 text-amber-700",
  "Novedad": "bg-green-100 text-green-700",
};

export function NovedadesPage() {
  const featured = news[0];
  const rest = news.slice(1);

  return (
    <div className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl text-gray-800 dark:text-slate-100" style={{ fontWeight: 700 }}>Novedades</h1>
          <p className="text-gray-500 dark:text-slate-400 mt-2">Enterate de las últimas promociones, tendencias y novedades del mundo de la pintura.</p>
        </div>

        {/* Featured */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition mb-10 grid grid-cols-1 md:grid-cols-2 cursor-pointer group border border-transparent dark:border-slate-800">
          <div className="h-60 md:h-auto overflow-hidden">
            <ImageWithFallback src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
          </div>
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <span className={`text-xs px-3 py-1 rounded-full ${tagColors[featured.tag]}`}>{featured.tag}</span>
              <span className="text-xs text-gray-400 flex items-center gap-1"><Calendar className="w-3 h-3" /> {featured.date}</span>
            </div>
            <h2 className="text-xl md:text-2xl text-gray-800 dark:text-slate-200 mb-3" style={{ fontWeight: 700 }}>{featured.title}</h2>
            <p className="text-gray-500 dark:text-slate-400 text-sm mb-4">{featured.excerpt}</p>
            <span className="text-[#68b859] dark:text-[#68b859] text-sm flex items-center gap-1 group-hover:gap-2 transition-all" style={{ fontWeight: 600 }}>
              Leer más <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {rest.map(n => (
            <div key={n.id} className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer group border border-transparent dark:border-slate-800">
              <div className="h-40 overflow-hidden">
                <ImageWithFallback src={n.image} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${tagColors[n.tag]}`}>{n.tag}</span>
                  <span className="text-xs text-gray-400">{n.date}</span>
                </div>
                <h3 className="text-sm text-gray-800 dark:text-slate-200 mb-2 line-clamp-2" style={{ fontWeight: 600 }}>{n.title}</h3>
                <p className="text-xs text-gray-500 dark:text-slate-400 line-clamp-2">{n.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

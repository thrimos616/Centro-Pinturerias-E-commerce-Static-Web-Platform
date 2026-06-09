import { Heart, DollarSign, Truck, Headphones } from "lucide-react";

const services = [
  {
    icon: Heart,
    color: "text-red-500",
    bg: "bg-red-50 dark:bg-red-900/20",
    title: "Calidad Garantizada",
    desc: "Trabajamos con las mejores marcas del mercado para asegurar la satisfacción de nuestros clientes.",
  },
  {
    icon: DollarSign,
    color: "text-green-600",
    bg: "bg-green-50 dark:bg-green-900/20",
    title: "Mejores Precios",
    desc: "Ofrecemos los precios más competitivos del mercado con promociones exclusivas todo el año.",
  },
  {
    icon: Headphones,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    title: "Asesoramiento Profesional",
    desc: "Nuestro equipo de expertos te ayuda a elegir el producto ideal para cada proyecto.",
  },
  {
    icon: Truck,
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-900/20",
    title: "Envío a Domicilio",
    desc: "Realizamos envíos a todo el país con seguimiento en tiempo real de tu pedido.",
  },
];

export function Services() {
  return (
    <section className="py-12 md:py-16 bg-white dark:bg-slate-900 transition-colors" id="servicios">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-2xl md:text-3xl text-gray-800 dark:text-slate-100 mb-10" style={{ fontWeight: 700 }}>
          Servicios destacados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div key={s.title} className="text-center p-6 rounded-xl hover:shadow-lg dark:hover:shadow-slate-800 transition group">
              <div className={`w-14 h-14 ${s.bg} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition`}>
                <s.icon className={`w-7 h-7 ${s.color}`} />
              </div>
              <h3 className="text-gray-800 dark:text-slate-200 mb-2" style={{ fontWeight: 600 }}>{s.title}</h3>
              <p className="text-gray-500 dark:text-slate-400 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

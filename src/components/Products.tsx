import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ShoppingCart } from "lucide-react";

const categories = [
  { name: "Pinturas Interior", count: 156 },
  { name: "Pinturas Exterior", count: 89 },
  { name: "Revestimientos", count: 64 },
  { name: "Impermeabilizantes", count: 42 },
  { name: "Accesorios", count: 210 },
  { name: "Decoración", count: 78 },
];

const products = [
  {
    name: "Latex Interior Premium 20L",
    brand: "Alba",
    price: 45990,
    oldPrice: 52990,
    image: "https://images.unsplash.com/photo-1763741226847-f5ef0c846506?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMGNhbnMlMjBzdG9yZSUyMGNvbG9yZnVsfGVufDF8fHx8MTc3NTIzMTM4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    discount: 13,
  },
  {
    name: "Esmalte Sintético Brillante 4L",
    brand: "Tersuave",
    price: 28500,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1690743300963-c09faf1d06f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMGNvbG9yJTIwc3dhdGNoZXMlMjBwYWxldHRlfGVufDF8fHx8MTc3NTIzMTM4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    discount: null,
  },
  {
    name: "Kit Rodillo + Bandeja Pro",
    brand: "Prestigio",
    price: 12990,
    oldPrice: 15990,
    image: "https://images.unsplash.com/photo-1516962080544-eac695c93791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMHJvbGxlciUyMGJydXNoJTIwdG9vbHN8ZW58MXx8fHwxNzc1MjIzNTkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    discount: 19,
  },
  {
    name: "Impermeabilizante Techos 10L",
    brand: "Duralba",
    price: 38750,
    oldPrice: 44900,
    image: "https://images.unsplash.com/photo-1723056347299-893ec22e809f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcnByb29mJTIwY29hdGluZyUyMHdhbGwlMjBleHRlcmlvcnxlbnwxfHx8fDE3NzUyMzEzODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    discount: 14,
  },
];

export function Products() {
  return (
    <section className="py-12 md:py-16 bg-gray-50 dark:bg-slate-950 transition-colors" id="productos">
      <div className="max-w-7xl mx-auto px-4">
        {/* Categories */}
        <h2 className="text-2xl md:text-3xl text-gray-800 dark:text-slate-100 mb-6" style={{ fontWeight: 700 }}>Categorías</h2>
        <div className="flex gap-3 overflow-x-auto pb-4 mb-10 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className="flex-shrink-0 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-full px-5 py-2.5 text-sm text-gray-700 dark:text-slate-300 hover:border-[#68b859] dark:hover:border-[#68b859] hover:text-[#68b859] dark:hover:text-[#68b859] transition"
            >
              {cat.name} <span className="text-gray-400 dark:text-slate-600 ml-1">({cat.count})</span>
            </button>
          ))}
        </div>

        {/* Products grid */}
        <h2 className="text-2xl md:text-3xl text-gray-800 dark:text-slate-100 mb-6" style={{ fontWeight: 700 }}>Productos destacados</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((p) => (
            <div key={p.name} className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm dark:shadow-slate-900/50 hover:shadow-md transition group border border-transparent dark:border-slate-800 relative flex flex-col">
              <div className="relative aspect-square bg-gray-100 dark:bg-slate-800 overflow-hidden">
                <ImageWithFallback
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300 mix-blend-multiply dark:mix-blend-normal"
                />
                {p.discount && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    -{p.discount}%
                  </span>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <p className="text-xs text-[#68b859] dark:text-[#68b859] mb-1">{p.brand}</p>
                <h3 className="text-sm text-gray-800 dark:text-slate-200 mb-2 line-clamp-2" style={{ fontWeight: 500 }}>{p.name}</h3>
                <div className="flex items-baseline gap-2 mb-3 mt-auto">
                  <span className="text-lg text-gray-900 dark:text-slate-100" style={{ fontWeight: 700 }}>${p.price.toLocaleString()}</span>
                  {p.oldPrice && (
                    <span className="text-xs text-gray-400 dark:text-slate-500 line-through">${p.oldPrice.toLocaleString()}</span>
                  )}
                </div>
                <button className="w-full bg-[#68b859] text-white text-sm py-2 rounded-lg hover:bg-[#5a9918] transition flex items-center justify-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Agregar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a href="/tienda" className="bg-white dark:bg-transparent border-2 border-[#68b859] dark:border-[#68b859] text-[#68b859] dark:text-[#68b859] px-8 py-3 rounded-full hover:bg-[#68b859] dark:hover:bg-[#68b859] hover:text-white dark:hover:text-white transition text-sm inline-block" style={{ fontWeight: 600 }}>
            Ver todos los productos
          </a>
        </div>
      </div>
    </section>
  );
}

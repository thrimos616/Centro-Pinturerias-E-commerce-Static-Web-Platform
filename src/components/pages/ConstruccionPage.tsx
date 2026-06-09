import { useState } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ProductSelectionModal, type ProductForModal } from "../figma/ProductSelectionModal";
import { ShoppingCart, Layers, Square, Ruler, Wrench } from "lucide-react";

const categories = [
  { icon: Layers, name: "Placas de Yeso", desc: "Durlock estándar, resistente al agua y al fuego", count: 28 },
  { icon: Square, name: "Perfilería", desc: "Montantes, soleras y accesorios metálicos", count: 45 },
  { icon: Ruler, name: "Masillas y Cintas", desc: "Masillas para juntas, cintas papel y malla", count: 32 },
  { icon: Wrench, name: "Herramientas", desc: "Espátulas, atornilladoras y accesorios", count: 56 },
];

const products: ProductForModal[] = [
  { id: 1, name: "Placa Durlock Estándar 12.5mm", brand: "Durlock", price: 15900, image: "https://images.unsplash.com/photo-1628901551715-7234d14fb7a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcnl3YWxsJTIwY29uc3RydWN0aW9uJTIwZ3lwc3VtJTIwYm9hcmR8ZW58MXx8fHwxNzc1MjMxNjc4fDA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: 2, name: "Placa Resistente al Agua 12.5mm", brand: "Durlock", price: 21500, image: "https://images.unsplash.com/photo-1723056347299-893ec22e809f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcnByb29mJTIwY29hdGluZyUyMHdhbGwlMjBleHRlcmlvcnxlbnwxfHx8fDE3NzUyMzEzODd8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: 3, name: "Masilla para Juntas 15kg", brand: "Weber", price: 12800, image: "https://images.unsplash.com/photo-1769173129390-a57de2512782?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMHN0b3JlJTIwc2hlbHZlcyUyMHByb2R1Y3RzfGVufDF8fHx8MTc3NTIzMTY3OXww&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: 4, name: "Montante 69mm x 2.60m", brand: "Barbieri", price: 4500, image: "https://images.unsplash.com/photo-1631061781995-20a7f92437e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleHRlcmlvciUyMHBhaW50JTIwaG91c2UlMjBmYWNhZGV8ZW58MXx8fHwxNzc1MjMxNjgwfDA&ixlib=rb-4.1.0&q=80&w=1080" },
];

const tips = [
  { title: "¿Cuántas placas necesito?", desc: "Calculá la superficie en m² y dividí por 2.88 (superficie de cada placa estándar de 1.20 x 2.40m)." },
  { title: "¿Qué placa elijo?", desc: "Para baños y cocinas usá placas verdes (resistentes al agua). Para garajes, las placas rosas (resistentes al fuego)." },
  { title: "¿Necesito perfilería?", desc: "Sí, siempre. Las placas se fijan a una estructura de montantes y soleras metálicas." },
];

export function ConstruccionPage() {
  const [selected, setSelected] = useState<ProductForModal | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero */}
        <div className="relative rounded-2xl overflow-hidden mb-10 h-48 md:h-64">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1628901551715-7234d14fb7a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcnl3YWxsJTIwY29uc3RydWN0aW9uJTIwZ3lwc3VtJTIwYm9hcmR8ZW58MXx8fHwxNzc1MjMxNjc4fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Construcción en seco"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center px-8 md:px-12">
            <div>
              <h1 className="text-white text-3xl md:text-4xl" style={{ fontWeight: 700 }}>Construcción en Seco</h1>
              <p className="text-white/80 mt-2 max-w-md">Placas de yeso, perfilería, masillas y todo para tus proyectos de steel frame y drywall.</p>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {categories.map(c => (
            <div key={c.name} className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow-sm hover:shadow-md transition cursor-pointer group">
              <div className="w-12 h-12 bg-[#68b859]/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#68b859]/20 transition">
                <c.icon className="w-6 h-6 text-[#68b859] dark:text-[#68b859]" />
              </div>
              <h3 className="text-gray-800 dark:text-slate-200 mb-1" style={{ fontWeight: 600 }}>{c.name}</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400">{c.desc}</p>
              <p className="text-xs text-[#68b859] dark:text-[#68b859] mt-2">{c.count} productos</p>
            </div>
          ))}
        </div>

        {/* Products */}
        <h2 className="text-2xl text-gray-800 dark:text-slate-100 mb-6" style={{ fontWeight: 700 }}>Productos populares</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {products.map(p => (
            <div key={p.id} className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group">
              <div className="relative aspect-square bg-gray-100 dark:bg-slate-800 overflow-hidden">
                <ImageWithFallback src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              </div>
              <div className="p-4">
                <p className="text-xs text-[#68b859] dark:text-[#68b859] mb-1">{p.brand}</p>
                <h3 className="text-sm text-gray-800 dark:text-slate-200 mb-2 line-clamp-2" style={{ fontWeight: 500 }}>{p.name}</h3>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-lg text-gray-900 dark:text-slate-100" style={{ fontWeight: 700 }}>${p.price.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => setSelected(p)}
                  className="w-full bg-[#68b859] text-white text-sm py-2 rounded-lg hover:bg-[#5a9918] transition flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" /> Agregar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="bg-[#68b859]/5 dark:bg-[#68b859]/10 rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl text-gray-800 dark:text-slate-100 mb-6" style={{ fontWeight: 700 }}>Tips para tu obra</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tips.map(t => (
              <div key={t.title} className="bg-white dark:bg-slate-900 rounded-xl p-5">
                <h3 className="text-gray-800 dark:text-slate-200 mb-2" style={{ fontWeight: 600 }}>{t.title}</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ProductSelectionModal product={selected} onClose={() => setSelected(null)} onAdd={showToast} />

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] bg-gray-900 text-white text-sm px-5 py-3 rounded-full shadow-lg flex items-center gap-2">
          <ShoppingCart className="w-4 h-4 text-green-400" />
          {toast}
        </div>
      )}
    </div>
  );
}

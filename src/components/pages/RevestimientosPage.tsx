import { useState } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ProductSelectionModal, type ProductForModal } from "../figma/ProductSelectionModal";
import { ShoppingCart } from "lucide-react";

const types = [
  { name: "Texturados", desc: "Acabado rústico y moderno para exteriores e interiores", color: "bg-amber-50 border-amber-200" },
  { name: "Piedra Paris", desc: "Efecto piedra natural para fachadas elegantes", color: "bg-stone-50 border-stone-200" },
  { name: "Granitex", desc: "Terminación granulada de alta resistencia", color: "bg-gray-50 border-gray-200" },
  { name: "Llaneado Fino", desc: "Acabado liso y suave para interiores premium", color: "bg-emerald-50 border-emerald-200" },
];

const products: ProductForModal[] = [
  { id: 1, name: "Revear Texturado Travertino 30kg", brand: "Weber", price: 42500, image: "https://images.unsplash.com/photo-1770394644068-c1fd69dda1c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWNvcmF0aXZlJTIwd2FsbCUyMHRleHR1cmUlMjBwbGFzdGVyfGVufDF8fHx8MTc3NTIzMTY3OHww&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: 2, name: "Piedra Paris Gris 25kg", brand: "Tarquini", price: 38900, image: "https://images.unsplash.com/photo-1631061781995-20a7f92437e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleHRlcmlvciUyMHBhaW50JTIwaG91c2UlMjBmYWNhZGV8ZW58MXx8fHwxNzc1MjMxNjgwfDA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: 3, name: "Granitex Fino Marfil 25kg", brand: "Revesta", price: 29750, image: "https://images.unsplash.com/photo-1723056347299-893ec22e809f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcnByb29mJTIwY29hdGluZyUyMHdhbGwlMjBleHRlcmlvcnxlbnwxfHx8fDE3NzUyMzEzODd8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: 4, name: "Llaneado Fino Blanco 20kg", brand: "Weber", price: 35200, image: "https://images.unsplash.com/photo-1769173129390-a57de2512782?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMHN0b3JlJTIwc2hlbHZlcyUyMHByb2R1Y3RzfGVufDF8fHx8MTc3NTIzMTY3OXww&ixlib=rb-4.1.0&q=80&w=1080" },
];

export function RevestimientosPage() {
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
            src="https://images.unsplash.com/photo-1770394644068-c1fd69dda1c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWNvcmF0aXZlJTIwd2FsbCUyMHRleHR1cmUlMjBwbGFzdGVyfGVufDF8fHx8MTc3NTIzMTY3OHww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Revestimientos"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center px-8 md:px-12">
            <div>
              <h1 className="text-white text-3xl md:text-4xl" style={{ fontWeight: 700 }}>Revestimientos</h1>
              <p className="text-white/80 mt-2 max-w-md">Texturados, piedra paris, granitex y más para dar vida a tus paredes.</p>
            </div>
          </div>
        </div>

        {/* Types */}
        <h2 className="text-2xl text-gray-800 dark:text-slate-100 mb-6" style={{ fontWeight: 700 }}>Tipos de Revestimientos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {types.map(t => (
            <div key={t.name} className={`border rounded-xl p-5 cursor-pointer hover:shadow-md transition dark:bg-slate-900 dark:border-slate-800 ${t.color}`}>
              <h3 className="text-gray-800 dark:text-slate-200 mb-2" style={{ fontWeight: 600 }}>{t.name}</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400">{t.desc}</p>
            </div>
          ))}
        </div>

        {/* Products */}
        <h2 className="text-2xl text-gray-800 dark:text-slate-100 mb-6" style={{ fontWeight: 700 }}>Productos destacados</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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

import { useState } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ProductSelectionModal, type ProductForModal } from "../figma/ProductSelectionModal";
import { ShoppingCart, ChevronRight } from "lucide-react";

const subcategories = [
  { name: "Interior", desc: "Latex, esmaltes y más para tus ambientes", count: 89, image: "https://images.unsplash.com/photo-1659390825881-b9d0b451f292?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMHBhaW50aW5nJTIwaW50ZXJpb3IlMjB3YWxsfGVufDF8fHx8MTc3NTIzMTM4NXww&ixlib=rb-4.1.0&q=80&w=1080" },
  { name: "Exterior", desc: "Protección y color para fachadas", count: 67, image: "https://images.unsplash.com/photo-1631061781995-20a7f92437e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleHRlcmlvciUyMHBhaW50JTIwaG91c2UlMjBmYWNhZGV8ZW58MXx8fHwxNzc1MjMxNjgwfDA&ixlib=rb-4.1.0&q=80&w=1080" },
  { name: "Esmaltes", desc: "Sintéticos, al agua y de alta resistencia", count: 45, image: "https://images.unsplash.com/photo-1690743300963-c09faf1d06f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMGNvbG9yJTIwc3dhdGNoZXMlMjBwYWxldHRlfGVufDF8fHx8MTc3NTIzMTM4N3ww&ixlib=rb-4.1.0&q=80&w=1080" },
  { name: "Pisos", desc: "Para cemento, madera y hormigón", count: 23, image: "https://images.unsplash.com/photo-1769173129390-a57de2512782?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMHN0b3JlJTIwc2hlbHZlcyUyMHByb2R1Y3RzfGVufDF8fHx8MTc3NTIzMTY3OXww&ixlib=rb-4.1.0&q=80&w=1080" },
];

const brands = ["Alba", "Tersuave", "Sherwin Williams", "Colorín", "Plavicon", "Duralba"];

const featuredProducts: ProductForModal[] = [
  { id: 1, name: "Latex Interior Satinado 20L", brand: "Alba", price: 48990, image: "https://images.unsplash.com/photo-1763741226847-f5ef0c846506?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMGNhbnMlMjBzdG9yZSUyMGNvbG9yZnVsfGVufDF8fHx8MTc3NTIzMTM4NXww&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: 2, name: "Latex Exterior Frentes 10L", brand: "Tersuave", price: 35900, image: "https://images.unsplash.com/photo-1631061781995-20a7f92437e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleHRlcmlvciUyMHBhaW50JTIwaG91c2UlMjBmYWNhZGV8ZW58MXx8fHwxNzc1MjMxNjgwfDA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: 3, name: "Esmalte Sintético 1L Blanco", brand: "Colorín", price: 9990, image: "https://images.unsplash.com/photo-1690743300963-c09faf1d06f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMGNvbG9yJTIwc3dhdGNoZXMlMjBwYWxldHRlfGVufDF8fHx8MTc3NTIzMTM4N3ww&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: 4, name: "Fijador Sellador x 10L", brand: "Plavicon", price: 15600, image: "https://images.unsplash.com/photo-1769173129390-a57de2512782?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMHN0b3JlJTIwc2hlbHZlcyUyMHByb2R1Y3RzfGVufDF8fHx8MTc3NTIzMTY3OXww&ixlib=rb-4.1.0&q=80&w=1080" },
];

export function PinturasPage() {
  const [selected, setSelected] = useState<ProductForModal | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero banner */}
        <div className="relative rounded-2xl overflow-hidden mb-10 h-48 md:h-64">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1659390825881-b9d0b451f292?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMHBhaW50aW5nJTIwaW50ZXJpb3IlMjB3YWxsfGVufDF8fHx8MTc3NTIzMTM4NXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Pinturas"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center px-8 md:px-12">
            <div>
              <h1 className="text-white text-3xl md:text-4xl" style={{ fontWeight: 700 }}>Pinturas</h1>
              <p className="text-white/80 mt-2 max-w-md">La mejor selección de pinturas para interior, exterior y superficies especiales.</p>
            </div>
          </div>
        </div>

        {/* Subcategories */}
        <h2 className="text-2xl text-gray-800 dark:text-slate-100 mb-6" style={{ fontWeight: 700 }}>Categorías de Pinturas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {subcategories.map(sub => (
            <div key={sub.name} className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer group">
              <div className="h-36 overflow-hidden">
                <ImageWithFallback src={sub.image} alt={sub.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-gray-800 dark:text-slate-200" style={{ fontWeight: 600 }}>{sub.name}</h3>
                  <ChevronRight className="w-4 h-4 text-gray-400 dark:text-slate-500 group-hover:text-[#68b859] transition" />
                </div>
                <p className="text-sm text-gray-500 dark:text-slate-400">{sub.desc}</p>
                <p className="text-xs text-[#68b859] dark:text-[#68b859] mt-2">{sub.count} productos</p>
              </div>
            </div>
          ))}
        </div>

        {/* Brands */}
        <h2 className="text-2xl text-gray-800 dark:text-slate-100 mb-4" style={{ fontWeight: 700 }}>Marcas</h2>
        <div className="flex gap-3 flex-wrap mb-12">
          {brands.map(b => (
            <span key={b} className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-full px-5 py-2 text-sm text-gray-700 dark:text-slate-300 hover:border-[#68b859] hover:text-[#68b859] cursor-pointer transition">
              {b}
            </span>
          ))}
        </div>

        {/* Featured products */}
        <h2 className="text-2xl text-gray-800 dark:text-slate-100 mb-6" style={{ fontWeight: 700 }}>Los más vendidos</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map(p => (
            <div key={p.id} className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group">
              <div className="relative aspect-square bg-gray-100 dark:bg-slate-800 overflow-hidden">
                <ImageWithFallback src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              </div>
              <div className="p-4">
                <p className="text-xs text-[#68b859] mb-1">{p.brand}</p>
                <h3 className="text-sm text-gray-800 dark:text-slate-200 mb-3 line-clamp-2" style={{ fontWeight: 500 }}>{p.name}</h3>
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

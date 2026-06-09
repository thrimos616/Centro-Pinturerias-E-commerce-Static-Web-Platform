import { useState } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ProductSelectionModal, type ProductForModal } from "../figma/ProductSelectionModal";
import { ShoppingCart, Palette, Brush, Sparkles, Frame } from "lucide-react";

const categories = [
  { icon: Palette, name: "Paletas de Color", desc: "Guías y muestrarios para elegir el tono perfecto", count: 34 },
  { icon: Brush, name: "Técnicas Decorativas", desc: "Stencils, sellos y herramientas especiales", count: 48 },
  { icon: Sparkles, name: "Efectos Especiales", desc: "Pinturas con efecto metálico, perlado y glitter", count: 27 },
  { icon: Frame, name: "Papeles y Vinilos", desc: "Empapelados decorativos y vinilos adhesivos", count: 62 },
];

const products: ProductForModal[] = [
  { id: 1, name: "Pintura Efecto Metalizado Dorado 1L", brand: "Rust-Oleum", price: 18900, image: "https://images.unsplash.com/photo-1690743300963-c09faf1d06f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMGNvbG9yJTIwc3dhdGNoZXMlMjBwYWxldHRlfGVufDF8fHx8MTc3NTIzMTM4N3ww&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: 2, name: "Papel Mural Geométrico Gris", brand: "DecoWall", price: 12500, image: "https://images.unsplash.com/photo-1643233948547-b0fbb4368089?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwZGVjb3IlMjBtb2Rlcm4lMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc3NTIzMTY3OXww&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: 3, name: "Kit Stencil Mandala Grande", brand: "DecoArt", price: 7990, image: "https://images.unsplash.com/photo-1770394644068-c1fd69dda1c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWNvcmF0aXZlJTIwd2FsbCUyMHRleHR1cmUlMjBwbGFzdGVyfGVufDF8fHx8MTc3NTIzMTY3OHww&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: 4, name: "Vinilo Adhesivo Mármol 5m", brand: "D-C-Fix", price: 15900, image: "https://images.unsplash.com/photo-1769173129390-a57de2512782?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMHN0b3JlJTIwc2hlbHZlcyUyMHByb2R1Y3RzfGVufDF8fHx8MTc3NTIzMTY3OXww&ixlib=rb-4.1.0&q=80&w=1080" },
];

export function DecoracionPage() {
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
            src="https://images.unsplash.com/photo-1643233948547-b0fbb4368089?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwZGVjb3IlMjBtb2Rlcm4lMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc3NTIzMTY3OXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Decoración"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center px-8 md:px-12">
            <div>
              <h1 className="text-white text-3xl md:text-4xl" style={{ fontWeight: 700 }}>Decoración</h1>
              <p className="text-white/80 mt-2 max-w-md">Transformá tus espacios con efectos, papeles y técnicas decorativas únicas.</p>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {categories.map(c => (
            <div key={c.name} className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm hover:shadow-md transition cursor-pointer group text-center">
              <div className="w-14 h-14 bg-[#68b859]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                <c.icon className="w-7 h-7 text-[#68b859] dark:text-[#68b859]" />
              </div>
              <h3 className="text-gray-800 dark:text-slate-200 mb-1" style={{ fontWeight: 600 }}>{c.name}</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400 mb-2">{c.desc}</p>
              <p className="text-xs text-[#68b859] dark:text-[#68b859]">{c.count} productos</p>
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

import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ShoppingCart, SlidersHorizontal, Grid3X3, List, X, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useCart } from "../../context/CartContext";

const PAINT_TYPES = ["Mate", "Satinado", "Semi-brillante", "Brillante", "Texturado"];
const CAN_SIZES = ["1L", "4L", "10L", "20L"];
const filters = ["Todas", "Pinturas", "Revestimientos", "Accesorios", "Impermeabilizantes", "Decoración", "Herramientas"];

const products = [
  { id: 1, name: "Latex Interior", brand: "Alba", price: 45990, oldPrice: 52990, category: "Pinturas", image: "https://images.unsplash.com/photo-1763741226847-f5ef0c846506?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMGNhbnMlMjBzdG9yZSUyMGNvbG9yZnVsfGVufDF8fHx8MTc3NTIzMTM4NXww&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: 2, name: "Esmalte Sintético Brillante", brand: "Tersuave", price: 28500, oldPrice: null, category: "Pinturas", image: "https://images.unsplash.com/photo-1690743300963-c09faf1d06f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMGNvbG9yJTIwc3dhdGNoZXMlMjBwYWxldHRlfGVufDF8fHx8MTc3NTIzMTM4N3ww&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: 3, name: "Kit Rodillo + Bandeja Pro", brand: "Prestigio", price: 12990, oldPrice: 15990, category: "Accesorios", image: "https://images.unsplash.com/photo-1516962080544-eac695c93791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMHJvbGxlciUyMGJydXNoJTIwdG9vbHN8ZW58MXx8fHwxNzc1MjIzNTkyfDA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: 4, name: "Impermeabilizante Techos", brand: "Duralba", price: 38750, oldPrice: 44900, category: "Impermeabilizantes", image: "https://images.unsplash.com/photo-1723056347299-893ec22e809f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcnByb29mJTIwY29hdGluZyUyMHdhbGwlMjBleHRlcmlvcnxlbnwxfHx8fDE3NzUyMzEzODd8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: 5, name: "Revestimiento Texturado Fino", brand: "Weber", price: 32400, oldPrice: null, category: "Revestimientos", image: "https://images.unsplash.com/photo-1770394644068-c1fd69dda1c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWNvcmF0aXZlJTIwd2FsbCUyMHRleHR1cmUlMjBwbGFzdGVyfGVufDF8fHx8MTc3NTIzMTY3OHww&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: 6, name: "Pintura para Pisos Gris", brand: "Colorín", price: 18990, oldPrice: 22900, category: "Pinturas", image: "https://images.unsplash.com/photo-1769173129390-a57de2512782?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMHN0b3JlJTIwc2hlbHZlcyUyMHByb2R1Y3RzfGVufDF8fHx8MTc3NTIzMTY3OXww&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: 7, name: "Fijador Sellador", brand: "Plavicon", price: 27600, oldPrice: null, category: "Pinturas", image: "https://images.unsplash.com/photo-1631061781995-20a7f92437e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleHRlcmlvciUyMHBhaW50JTIwaG91c2UlMjBmYWNhZGV8ZW58MXx8fHwxNzc1MjMxNjgwfDA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: 8, name: "Stencil Decorativo Pack x6", brand: "DecoArt", price: 5490, oldPrice: 6990, category: "Decoración", image: "https://images.unsplash.com/photo-1643233948547-b0fbb4368089?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwZGVjb3IlMjBtb2Rlcm4lMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc3NTIzMTY3OXww&ixlib=rb-4.1.0&q=80&w=1080" },
];

type Product = typeof products[number];

interface SelectionModalProps {
  product: Product | null;
  onClose: () => void;
  onAdd: (msg: string) => void;
}

function ProductSelectionModal({ product, onClose, onAdd }: SelectionModalProps) {
  const { addItem } = useCart();
  const [paintType, setPaintType] = useState(PAINT_TYPES[0]);
  const [canSize, setCanSize] = useState(CAN_SIZES[1]);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAdd = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      brand: product.brand,
      paintType,
      canSize,
      pricePerUnit: product.price,
      quantity,
    });
    onAdd(`${product.name} agregado al carrito`);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-[1px]" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm mx-4 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden animate-scale-in border border-transparent dark:border-slate-800">
        {/* Product info */}
        <div className="flex items-center gap-4 p-5 border-b border-gray-100 dark:border-slate-800">
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-800 flex-shrink-0">
            <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-[#68b859] dark:text-[#68b859]">{product.brand}</p>
            <h3 className="text-sm text-gray-900 dark:text-slate-100 leading-tight" style={{ fontWeight: 700 }}>{product.name}</h3>
            <p className="text-base text-gray-900 dark:text-slate-100 mt-1" style={{ fontWeight: 700 }}>${product.price.toLocaleString()}<span className="text-xs text-gray-400 dark:text-slate-500 font-normal ml-1">/ lata</span></p>
          </div>
          <button onClick={onClose} className="text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-gray-300 transition self-start">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selectors */}
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs text-gray-600 dark:text-slate-400 mb-1.5" style={{ fontWeight: 600 }}>Tipo de pintura</label>
            <div className="flex flex-wrap gap-2">
              {PAINT_TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setPaintType(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs border transition ${paintType === t ? "border-[#68b859] bg-[#68b859]/10 text-[#68b859] dark:text-[#68b859]" : "border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:border-[#68b859] dark:hover:border-[#68b859]"}`}
                  style={{ fontWeight: paintType === t ? 600 : 400 }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-600 dark:text-slate-400 mb-1.5" style={{ fontWeight: 600 }}>Capacidad de la lata</label>
            <div className="flex gap-2">
              {CAN_SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setCanSize(s)}
                  className={`flex-1 py-2 rounded-lg text-xs border transition ${canSize === s ? "border-[#68b859] bg-[#68b859]/10 text-[#68b859] dark:text-[#68b859]" : "border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:border-[#68b859] dark:hover:border-[#68b859]"}`}
                  style={{ fontWeight: canSize === s ? 600 : 400 }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-600 dark:text-slate-400 mb-1.5" style={{ fontWeight: 600 }}>Cantidad de latas</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-lg border border-gray-200 dark:border-slate-700 flex items-center justify-center text-gray-600 dark:text-slate-400 hover:border-[#68b859] dark:hover:border-[#68b859] hover:text-[#68b859] dark:hover:text-[#68b859] transition"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-lg w-8 text-center dark:text-slate-200" style={{ fontWeight: 700 }}>{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-9 h-9 rounded-lg border border-gray-200 dark:border-slate-700 flex items-center justify-center text-gray-600 dark:text-slate-400 hover:border-[#68b859] dark:hover:border-[#68b859] hover:text-[#68b859] dark:hover:text-[#68b859] transition"
              >
                <Plus className="w-4 h-4" />
              </button>
              <span className="text-sm text-gray-500 dark:text-slate-400 ml-2">= <strong className="text-gray-800 dark:text-slate-200">${(product.price * quantity).toLocaleString()}</strong></span>
            </div>
          </div>

          <button
            onClick={handleAdd}
            className="w-full bg-[#68b859] text-white py-3 rounded-xl text-sm hover:bg-[#5a9918] transition flex items-center justify-center gap-2"
            style={{ fontWeight: 700 }}
          >
            <ShoppingCart className="w-4 h-4" />
            Agregar al carrito
          </button>
        </div>
      </div>

      <style>{`
        @keyframes scale-in {
          from { transform: translate(-50%, -48%) scale(0.97); opacity: 0; }
          to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.18s cubic-bezier(0.32, 0.72, 0, 1);
        }
      `}</style>
    </>
  );
}

export function TiendaPage() {
  const [activeFilter, setActiveFilter] = useState("Todas");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const filtered = activeFilter === "Todas" ? products : products.filter((p) => p.category === activeFilter);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl text-gray-800 dark:text-slate-100" style={{ fontWeight: 700 }}>Tienda</h1>
            <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">Elegí tipo, tamaño y cantidad de tus pinturas</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg transition ${viewMode === "grid" ? "bg-[#68b859] text-white" : "bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400"}`}>
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg transition ${viewMode === "list" ? "bg-[#68b859] text-white" : "bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400"}`}>
              <List className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 bg-gray-100 dark:bg-slate-800 px-4 py-2 rounded-lg text-sm text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition">
              <SlidersHorizontal className="w-4 h-4" /> Filtros
            </button>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex-shrink-0 px-5 py-2 rounded-full text-sm transition ${activeFilter === f ? "bg-[#68b859] text-white" : "bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:border-[#68b859] dark:hover:border-[#68b859]"}`}
            >
              {f}
            </button>
          ))}
        </div>

        <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">{filtered.length} productos encontrados</p>

        {/* Products */}
        <div className={viewMode === "grid" ? "grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6" : "flex flex-col gap-4"}>
          {filtered.map((p) =>
            viewMode === "grid" ? (
              <div key={p.id} className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group">
                <div className="relative aspect-square bg-gray-100 dark:bg-slate-800 overflow-hidden">
                  <ImageWithFallback src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  {p.oldPrice && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      -{Math.round((1 - p.price / p.oldPrice) * 100)}%
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs text-[#68b859] dark:text-[#68b859] mb-1">{p.brand}</p>
                  <h3 className="text-sm text-gray-800 dark:text-slate-200 mb-2 line-clamp-2" style={{ fontWeight: 500 }}>{p.name}</h3>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-lg text-gray-900 dark:text-slate-100" style={{ fontWeight: 700 }}>${p.price.toLocaleString()}</span>
                    {p.oldPrice && <span className="text-xs text-gray-400 dark:text-slate-500 line-through">${p.oldPrice.toLocaleString()}</span>}
                  </div>
                  <button
                    onClick={() => setSelectedProduct(p)}
                    className="w-full bg-[#68b859] text-white text-sm py-2 rounded-lg hover:bg-[#5a9918] transition flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" /> Agregar
                  </button>
                </div>
              </div>
            ) : (
              <div key={p.id} className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex gap-4 p-4">
                <div className="w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-slate-800">
                  <ImageWithFallback src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-[#68b859] dark:text-[#68b859]">{p.brand}</p>
                    <h3 className="text-sm text-gray-800 dark:text-slate-200" style={{ fontWeight: 500 }}>{p.name}</h3>
                    <p className="text-xs text-gray-400 dark:text-slate-500">{p.category}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg text-gray-900 dark:text-slate-100" style={{ fontWeight: 700 }}>${p.price.toLocaleString()}</span>
                      {p.oldPrice && <span className="text-xs text-gray-400 dark:text-slate-500 line-through">${p.oldPrice.toLocaleString()}</span>}
                    </div>
                    <button
                      onClick={() => setSelectedProduct(p)}
                      className="bg-[#68b859] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#5a9918] transition flex items-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" /> Agregar
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Product selection modal */}
      <ProductSelectionModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAdd={showToast}
      />

      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] bg-gray-900 text-white text-sm px-5 py-3 rounded-full shadow-lg flex items-center gap-2 animate-toast">
          <ShoppingCart className="w-4 h-4 text-green-400" />
          {toast}
        </div>
      )}

      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateX(-50%) translateY(16px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .animate-toast {
          animation: toast-in 0.2s ease;
        }
      `}</style>
    </div>
  );
}

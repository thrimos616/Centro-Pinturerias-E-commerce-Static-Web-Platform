import { useState } from "react";
import { X, ShoppingCart, Plus, Minus } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { ImageWithFallback } from "./ImageWithFallback";

const PAINT_TYPES = ["Mate", "Satinado", "Semi-brillante", "Brillante", "Texturado"];
const CAN_SIZES = ["1L", "4L", "10L", "20L"];

export interface ProductForModal {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
}

interface ProductSelectionModalProps {
  product: ProductForModal | null;
  onClose: () => void;
  onAdd: (msg: string) => void;
}

export function ProductSelectionModal({ product, onClose, onAdd }: ProductSelectionModalProps) {
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
            <p className="text-base text-gray-900 dark:text-slate-100 mt-1" style={{ fontWeight: 700 }}>
              ${product.price.toLocaleString()}<span className="text-xs text-gray-400 dark:text-slate-500 font-normal ml-1">/ lata</span>
            </p>
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

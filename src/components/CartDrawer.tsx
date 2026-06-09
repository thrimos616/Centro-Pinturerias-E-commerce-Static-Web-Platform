import { useState } from "react";
import { Minus, Plus, Trash2, X, Truck, ShieldCheck } from "lucide-react";
import { useCart } from "../context/CartContext";
import { OrderConfirmDialog } from "./OrderConfirmDialog";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, totalItems, removeItem, updateQuantity } = useCart();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const subtotal = items.reduce((sum, i) => sum + i.pricePerUnit * i.quantity, 0);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40 backdrop-blur-[1px]"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-slate-900 z-50 flex flex-col shadow-2xl animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-transparent dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center gap-2">
            <h2 className="text-lg text-gray-800 dark:text-slate-100" style={{ fontWeight: 700 }}>
              Mi carrito
            </h2>
            {totalItems > 0 && (
              <span className="bg-[#68b859] text-white text-xs rounded-full px-2 py-0.5">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 dark:text-slate-500 gap-3 py-16">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-gray-300 dark:text-slate-600" />
              </div>
              <p className="text-sm">Tu carrito está vacío</p>
              <button
                onClick={onClose}
                className="text-[#68b859] text-sm underline"
              >
                Seguir comprando
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 bg-gray-50 dark:bg-slate-800 rounded-xl p-4"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#68b859] dark:text-[#68b859] mb-0.5">{item.brand}</p>
                  <p
                    className="text-sm text-gray-800 dark:text-slate-200 leading-tight"
                    style={{ fontWeight: 600 }}
                  >
                    {item.productName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                    {item.paintType} · {item.canSize}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-slate-300 mt-2" style={{ fontWeight: 700 }}>
                    ${(item.pricePerUnit * item.quantity).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 dark:text-slate-500 hover:text-red-500 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-2 bg-white dark:bg-slate-700 border border-transparent dark:border-slate-600 rounded-lg px-2 py-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="text-gray-500 dark:text-slate-400 hover:text-[#68b859] dark:hover:text-[#68b859] transition"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm w-5 text-center dark:text-slate-200" style={{ fontWeight: 600 }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-gray-500 hover:text-[#68b859] transition"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-4 border-t border-transparent dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            {/* Free shipping banner */}
            <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-xl px-4 py-3">
              <Truck className="w-4 h-4 text-green-600 dark:text-green-500 flex-shrink-0" />
              <p className="text-xs text-green-700 dark:text-green-400" style={{ fontWeight: 500 }}>
                🎉 ¡Envío gratis si vivís en el Partido de Olavarría!
              </p>
            </div>
 
            {/* Pre-purchase disclaimer */}
            <div className="flex items-start gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl px-4 py-3">
              <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 dark:text-amber-400" style={{ fontWeight: 500 }}>
                Esta página <strong>no te cobra nada</strong>. Solo estás haciendo un pedido. La pinturería se va a contactar con vos para coordinar el pago.
              </p>
            </div>

            {/* Subtotal */}
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600 dark:text-slate-400">Subtotal</span>
              <span className="text-lg text-gray-900 dark:text-slate-100" style={{ fontWeight: 700 }}>
                ${subtotal.toLocaleString()}
              </span>
            </div>

            <button
              onClick={() => setConfirmOpen(true)}
              className="w-full bg-[#68b859] text-white py-3.5 rounded-xl text-sm hover:bg-[#5a9918] transition"
              style={{ fontWeight: 700 }}
            >
              Confirmar pedido
            </button>
          </div>
        )}
      </div>

      <OrderConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onOrderComplete={() => {
          setConfirmOpen(false);
          onClose();
        }}
        items={items}
        subtotal={subtotal}
      />

      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.25s cubic-bezier(0.32,0.72,0,1);
        }
      `}</style>
    </>
  );
}

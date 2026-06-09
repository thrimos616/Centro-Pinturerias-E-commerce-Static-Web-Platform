import { useState } from "react";
import { CheckCircle, Package, MessageCircle, Mail, X } from "lucide-react";
import { useCart, type CartItem } from "../context/CartContext";

interface OrderConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onOrderComplete: () => void;
  items: CartItem[];
  subtotal: number;
}

type Step = "form" | "success";

const WHATSAPP_NUMBER = "5492284300019";
const STORE_EMAIL = "centropinturerias@gmail.com"; // placeholder — adjust as needed

function buildWhatsAppMessage(
  name: string,
  phone: string,
  items: CartItem[],
  subtotal: number
): string {
  const lines: string[] = [
    `🛒 *Nuevo pedido de ${name}${phone ? ` | Tel: ${phone}` : ""}*`,
    "",
    "*Detalle del pedido:*",
    ...items.map(
      (i) =>
        `• ${i.productName} (${i.brand}) — ${i.paintType}, ${i.canSize} x${i.quantity} lata${i.quantity > 1 ? "s" : ""} = $${(i.pricePerUnit * i.quantity).toLocaleString()}`
    ),
    "",
    `*Total: $${subtotal.toLocaleString()}*`,
    "",
    "Estado: ⏳ Pendiente de pago",
  ];
  return encodeURIComponent(lines.join("\n"));
}

function buildEmailBody(
  name: string,
  items: CartItem[],
  subtotal: number
): string {
  const lines: string[] = [
    `Hola ${name},`,
    "",
    "¡Gracias por tu pedido en Centro Pinturerias! Acá tenés el resumen:",
    "",
    "--- DETALLE DEL PEDIDO ---",
    ...items.map(
      (i) =>
        `• ${i.productName} (${i.brand}) — ${i.paintType}, ${i.canSize} x${i.quantity} lata${i.quantity > 1 ? "s" : ""} = $${(i.pricePerUnit * i.quantity).toLocaleString()}`
    ),
    "",
    `TOTAL: $${subtotal.toLocaleString()}`,
    "",
    "ESTADO: ⏳ Pendiente de pago",
    "",
    "La pinturería se va a comunicar con vos para coordinar el pago.",
    "Una vez confirmado el pago, estate atento para recibir tu pedido.",
    "",
    "¡Muchas gracias!",
    "Centro Pinturerias — Olavarría",
  ];
  return encodeURIComponent(lines.join("\n"));
}

export function OrderConfirmDialog({
  open,
  onClose,
  onOrderComplete,
  items,
  subtotal,
}: OrderConfirmDialogProps) {
  const { clearCart } = useCart();
  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  if (!open) return null;

  const validate = () => {
    const e: { name?: string; email?: string } = {};
    if (!name.trim()) e.name = "Ingresá tu nombre";
    if (!email.trim() || !email.includes("@")) e.email = "Ingresá un email válido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStep("success");
    clearCart();

    // Open WhatsApp
    const waMsg = buildWhatsAppMessage(name, phone, items, subtotal);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`, "_blank");

    // Open mailto
    const subject = encodeURIComponent(`Pedido de ${name} — Centro Pinturerias`);
    const body = buildEmailBody(name, items, subtotal);
    window.open(`mailto:${email}?subject=${subject}&body=${body}`);
  };

  const handleClose = () => {
    setStep("form");
    setName("");
    setEmail("");
    setPhone("");
    setErrors({});
    onClose();
  };

  const handleComplete = () => {
    setStep("form");
    setName("");
    setEmail("");
    setPhone("");
    setErrors({});
    onOrderComplete();
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-[2px]" onClick={step === "success" ? handleComplete : handleClose} />

      {/* Dialog */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-full max-w-md mx-4 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl animate-scale-in overflow-hidden border border-transparent dark:border-slate-800">
        {step === "form" ? (
          <>
            {/* Form Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100 dark:border-slate-800">
              <div>
                <h3 className="text-lg text-gray-900 dark:text-slate-100" style={{ fontWeight: 700 }}>
                  Confirmar pedido
                </h3>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
                  Completá tus datos para hacer el pedido
                </p>
              </div>
              <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Order summary */}
            <div className="px-6 py-3 bg-gray-50 dark:bg-slate-800/50 border-b border-transparent dark:border-slate-800">
              <p className="text-xs text-gray-500 dark:text-slate-400 mb-2" style={{ fontWeight: 600 }}>
                RESUMEN
              </p>
              {items.map((i) => (
                <div key={i.id} className="flex justify-between text-xs text-gray-600 dark:text-slate-300 py-0.5">
                  <span>{i.productName} ({i.paintType}, {i.canSize}) x{i.quantity}</span>
                  <span>${(i.pricePerUnit * i.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm text-gray-900 dark:text-slate-100 pt-2 mt-1 border-t border-gray-200 dark:border-slate-700" style={{ fontWeight: 700 }}>
                <span>Total</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-xs text-gray-600 dark:text-slate-400 mb-1" style={{ fontWeight: 600 }}>
                  Nombre completo *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Juan García"
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none transition focus:border-[#68b859] dark:focus:border-[#68b859] focus:ring-1 focus:ring-[#68b859]/30 dark:focus:ring-[#68b859]/30 dark:bg-slate-800 dark:text-slate-200 ${errors.name ? "border-red-400 dark:border-red-500" : "border-gray-200 dark:border-slate-700"}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-xs text-gray-600 dark:text-slate-400 mb-1" style={{ fontWeight: 600 }}>
                  Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none transition focus:border-[#68b859] dark:focus:border-[#68b859] focus:ring-1 focus:ring-[#68b859]/30 dark:focus:ring-[#68b859]/30 dark:bg-slate-800 dark:text-slate-200 ${errors.email ? "border-red-400 dark:border-red-500" : "border-gray-200 dark:border-slate-700"}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">Te vamos a mandar el resumen del pedido por email.</p>
              </div>
              <div>
                <label className="block text-xs text-gray-600 dark:text-slate-400 mb-1" style={{ fontWeight: 600 }}>
                  Teléfono <span className="text-gray-400 dark:text-slate-500">(opcional)</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ej: 2284 123456"
                  className="w-full border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm outline-none transition focus:border-[#68b859] dark:focus:border-[#68b859] focus:ring-1 focus:ring-[#68b859]/30 dark:focus:ring-[#68b859]/30 dark:bg-slate-800 dark:text-slate-200"
                />
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 py-3 rounded-xl text-sm hover:bg-gray-50 dark:hover:bg-slate-800 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#68b859] text-white py-3 rounded-xl text-sm hover:bg-[#5a9918] transition"
                  style={{ fontWeight: 700 }}
                >
                  Hacer pedido
                </button>
              </div>
            </form>
          </>
        ) : (
          /* Success screen */
          <div className="px-6 py-8 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle className="w-9 h-9 text-green-600 dark:text-green-500" />
            </div>
            <div>
              <h3 className="text-xl text-gray-900 dark:text-slate-100 mb-2" style={{ fontWeight: 700 }}>
                ¡Pedido realizado!
              </h3>
              <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                Tu pedido está <strong>pendiente de pago</strong>. La pinturería se va a comunicar con vos para coordinar el pago.
              </p>
            </div>

            <div className="w-full bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl p-4 text-left">
              <div className="flex items-start gap-2">
                <Package className="w-4 h-4 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700 dark:text-amber-400" style={{ fontWeight: 500 }}>
                  Una vez confirmado el pago, <strong>estate atento</strong> para recibir tu pintura.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full text-xs text-gray-400 dark:text-slate-500">
              <div className="flex items-center gap-2 justify-center">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Se abrió WhatsApp con el pedido para la pinturería</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <Mail className="w-3.5 h-3.5" />
                <span>Se abrió tu correo con el resumen del pedido</span>
              </div>
            </div>

            <button
              onClick={handleComplete}
              className="w-full bg-[#68b859] text-white py-3 rounded-xl text-sm hover:bg-[#5a9918] transition mt-2"
              style={{ fontWeight: 700 }}
            >
              Listo
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scale-in {
          from { transform: translate(-50%, -48%) scale(0.96); opacity: 0; }
          to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.2s cubic-bezier(0.32, 0.72, 0, 1);
        }
      `}</style>
    </>
  );
}

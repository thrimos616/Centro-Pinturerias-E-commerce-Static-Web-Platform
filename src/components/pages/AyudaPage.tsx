import { useState } from "react";
import { ChevronDown, ChevronUp, Phone, Mail, MessageCircle, MapPin, Calculator, HelpCircle } from "lucide-react";

const faqs = [
  { q: "¿Cuánta pintura necesito para mi ambiente?", a: "Calculá la superficie a pintar (largo x alto de cada pared) y dividí por el rendimiento del producto (indicado en el envase). Para latex interior estándar, un balde de 20L rinde aproximadamente 100-120m² por mano." },
  { q: "¿Cuántas manos de pintura debo aplicar?", a: "En general se recomiendan 2 manos como mínimo. Si el color anterior es oscuro y estás pintando con un color claro, podrías necesitar 3 manos. Siempre aplicar primero fijador sellador." },
  { q: "¿Cuál es la diferencia entre latex interior y exterior?", a: "Las pinturas de exterior contienen resinas más resistentes a la intemperie, rayos UV y humedad. No usar pintura de interior en exteriores, ya que se degradará rápidamente." },
  { q: "¿Hacen envíos a domicilio?", a: "Sí, realizamos envíos a todo el país. Envíos gratis en compras mayores a $50.000. Para compras menores, el costo de envío se calcula según la zona." },
  { q: "¿Puedo devolver un producto si no me gusta el color?", a: "Sí, aceptamos devoluciones dentro de los 30 días de compra, siempre que el producto esté sin abrir y en su envase original." },
  { q: "¿Realizan presupuestos para obras?", a: "Sí, nuestro equipo técnico puede realizar un presupuesto personalizado para tu obra. Contactanos por WhatsApp o acercate a cualquiera de nuestras sucursales." },
  { q: "¿Qué métodos de pago aceptan?", a: "Aceptamos efectivo, débito, crédito (hasta 12 cuotas sin interés según el banco), transferencia bancaria y Mercado Pago." },
];

// Yield per litre for common paint types (m² per litre, per coat)
const RENDIMIENTO_M2_POR_LITRO: Record<string, number> = {
  "Latex interior": 6,
  "Latex exterior": 5,
  "Esmalte sintético": 10,
  "Esmalte al agua": 9,
  "Impermeabilizante": 4,
  "Fijador sellador": 8,
};

const TAMAÑOS_ENVASE = [
  { label: "1 L", litros: 1 },
  { label: "4 L", litros: 4 },
  { label: "10 L", litros: 10 },
  { label: "20 L", litros: 20 },
];

function PaintCalculator() {
  const [ancho, setAncho] = useState("");
  const [alto, setAlto] = useState("");
  const [manos, setManos] = useState(2);
  const [tipoPintura, setTipoPintura] = useState("Latex interior");
  const [resultado, setResultado] = useState<null | {
    superficieTotal: number;
    litrosNecesarios: number;
    envases: { label: string; unidades: number }[];
  }>(null);

  const calcular = () => {
    const a = parseFloat(ancho);
    const h = parseFloat(alto);
    if (!a || !h || a <= 0 || h <= 0) return;
    const superficie = a * h;
    const rendimiento = RENDIMIENTO_M2_POR_LITRO[tipoPintura];
    const litros = (superficie * manos) / rendimiento;

    const envases = TAMAÑOS_ENVASE.map((e) => ({
      label: e.label,
      unidades: Math.ceil(litros / e.litros),
    }));

    setResultado({ superficieTotal: superficie, litrosNecesarios: litros, envases });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 overflow-hidden">
      <div className="bg-[#68b859] px-6 py-4">
        <div className="flex items-center gap-3">
          <Calculator className="w-6 h-6 text-white" />
          <h2 className="text-xl text-white" style={{ fontWeight: 700 }}>Calculadora de Pintura</h2>
        </div>
        <p className="text-white/75 text-sm mt-1">Calculá cuánta pintura necesitás para tu proyecto</p>
      </div>

      <div className="p-6 space-y-5">
        {/* Surface inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-600 dark:text-slate-400 mb-1.5" style={{ fontWeight: 600 }}>
              Ancho total de paredes (m)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              placeholder="ej: 12.5"
              value={ancho}
              onChange={(e) => { setAncho(e.target.value); setResultado(null); }}
              className="w-full border border-gray-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-slate-200 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-[#68b859]/40"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 dark:text-slate-400 mb-1.5" style={{ fontWeight: 600 }}>
              Alto de paredes (m)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              placeholder="ej: 2.6"
              value={alto}
              onChange={(e) => { setAlto(e.target.value); setResultado(null); }}
              className="w-full border border-gray-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-slate-200 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-[#68b859]/40"
            />
          </div>
        </div>

        {/* Paint type */}
        <div>
          <label className="block text-xs text-gray-600 dark:text-slate-400 mb-1.5" style={{ fontWeight: 600 }}>
            Tipo de pintura
          </label>
          <select
            value={tipoPintura}
            onChange={(e) => { setTipoPintura(e.target.value); setResultado(null); }}
            className="w-full border border-gray-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-slate-200 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-[#68b859]/40"
          >
            {Object.keys(RENDIMIENTO_M2_POR_LITRO).map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Coats */}
        <div>
          <label className="block text-xs text-gray-600 dark:text-slate-400 mb-1.5" style={{ fontWeight: 600 }}>
            Cantidad de manos: <span className="text-[#68b859]">{manos}</span>
          </label>
          <div className="flex gap-2">
            {[1, 2, 3].map((m) => (
              <button
                key={m}
                onClick={() => { setManos(m); setResultado(null); }}
                className={`flex-1 py-2 rounded-lg text-sm border transition ${manos === m ? "border-[#68b859] bg-[#68b859]/10 text-[#68b859] dark:text-[#68b859]" : "border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:border-[#68b859]"}`}
                style={{ fontWeight: manos === m ? 600 : 400 }}
              >
                {m} {m === 1 ? "mano" : "manos"}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={calcular}
          disabled={!ancho || !alto}
          className="w-full bg-[#68b859] disabled:opacity-50 text-white py-3 rounded-xl text-sm hover:bg-[#5a9918] transition flex items-center justify-center gap-2"
          style={{ fontWeight: 700 }}
        >
          <Calculator className="w-4 h-4" />
          Calcular
        </button>

        {/* Result */}
        {resultado && (
          <div className="bg-[#68b859]/5 dark:bg-[#68b859]/10 border border-[#68b859]/20 dark:border-[#68b859]/30 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-slate-400">Superficie total</p>
                <p className="text-2xl text-[#68b859] dark:text-[#68b859]" style={{ fontWeight: 700 }}>
                  {resultado.superficieTotal.toFixed(1)} m²
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 dark:text-slate-400">Litros necesarios</p>
                <p className="text-2xl text-[#68b859] dark:text-[#68b859]" style={{ fontWeight: 700 }}>
                  {resultado.litrosNecesarios.toFixed(1)} L
                </p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-slate-400 mb-2" style={{ fontWeight: 600 }}>
                ¿Cuántos envases necesito?
              </p>
              <div className="grid grid-cols-4 gap-2">
                {resultado.envases.map((e) => (
                  <div key={e.label} className="bg-white dark:bg-slate-800 rounded-lg p-3 text-center border border-gray-100 dark:border-slate-700">
                    <p className="text-lg text-gray-900 dark:text-slate-100" style={{ fontWeight: 700 }}>{e.unidades}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400">de {e.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
              💡 Se recomienda comprar un 10-15% extra para retoques. El rendimiento puede variar según la porosidad de la superficie.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function AyudaPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl text-gray-800 dark:text-slate-100" style={{ fontWeight: 700 }}>Centro de Ayuda</h1>
          <p className="text-gray-500 dark:text-slate-400 mt-2 max-w-lg mx-auto">Encontrá respuestas a las preguntas más frecuentes y herramientas útiles para tus proyectos.</p>
        </div>

        {/* Quick tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <div className="bg-[#68b859]/5 dark:bg-[#68b859]/10 border border-[#68b859]/20 dark:border-[#68b859]/30 rounded-xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-[#68b859] rounded-xl flex items-center justify-center flex-shrink-0">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-gray-800 dark:text-slate-200" style={{ fontWeight: 600 }}>Calculadora de Pintura</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400">Calculá cuánta pintura necesitás para tu ambiente. Disponible más abajo ↓</p>
            </div>
          </div>
          <a href="/pinturas" className="bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-xl p-5 flex items-center gap-4 hover:border-[#68b859] dark:hover:border-[#68b859] transition cursor-pointer group">
            <div className="w-12 h-12 bg-gray-200 dark:bg-slate-700 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#68b859]/10 transition">
              <HelpCircle className="w-6 h-6 text-gray-500 dark:text-slate-400 group-hover:text-[#68b859] dark:group-hover:text-[#68b859] transition" />
            </div>
            <div>
              <h3 className="text-gray-800 dark:text-slate-200" style={{ fontWeight: 600 }}>Guía de Productos</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400">Encontrá el producto ideal para cada superficie</p>
            </div>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* FAQs */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl text-gray-800 dark:text-slate-100 mb-6" style={{ fontWeight: 700 }}>Preguntas Frecuentes</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 overflow-hidden text-left">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="text-gray-800 dark:text-slate-200 text-sm pr-4" style={{ fontWeight: 500 }}>{faq.q}</span>
                    {openFaq === i ? <ChevronUp className="w-5 h-5 text-[#68b859] flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 dark:text-slate-500 flex-shrink-0" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-sm text-gray-500 dark:text-slate-400 border-t border-gray-50 dark:border-slate-800/50 pt-3 text-left">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact sidebar */}
          <div>
            <h2 className="text-2xl text-gray-800 dark:text-slate-100 mb-6" style={{ fontWeight: 700 }}>Contactanos</h2>
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 p-6 space-y-5">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#68b859] mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-slate-400">Teléfono</p>
                  <p className="text-gray-800 dark:text-slate-200" style={{ fontWeight: 500 }}>+54 9 2284 30-0019</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-[#25D366] mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-slate-400">WhatsApp</p>
                  <p className="text-gray-800 dark:text-slate-200" style={{ fontWeight: 500 }}>+54 9 2284 30-0019</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#68b859] mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-slate-400">Email</p>
                  <p className="text-gray-800 dark:text-slate-200" style={{ fontWeight: 500 }}>ayuda@centropinturerias.com.ar</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#68b859] mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-slate-400">Horario de atención</p>
                  <p className="text-gray-800 dark:text-slate-200" style={{ fontWeight: 500 }}>Lun a Vie 8 a 18hs</p>
                  <p className="text-gray-800 dark:text-slate-200" style={{ fontWeight: 500 }}>Sáb 8 a 13hs</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Paint Calculator section */}
        <PaintCalculator />
      </div>
    </div>
  );
}

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle, MessageCircle, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";

// ─── EmailJS Config ──────────────────────────────────────────────────────────
// 1. Crear cuenta gratis en https://www.emailjs.com
// 2. Crear un "Email Service" (Gmail, Outlook, etc.) y copiar el Service ID
// 3. Crear un "Email Template" con las variables: {{nombre}}, {{apellido}},
//    {{email}}, {{telefono}}, {{asunto}}, {{mensaje}}
// 4. Copiar el Public Key desde Account > API Keys
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";   // ← reemplazar
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";  // ← reemplazar
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";   // ← reemplazar

const IS_CONFIGURED =
  !EMAILJS_SERVICE_ID.startsWith("YOUR_") &&
  !EMAILJS_TEMPLATE_ID.startsWith("YOUR_") &&
  !EMAILJS_PUBLIC_KEY.startsWith("YOUR_");
// ─────────────────────────────────────────────────────────────────────────────

const contactInfo = [
  { icon: MapPin,  label: "Dirección", value: "Olavarría, Buenos Aires, Argentina" },
  { icon: Phone,   label: "Teléfono",  value: "+54 9 2284 30-0019" },
  { icon: Mail,    label: "Email",     value: "info@centropinturerias.com.ar" },
  { icon: Clock,   label: "Horarios",  value: "Lun a Vie 8–18hs | Sáb 8–13hs" },
];

const WHATSAPP_NUMBER = "5492284300019";

type FormState = {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  asunto: string;
  mensaje: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const asuntos = [
  "Consulta de producto",
  "Pedido / Cotización",
  "Envíos y logística",
  "Garantía o reclamo",
  "Sucursales",
  "Otro",
];

function validate(data: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!data.nombre.trim())   errors.nombre   = "El nombre es obligatorio";
  if (!data.apellido.trim()) errors.apellido = "El apellido es obligatorio";
  if (!data.email.trim()) {
    errors.email = "El email es obligatorio";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Ingresá un email válido";
  }
  if (!data.asunto)  errors.asunto  = "Seleccioná un asunto";
  if (!data.mensaje.trim()) {
    errors.mensaje = "El mensaje es obligatorio";
  } else if (data.mensaje.trim().length < 10) {
    errors.mensaje = "El mensaje debe tener al menos 10 caracteres";
  }
  return errors;
}

const EMPTY_FORM: FormState = { nombre: "", apellido: "", email: "", telefono: "", asunto: "", mensaje: "" };

export function Contact() {
  const [form,     setForm]     = useState<FormState>(EMPTY_FORM);
  const [errors,   setErrors]   = useState<FormErrors>({});
  const [touched,  setTouched]  = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [status,   setStatus]   = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name as keyof FormState]) {
      const newErrors = validate({ ...form, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormState] }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate(form);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormState] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allTouched = Object.keys(form).reduce(
      (acc, k) => ({ ...acc, [k]: true }),
      {} as Record<keyof FormState, boolean>
    );
    setTouched(allTouched);
    const newErrors = validate(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    if (!IS_CONFIGURED) {
      // Fallback: open mailto when EmailJS is not yet configured
      const subject = encodeURIComponent(`[Centro Pinturerias] ${form.asunto}`);
      const body = encodeURIComponent(
        `Nombre: ${form.nombre} ${form.apellido}\n` +
        `Email: ${form.email}\n` +
        (form.telefono ? `Teléfono: ${form.telefono}\n` : "") +
        `Asunto: ${form.asunto}\n\nMensaje:\n${form.mensaje}`
      );
      window.location.href = `mailto:info@centropinturerias.com.ar?subject=${subject}&body=${body}`;
      setStatus("success");
      return;
    }

    setStatus("loading");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          nombre:   form.nombre,
          apellido: form.apellido,
          email:    form.email,
          telefono: form.telefono || "No informado",
          asunto:   form.asunto,
          mensaje:  form.mensaje,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setForm(EMPTY_FORM);
      setTouched({});
    } catch (err: unknown) {
      console.error("EmailJS error:", err);
      setErrorMsg("No se pudo enviar el mensaje. Intentá de nuevo o escribinos por WhatsApp.");
      setStatus("error");
    }
  };

  const handleReset = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setTouched({});
    setStatus("idle");
    setErrorMsg("");
  };

  const inputClass = (field: keyof FormState) =>
    `w-full rounded-lg px-4 py-2.5 text-sm outline-none transition border ${
      errors[field] && touched[field]
        ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:bg-red-950/20 dark:border-red-500/50"
        : "border-gray-200 bg-white dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 focus:border-[#68b859] dark:focus:border-[#68b859] focus:ring-2 focus:ring-[#68b859]/20 dark:focus:ring-[#68b859]/20"
    }`;

  const whatsappMsg = encodeURIComponent("Hola, me comunico desde el sitio web de Centro Pinturerias.");

  return (
    <section className="py-12 md:py-20 bg-gray-50 dark:bg-slate-950 transition-colors" id="contacto">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#68b859] dark:text-[#68b859] text-sm mb-2 uppercase tracking-widest font-semibold">Contacto</p>
          <h2 className="text-2xl md:text-3xl text-gray-800 dark:text-slate-100 font-bold mb-3">¿Necesitás ayuda? Contactanos</h2>
          <p className="text-gray-500 dark:text-slate-400 text-sm max-w-md mx-auto">
            Completá el formulario y te respondemos a la brevedad, o escribinos directamente por WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* ─── Sidebar de info ─── */}
          <div className="lg:col-span-2 space-y-5">
            {contactInfo.map((c) => (
              <div key={c.label} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#68b859]/10 dark:bg-[#68b859]/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <c.icon className="w-5 h-5 text-[#68b859] dark:text-[#68b859]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-slate-500 uppercase tracking-wide font-semibold">{c.label}</p>
                  <p className="text-gray-800 dark:text-slate-200 font-medium text-sm mt-0.5">{c.value}</p>
                </div>
              </div>
            ))}

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#25d366] hover:bg-[#20bc5a] transition text-white rounded-xl px-5 py-4 mt-2 shadow-sm"
            >
              <MessageCircle className="w-6 h-6 flex-shrink-0" />
              <div>
                <p className="font-bold text-sm leading-tight">Escribinos por WhatsApp</p>
                <p className="text-white/80 text-xs mt-0.5">Respuesta rápida en horario comercial</p>
              </div>
            </a>

            {/* Sucursales */}
            <div className="bg-[#68b859] rounded-xl p-6 text-white">
              <h3 className="text-base font-bold mb-1.5">Sucursales</h3>
              <p className="text-white/80 text-sm">
                Más de 15 sucursales en todo el país. Encontrá la más cercana.
              </p>
              <a
                href="/#sucursales"
                className="mt-4 inline-block bg-white text-[#68b859] px-5 py-2 rounded-full text-sm font-bold hover:bg-white/90 transition"
              >
                Ver sucursales
              </a>
            </div>
          </div>

          {/* ─── Formulario ─── */}
          <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-slate-800">
            {status === "success" ? (
              <div className="flex flex-col items-center text-center py-8 gap-4">
                <div className="w-16 h-16 rounded-full bg-[#68b859]/10 dark:bg-[#68b859]/20 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-[#68b859] dark:text-[#68b859]" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-slate-100">¡Mensaje enviado!</h3>
                <p className="text-gray-500 dark:text-slate-400 text-sm max-w-xs">
                  {IS_CONFIGURED
                    ? "Recibimos tu consulta y te responderemos a la brevedad."
                    : (
                      <>Tu cliente de correo debería abrirse con el mensaje listo. Si no sucedió, escribinos a{" "}
                      <span className="text-[#68b859] font-semibold">info@centropinturerias.com.ar</span></>
                    )
                  }
                </p>
                <button onClick={handleReset} className="mt-2 text-sm text-[#68b859] font-semibold hover:underline">
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <>
                {!IS_CONFIGURED && (
                  <div className="mb-5 flex items-start gap-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl p-4 text-sm text-amber-700 dark:text-amber-400">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>
                      EmailJS no configurado. El formulario abrirá tu cliente de correo.{" "}
                      Configurá las credenciales en <code className="font-mono bg-amber-100 dark:bg-amber-900/40 px-1 rounded">Contact.tsx</code>.
                    </span>
                  </div>
                )}

                {status === "error" && (
                  <div className="mb-5 flex items-start gap-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-xl p-4 text-sm text-red-600 dark:text-red-400">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <h3 className="text-base font-bold text-gray-800 dark:text-slate-100 mb-6">Envianos tu consulta</h3>
                <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                  {/* Nombre + Apellido */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-slate-400 mb-1.5" htmlFor="nombre">
                        Nombre <span className="text-red-500">*</span>
                      </label>
                      <input id="nombre" name="nombre" type="text" autoComplete="given-name"
                        value={form.nombre} onChange={handleChange} onBlur={handleBlur}
                        placeholder="Juan" className={inputClass("nombre")} />
                      {errors.nombre && touched.nombre && <FieldError message={errors.nombre} />}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-slate-400 mb-1.5" htmlFor="apellido">
                        Apellido <span className="text-red-500">*</span>
                      </label>
                      <input id="apellido" name="apellido" type="text" autoComplete="family-name"
                        value={form.apellido} onChange={handleChange} onBlur={handleBlur}
                        placeholder="García" className={inputClass("apellido")} />
                      {errors.apellido && touched.apellido && <FieldError message={errors.apellido} />}
                    </div>
                  </div>

                  {/* Email + Teléfono */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-slate-400 mb-1.5" htmlFor="email">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input id="email" name="email" type="email" autoComplete="email"
                        value={form.email} onChange={handleChange} onBlur={handleBlur}
                        placeholder="juan@ejemplo.com" className={inputClass("email")} />
                      {errors.email && touched.email && <FieldError message={errors.email} />}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-slate-400 mb-1.5" htmlFor="telefono">
                        Teléfono <span className="text-gray-400 dark:text-slate-500 font-normal">(opcional)</span>
                      </label>
                      <input id="telefono" name="telefono" type="tel" autoComplete="tel"
                        value={form.telefono} onChange={handleChange} onBlur={handleBlur}
                        placeholder="+54 9 2284 000000" className={inputClass("telefono")} />
                    </div>
                  </div>

                  {/* Asunto */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-slate-400 mb-1.5" htmlFor="asunto">
                      Asunto <span className="text-red-500">*</span>
                    </label>
                    <select id="asunto" name="asunto" value={form.asunto}
                      onChange={handleChange} onBlur={handleBlur}
                      className={`${inputClass("asunto")} cursor-pointer appearance-none`}>
                      <option value="">Seleccioná un tema…</option>
                      {asuntos.map((a) => <option key={a} value={a}>{a}</option>)}
                    </select>
                    {errors.asunto && touched.asunto && <FieldError message={errors.asunto} />}
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-slate-400 mb-1.5" htmlFor="mensaje">
                      Mensaje <span className="text-red-500">*</span>
                    </label>
                    <textarea id="mensaje" name="mensaje" rows={5}
                      value={form.mensaje} onChange={handleChange} onBlur={handleBlur}
                      placeholder="Contanos en qué podemos ayudarte…"
                      className={`${inputClass("mensaje")} resize-none`} />
                    <div className="flex items-center justify-between mt-1">
                      {errors.mensaje && touched.mensaje ? <FieldError message={errors.mensaje} /> : <span />}
                      <span className="text-xs text-gray-400 dark:text-slate-500 ml-auto">{form.mensaje.length} caracteres</span>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-[#68b859] hover:bg-[#5a9918] disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-xl transition flex items-center justify-center gap-2 text-sm font-bold shadow-sm mt-2"
                  >
                    {status === "loading" ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Enviando…</>
                    ) : (
                      <><Send className="w-4 h-4" /> Enviar consulta</>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <p className="flex items-center gap-1 mt-1 text-xs text-red-500">
      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
      {message}
    </p>
  );
}

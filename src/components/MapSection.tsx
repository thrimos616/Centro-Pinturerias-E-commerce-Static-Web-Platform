import { MapPin, Phone, Clock, Navigation, Mail } from "lucide-react";

function isOpen(horario: Sucursal["horario"]): boolean {
  const now = new Date();
  const argNow = new Date(now.toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" }));
  const day = argNow.getDay();
  const hour = argNow.getHours();
  const minute = argNow.getMinutes();
  const time = hour + minute / 60;

  if (day === 0) return false;
  if (day >= 1 && day <= 5) return time >= horario.semana.open && time < horario.semana.close;
  if (day === 6) return time >= horario.sabado.open && time < horario.sabado.close;
  return false;
}

type Sucursal = {
  nombre: string;
  direccion: string;
  telefonos: string[];
  emails: string[];
  horarioLabel: string;
  horario: {
    semana: { open: number; close: number };
    sabado: { open: number; close: number };
  };
  mapSrc: string;
};

const sucursales: Sucursal[] = [
  {
    nombre: "Central Olavarría",
    direccion: "España 3201, Olavarría, Buenos Aires",
    telefonos: ["2284-428567", "2284-300019"],
    emails: ["central@delcentropinturerias.com.ar", "administracion@delcentropinturerias.com.ar"],
    horarioLabel: "Lun–Vie 8–18hs | Sáb 8–13hs",
    horario: { semana: { open: 8, close: 18 }, sabado: { open: 8, close: 13 } },
    mapSrc: "https://maps.google.com/maps?q=España+3201,+Olavarría,+Buenos+Aires&output=embed",
  },
  {
    nombre: "Sucursal 1 Olavarría",
    direccion: "Av. Del Valle 3098, Olavarría, Buenos Aires",
    telefonos: ["2284-429179", "2284-689989"],
    emails: ["sucursal@delcentropinturerias.com.ar"],
    horarioLabel: "Lun–Vie 8–18hs | Sáb 8–13hs",
    horario: { semana: { open: 8, close: 18 }, sabado: { open: 8, close: 13 } },
    mapSrc: "https://maps.google.com/maps?q=Av.+Del+Valle+3098,+Olavarría,+Buenos+Aires&output=embed",
  },
  {
    nombre: "Sucursal 2 Olavarría",
    direccion: "Av. Del Valle 4414, Olavarría, Buenos Aires",
    telefonos: ["2284-520618"],
    emails: ["sucursal2@delcentropinturerias.com.ar"],
    horarioLabel: "Lun–Vie 8–18hs | Sáb 8–13hs",
    horario: { semana: { open: 8, close: 18 }, sabado: { open: 8, close: 13 } },
    mapSrc: "https://maps.google.com/maps?q=Av.+Del+Valle+4414,+Olavarría,+Buenos+Aires&output=embed",
  },
];

export function MapSection() {
  return (
    <section className="py-12 md:py-16 bg-white dark:bg-slate-900 transition-colors" id="sucursales">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[#68b859] text-sm mb-2 uppercase tracking-wide" style={{ fontWeight: 600 }}>
            Dónde encontrarnos
          </p>
          <h2 className="text-2xl md:text-3xl text-gray-800 dark:text-slate-100 mb-3" style={{ fontWeight: 700 }}>
            Nuestras Sucursales
          </h2>
          <p className="text-gray-500 dark:text-slate-400 text-sm max-w-xl mx-auto">
            Visitanos en cualquiera de nuestros locales en Olavarría. Estamos cerca tuyo para ayudarte a elegir el mejor producto.
          </p>
        </div>

        {/* Sucursales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sucursales.map((s) => {
            const abierto = isOpen(s.horario);
            return (
              <div
                key={s.nombre}
                className="rounded-2xl overflow-hidden shadow-md dark:shadow-slate-900/50 border border-gray-100 dark:border-slate-800 flex flex-col bg-white dark:bg-slate-900"
              >
                {/* Map iframe */}
                <div className="w-full h-52 bg-gray-200 dark:bg-slate-800 relative">
                  <iframe
                    src={s.mapSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Mapa ${s.nombre}`}
                    className="w-full h-full"
                  />
                </div>

                {/* Info card */}
                <div className="bg-white dark:bg-slate-900 p-5 flex flex-col flex-1 border-t border-transparent dark:border-slate-800">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-800 dark:text-slate-100 text-base" style={{ fontWeight: 700 }}>
                      {s.nombre}
                    </h3>
                    {abierto ? (
                      <span className="bg-[#68b859]/10 text-[#68b859] dark:bg-[#68b859]/20 dark:text-[#68b859] text-xs px-3 py-1 rounded-full" style={{ fontWeight: 600 }}>
                        Abierto
                      </span>
                    ) : (
                      <span className="bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 text-xs px-3 py-1 rounded-full" style={{ fontWeight: 600 }}>
                        Cerrado
                      </span>
                    )}
                  </div>

                  <div className="space-y-2.5">
                    {/* Dirección */}
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#68b859] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-slate-300 text-sm">{s.direccion}</span>
                    </div>

                    {/* Teléfonos */}
                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-[#68b859] mt-0.5 flex-shrink-0" />
                      <div className="flex flex-col gap-0.5">
                        {s.telefonos.map((tel) => (
                          <a
                            key={tel}
                            href={`tel:+542284${tel.replace(/\D/g, "").slice(-6)}`}
                            className="text-gray-600 dark:text-slate-300 text-sm hover:text-[#68b859] transition"
                          >
                            {tel}
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Emails */}
                    <div className="flex items-start gap-3">
                      <Mail className="w-4 h-4 text-[#68b859] mt-0.5 flex-shrink-0" />
                      <div className="flex flex-col gap-0.5">
                        {s.emails.map((email) => (
                          <a
                            key={email}
                            href={`mailto:${email}`}
                            className="text-gray-600 dark:text-slate-300 text-sm hover:text-[#68b859] transition break-all"
                          >
                            {email}
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Horario */}
                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-[#68b859] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-slate-300 text-sm">{s.horarioLabel}</span>
                    </div>
                  </div>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.direccion)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center gap-2 bg-[#68b859] text-white px-4 py-2.5 rounded-lg text-sm hover:bg-[#5a9918] transition w-full justify-center"
                    style={{ fontWeight: 600 }}
                  >
                    <Navigation className="w-4 h-4" />
                    Cómo llegar
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA strip */}
        <div className="mt-10 bg-[#68b859] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white text-lg md:text-xl mb-1" style={{ fontWeight: 700 }}>
              ¿Necesitás más información?
            </h3>
            <p className="text-white/80 text-sm">
              También podés contactarnos por WhatsApp o realizar tu pedido online con envío a domicilio.
            </p>
          </div>
          <a
            href="/tienda"
            className="bg-white text-[#68b859] px-6 py-3 rounded-full text-sm hover:bg-white/90 transition whitespace-nowrap"
            style={{ fontWeight: 700 }}
          >
            Comprar online
          </a>
        </div>
      </div>
    </section>
  );
}

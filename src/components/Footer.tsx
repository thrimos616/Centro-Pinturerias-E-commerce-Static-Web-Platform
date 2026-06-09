import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="mb-4">
              <span className="text-xl" style={{ fontWeight: 700 }}>centro</span>
              <span className="block text-[9px] tracking-[0.2em] uppercase text-gray-400">pinturerias</span>
            </div>
            <p className="text-gray-400 text-sm">Tu pinturería de confianza con más de 20 años en el mercado.</p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://www.instagram.com/centropinturerias_olavarria"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#68b859] transition"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm mb-4" style={{ fontWeight: 600 }}>Productos</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/pinturas" className="hover:text-white transition">Pinturas Interior</a></li>
              <li><a href="/pinturas" className="hover:text-white transition">Pinturas Exterior</a></li>
              <li><a href="/revestimientos" className="hover:text-white transition">Revestimientos</a></li>
              <li><a href="/tienda" className="hover:text-white transition">Accesorios</a></li>
              <li><a href="/decoracion" className="hover:text-white transition">Decoración</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm mb-4" style={{ fontWeight: 600 }}>Información</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/#nosotros" className="hover:text-white transition">Sobre nosotros</a></li>
              <li><a href="/#sucursales" className="hover:text-white transition">Sucursales</a></li>
              <li><a href="/novedades" className="hover:text-white transition">Novedades</a></li>
              <li><a href="/ayuda" className="hover:text-white transition">Preguntas frecuentes</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm mb-4" style={{ fontWeight: 600 }}>Contacto</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Av. San Martín 1234</li>
              <li>Buenos Aires, Argentina</li>
              <li>+54 9 2284 30-0019</li>
              <li>info@centropinturerias.com.ar</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2026 Centro Pinturerias. Todos los derechos reservados.</p>
          <div className="flex gap-4 text-sm text-gray-500">
          <a href="/ayuda" className="hover:text-white transition">Términos</a>
            <a href="/ayuda" className="hover:text-white transition">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

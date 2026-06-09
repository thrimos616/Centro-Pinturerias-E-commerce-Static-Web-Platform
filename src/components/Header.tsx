import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, Search, ShoppingCart, User } from "lucide-react";
import { useCart } from "../context/CartContext";
import { ThemeToggle } from "./ThemeToggle";

const promoMessages = [
  "Hasta 3 y 6 cuotas sin interés!",
  "30% de descuento",
  "Y también 3 y 6 cuotas sin interés!",
  "Envío gratis en compras mayores a $50.000",
];

type DropdownColumn = { title: string; items: { label: string; href: string }[] };
const dropdownData: Record<string, { columns: DropdownColumn[] }> = {
  Pinturas: {
    columns: [
      {
        title: "Tipos de pintura",
        items: [
          { label: "A la tiza", href: "/pinturas" },
          { label: "Aerosol", href: "/pinturas" },
          { label: "Barniz", href: "/pinturas" },
          { label: "Esmaltes sintéticos y al agua", href: "/pinturas" },
          { label: "Impermeabilizantes", href: "/pinturas" },
          { label: "Impregnantes", href: "/pinturas" },
          { label: "Latex", href: "/pinturas" },
          { label: "Tintas", href: "/pinturas" },
        ],
      },
      {
        title: "Marcas de pintura",
        items: [
          { label: "Alba", href: "/pinturas" },
          { label: "Cotol", href: "/pinturas" },
          { label: "Centro", href: "/pinturas" },
          { label: "Denver", href: "/pinturas" },
          { label: "Ravear", href: "/pinturas" },
          { label: "Vernier", href: "/pinturas" },
          { label: "Brik-Col", href: "/pinturas" },
          { label: "Rust Oleum", href: "/pinturas" },
        ],
      },
      {
        title: "Superficie",
        items: [
          { label: "Cerámica", href: "/pinturas" },
          { label: "Madera", href: "/pinturas" },
          { label: "Metal", href: "/pinturas" },
          { label: "Plástico", href: "/pinturas" },
          { label: "Vidrio", href: "/pinturas" },
        ],
      },
      {
        title: "Accesorios",
        items: [
          { label: "Pinceles", href: "/tienda" },
          { label: "Rodillos", href: "/tienda" },
          { label: "Bandejas", href: "/tienda" },
          { label: "Cinta de enmascarar", href: "/tienda" },
          { label: "Lijas", href: "/tienda" },
          { label: "Espátulas", href: "/tienda" },
        ],
      },
    ],
  },
  Revestimientos: {
    columns: [
      {
        title: "Tipos de revestimiento",
        items: [
          { label: "Revestimientos de exterior", href: "/revestimientos" },
          { label: "Revestimientos de interior", href: "/revestimientos" },
        ],
      },
    ],
  },
  Decoración: {
    columns: [
      {
        title: "Decoración",
        items: [
          { label: "Decoración de paredes", href: "/decoracion" },
          { label: "Decoración de pisos", href: "/decoracion" },
        ],
      },
    ],
  },
  "Construcción en seco": {
    columns: [
      {
        title: "Construcción en seco",
        items: [
          { label: "Para interior", href: "/construccion" },
          { label: "Para exterior", href: "/construccion" },
        ],
      },
    ],
  },
};

const navItems = [
  { label: "Tienda", href: "/tienda", hasDropdown: false },
  { label: "Pinturas", href: "/pinturas", hasDropdown: true },
  { label: "Revestimientos", href: "/revestimientos", hasDropdown: true },
  { label: "Decoración", href: "/decoracion", hasDropdown: true },
  { label: "Construcción en seco", href: "/construccion", hasDropdown: true },
  { label: "Ayuda", href: "/ayuda", hasDropdown: false },
  { label: "Novedades", href: "/novedades", hasDropdown: false },
  { label: "Contacto", href: "/#contacto", hasDropdown: false },
];

interface HeaderProps {
  onCartClick?: () => void;
}

export function Header({ onCartClick }: HeaderProps = {}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cartCtx = useCart();
  const totalItems = cartCtx.totalItems;

  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (dropdownData[label]) setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <header className="w-full sticky top-0 z-50">
      {/* Promo banner */}
      <div className="bg-[#68b859] text-white py-1.5 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex gap-12 text-sm">
          {promoMessages.concat(promoMessages).map((msg, i) => (
            <span key={i} className="inline-block px-4">{msg}</span>
          ))}
        </div>
      </div>

      {/* Main header */}
      <div className="bg-[#68b859] px-4 md:px-8 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <img
            src="/images/logo_centro2.jpeg"
            alt="Centro Pinturerias"
            className="h-10 w-auto object-contain rounded"
          />
        </a>

        <div className="hidden md:flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="bg-white/90 dark:bg-white/10 dark:text-white rounded-full pl-4 pr-10 py-2 text-sm w-64 text-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-300 outline-none focus:ring-2 focus:ring-white/50"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-300" />
          </div>
          <ThemeToggle />
          <a href="/#contacto" className="text-white hover:text-white/80 transition" title="Mi cuenta">
            <User className="w-5 h-5" />
          </a>
          <button
            onClick={onCartClick}
            className="text-white hover:text-white/80 transition relative"
            title="Ver carrito"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center" style={{ fontWeight: 700 }}>
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Nav bar */}
      <nav className="bg-white dark:bg-slate-900 shadow-sm hidden md:block relative border-b border-transparent dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" &&
                pathname.startsWith(item.href.split("#")[0]) &&
                !item.href.includes("#"));
            const hasDD = item.hasDropdown && !!dropdownData[item.label];

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <a
                  href={item.href}
                  className={`px-3 py-3 text-sm transition flex items-center gap-1 whitespace-nowrap border-b-2 ${
                    isActive
                      ? "text-[#68b859] dark:text-[#68b859] border-[#68b859] dark:border-[#68b859]"
                      : "text-gray-700 dark:text-gray-300 border-transparent hover:text-[#68b859] dark:hover:text-[#68b859]"
                  }`}
                >
                  {item.label}
                  {hasDD && (
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""}`}
                    />
                  )}
                </a>

                {/* Dropdown */}
                {hasDD && openDropdown === item.label && (
                  <div
                    className="absolute left-0 top-full bg-[#68b859] dark:bg-slate-800 shadow-xl z-50 min-w-max border-t dark:border-slate-700"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="flex gap-10 p-6">
                      {dropdownData[item.label].columns.map((col) => (
                        <div key={col.title} className="min-w-[150px]">
                          <p className="text-white text-sm mb-3 flex items-center gap-1.5" style={{ fontWeight: 600 }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
                            {col.title}
                          </p>
                          <ul className="space-y-1.5">
                            {col.items.map((subItem) => (
                              <li key={subItem.label}>
                                <a
                                  href={subItem.href}
                                  className="text-white/85 text-sm hover:text-white transition block"
                                >
                                  {subItem.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 shadow-lg border-t dark:border-slate-800">
          <div className="p-4">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="bg-gray-100 dark:bg-slate-800 rounded-full pl-4 pr-10 py-2 text-sm w-full text-gray-700 dark:text-slate-200 placeholder:text-gray-500 dark:placeholder:text-gray-400 outline-none focus:ring-1 focus:ring-[#68b859]"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            {navItems.map((item) => {
              const hasDD = item.hasDropdown && !!dropdownData[item.label];
              const isExpanded = mobileExpanded === item.label;
              return (
                <div key={item.label}>
                  <div className="flex items-center justify-between">
                    <a
                      href={item.href}
                      className="flex-1 block px-3 py-3 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg transition"
                      onClick={() => !hasDD && setMobileOpen(false)}
                    >
                      {item.label}
                    </a>
                    {hasDD && (
                      <button
                        className="px-3 py-3 text-gray-500 dark:text-slate-400"
                        onClick={() => setMobileExpanded(isExpanded ? null : item.label)}
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                      </button>
                    )}
                  </div>
                  {hasDD && isExpanded && (
                    <div className="bg-[#68b859] dark:bg-slate-800 rounded-lg mx-2 mb-2 p-4 border dark:border-slate-700">
                      {dropdownData[item.label].columns.map((col) => (
                        <div key={col.title} className="mb-3">
                          <p className="text-white text-xs mb-2" style={{ fontWeight: 700 }}>{col.title}</p>
                          <ul className="space-y-1">
                            {col.items.map((subItem) => (
                              <li key={subItem.label}>
                                <a href={subItem.href} className="text-white/80 text-sm hover:text-white block">{subItem.label}</a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            
            {/* Theme Toggle Mobile */}
            <div className="mt-2 pt-2 border-t border-gray-100 dark:border-slate-800">
              <ThemeToggle isMobile />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </header>
  );
}

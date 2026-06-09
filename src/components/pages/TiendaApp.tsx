import { useState } from "react";
import { CartProvider } from "../../context/CartContext";
import { Header } from "../Header";
import { CartDrawer } from "../CartDrawer";
import { TiendaPage } from "./TiendaPage";

/**
 * Full Tienda experience wrapped in a single CartProvider
 * so Header, CartDrawer, and TiendaPage share the same cart state.
 */
export function TiendaApp() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      <Header onCartClick={() => setCartOpen(true)} />
      <main className="flex-1 bg-gray-50 dark:bg-slate-950 transition-colors">
        <TiendaPage />
      </main>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </CartProvider>
  );
}

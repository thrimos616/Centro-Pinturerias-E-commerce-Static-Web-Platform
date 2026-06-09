import { useState, type ReactNode } from "react";
import { CartProvider } from "../../context/CartContext";
import { Header } from "../Header";
import { CartDrawer } from "../CartDrawer";

interface CategoryPageShellProps {
  children: ReactNode;
}

/**
 * Shell that wraps any category page (Pinturas, Revestimientos, Decoracion, Construccion)
 * in a single CartProvider so Header, CartDrawer, and the page share cart state.
 */
export function CategoryPageShell({ children }: CategoryPageShellProps) {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      <Header onCartClick={() => setCartOpen(true)} />
      <main className="flex-1 bg-gray-50 dark:bg-slate-950 transition-colors">
        {children}
      </main>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </CartProvider>
  );
}

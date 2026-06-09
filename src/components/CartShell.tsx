import { useState } from "react";
import { CartProvider } from "../context/CartContext";
import { Header } from "./Header";
import { CartDrawer } from "./CartDrawer";

/**
 * CartShell wraps the Header and CartDrawer in a single CartProvider,
 * so the cart state is shared between both components.
 * Mounted in Layout.astro with client:load.
 */
export function CartShell() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      <Header onCartClick={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </CartProvider>
  );
}

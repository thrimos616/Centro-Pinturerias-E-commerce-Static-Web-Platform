import { createContext, useContext, useState, type ReactNode } from "react";

export interface CartItem {
  id: string;
  productId: number;
  productName: string;
  brand: string;
  paintType: string;
  canSize: string;
  pricePerUnit: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const defaultCtx: CartContextType = {
  items: [],
  totalItems: 0,
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
};

const CartContext = createContext<CartContextType>(defaultCtx);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const addItem = (item: Omit<CartItem, "id">) => {
    const id = `${item.productId}-${item.paintType}-${item.canSize}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, { ...item, id }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, totalItems, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

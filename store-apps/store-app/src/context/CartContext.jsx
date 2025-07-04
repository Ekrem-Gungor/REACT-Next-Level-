import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export function useCartContext() {
  const context = useContext(CartContext);
  return context;
}

export function CartContextProvider({ children }) {
  const [cart, setCart] = useState(null);

  return <CartContext value={{ cart, setCart }}>{children}</CartContext>;
}

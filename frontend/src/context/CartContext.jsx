import { createContext, useContext, useEffect, useState } from "react";
import { getCart } from "../services/cart.service";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const fetchCart = async () => {
    try {
      const data = await getCart();

      const items = data.cart?.items || [];

      setCartItems(items);

      const totalItems = items.reduce(
        (total, item) => total + item.quantity,
        0
      );

      setCartCount(totalItems);
    } catch (error) {
      setCartItems([]);
      setCartCount(0);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchCart();
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
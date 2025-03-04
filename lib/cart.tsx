"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Product } from "@/data/products";

// Cart item with quantity
export interface CartItem extends Product {
  quantity: number;
}

// Cart state
interface CartState {
  items: CartItem[];
  subtotal: number;
  itemCount: number;
}

// Cart context
interface CartContextType {
  cart: CartState;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

// Actions
type CartAction =
  | { type: "ADD_TO_CART"; payload: { product: Product; quantity: number } }
  | { type: "REMOVE_FROM_CART"; payload: { productId: number } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: number; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartState };

// Initial state
const initialState: CartState = {
  items: [],
  subtotal: 0,
  itemCount: 0,
};

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Reducer function
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === product.id
      );

      let newItems: CartItem[];

      // If item already exists in cart, update quantity
      if (existingItemIndex > -1) {
        newItems = [...state.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity,
        };
      } else {
        // Otherwise add new item
        newItems = [...state.items, { ...product, quantity }];
      }

      const newSubtotal = calculateSubtotal(newItems);
      const newItemCount = calculateItemCount(newItems);

      return {
        ...state,
        items: newItems,
        subtotal: newSubtotal,
        itemCount: newItemCount,
      };
    }

    case "REMOVE_FROM_CART": {
      const { productId } = action.payload;
      const newItems = state.items.filter((item) => item.id !== productId);
      
      const newSubtotal = calculateSubtotal(newItems);
      const newItemCount = calculateItemCount(newItems);

      return {
        ...state,
        items: newItems,
        subtotal: newSubtotal,
        itemCount: newItemCount,
      };
    }

    case "UPDATE_QUANTITY": {
      const { productId, quantity } = action.payload;
      
      // Don't allow quantity less than 1
      if (quantity < 1) return state;

      const newItems = state.items.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );

      const newSubtotal = calculateSubtotal(newItems);
      const newItemCount = calculateItemCount(newItems);

      return {
        ...state,
        items: newItems,
        subtotal: newSubtotal,
        itemCount: newItemCount,
      };
    }

    case "CLEAR_CART":
      return initialState;

    case "LOAD_CART":
      return action.payload;

    default:
      return state;
  }
}

// Helper functions
function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

function calculateItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0);
}

// Cart provider component
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        dispatch({ type: "LOAD_CART", payload: JSON.parse(savedCart) });
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cart]);

  // Actions
  const addToCart = (product: Product, quantity: number) => {
    dispatch({ type: "ADD_TO_CART", payload: { product, quantity } });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { productId } });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook to use the cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
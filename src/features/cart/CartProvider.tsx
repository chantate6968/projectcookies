"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  getDeliveryMinor,
  getPromoMessage,
  getSubtotalMinor,
  getTotalMinor,
  hydrateCartLines,
  type CartLine,
  type CartLineWithProduct,
} from "./cart-utils";

type CartContextValue = {
  lines: CartLineWithProduct[];
  promoCode: string;
  subtotalMinor: number;
  deliveryMinor: number;
  totalMinor: number;
  itemCount: number;
  promoMessage: string;
  addItem: (productId: string, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  setPromoCode: (code: string) => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const storageKey = "lamsumsum-cart-v2";
const promoStorageKey = "lamsumsum-promo-v2";

function persistCart(lines: CartLine[]) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(storageKey, JSON.stringify(lines));
  }
}

function persistPromo(code: string) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(promoStorageKey, code);
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [rawLines, setRawLines] = useState<CartLine[]>([]);
  const [promoCode, setPromoCodeState] = useState("");
  const userInteractedRef = useRef(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (userInteractedRef.current) {
        return;
      }

      const savedCart = window.localStorage.getItem(storageKey);
      const savedPromo = window.localStorage.getItem(promoStorageKey);

      if (savedCart) {
        try {
          setRawLines(JSON.parse(savedCart) as CartLine[]);
        } catch {
          setRawLines([]);
        }
      }

      if (savedPromo) {
        setPromoCodeState(savedPromo);
      }
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const lines = useMemo(() => hydrateCartLines(rawLines), [rawLines]);
  const subtotalMinor = useMemo(() => getSubtotalMinor(lines), [lines]);
  const deliveryMinor = useMemo(
    () => getDeliveryMinor(subtotalMinor, promoCode),
    [promoCode, subtotalMinor],
  );
  const totalMinor = useMemo(
    () => getTotalMinor(lines, promoCode),
    [lines, promoCode],
  );
  const itemCount = useMemo(
    () => lines.reduce((count, line) => count + line.quantity, 0),
    [lines],
  );
  const promoMessage = useMemo(
    () => getPromoMessage(subtotalMinor, promoCode),
    [promoCode, subtotalMinor],
  );

  const addItem = useCallback((productId: string, quantity = 1) => {
    userInteractedRef.current = true;
    setRawLines((current) => {
      const existing = current.find((line) => line.productId === productId);

      if (existing) {
        const nextLines = current.map((line) =>
          line.productId === productId
            ? { ...line, quantity: line.quantity + quantity }
            : line,
        );

        persistCart(nextLines);
        return nextLines;
      }

      const nextLines = [...current, { productId, quantity }];
      persistCart(nextLines);
      return nextLines;
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    userInteractedRef.current = true;
    setRawLines((current) => {
      const nextLines = current
        .map((line) =>
          line.productId === productId
            ? { ...line, quantity: Math.max(0, quantity) }
            : line,
        )
        .filter((line) => line.quantity > 0);

      persistCart(nextLines);
      return nextLines;
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    userInteractedRef.current = true;
    setRawLines((current) => {
      const nextLines = current.filter((line) => line.productId !== productId);
      persistCart(nextLines);
      return nextLines;
    });
  }, []);

  const clearCart = useCallback(() => {
    userInteractedRef.current = true;
    persistCart([]);
    persistPromo("");
    setRawLines([]);
    setPromoCodeState("");
  }, []);

  const setPromoCode = useCallback((code: string) => {
    userInteractedRef.current = true;
    persistPromo(code);
    setPromoCodeState(code);
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      promoCode,
      subtotalMinor,
      deliveryMinor,
      totalMinor,
      itemCount,
      promoMessage,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      setPromoCode,
    }),
    [
      addItem,
      clearCart,
      deliveryMinor,
      itemCount,
      lines,
      promoCode,
      promoMessage,
      removeItem,
      setPromoCode,
      subtotalMinor,
      totalMinor,
      updateQuantity,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}

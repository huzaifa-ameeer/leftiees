"use client";

import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import { useCartStore } from "@/lib/cart";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    void useCartStore.persist.rehydrate();
  }, []);

  return (
    <>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "9999px",
            background: "#171717",
            color: "#ffffff",
            padding: "10px 16px",
            fontSize: "14px",
          },
        }}
      />
    </>
  );
}

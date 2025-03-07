"use client";

import React, { useState } from "react";
import { useCart } from "@/lib/cart";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const tax = cart.subtotal * 0.07; // 7% tax
  const shipping = cart.itemCount > 0 ? 5.99 : 0; // Shipping fee
  const total = cart.subtotal + tax + shipping;

  const handleCheckout = () => {
    setIsCheckingOut(true);

    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
      alert("Thank you for your purchase! This is a demo checkout.");
    }, 2000);
  };

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-medium mb-4 font-display">Your Cart</h1>
          <div className="h-0.5 w-full max-w-xs bg-secondary"></div>
        </motion.div>

        {cart.items.length === 0 ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="flex justify-center mb-4">
              <ShoppingBag
                size={64}
                className="text-muted-foreground opacity-40"
              />
            </div>
            <h2 className="text-2xl font-medium mb-4 font-display">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Looks like you haven&apos;t added any products to your cart yet.
              Browse our collection and find something you&apos;ll love.
            </p>
            <Button asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="space-y-6">
                {cart.items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                    className="flex flex-col sm:flex-row gap-4 border-b pb-6 dark:border-gray-800"
                  >
                    <div className="h-28 w-28 relative rounded-md overflow-hidden bg-secondary flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <Link
                          href={`/product/${item.id}`}
                          className="font-medium hover:text-primary transition-colors"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-muted-foreground mt-1 capitalize">
                          {item.category}
                        </p>
                        <div className="mt-2 font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                          >
                            <Minus size={14} />
                          </Button>
                          <span className="w-10 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus size={14} />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          aria-label="Remove item"
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl font-medium mb-6 font-display">Order Summary</h2>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${cart.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (7%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>

                    <div className="h-px w-full bg-border my-4"></div>

                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-6 gap-2"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? "Processing..." : "Checkout"}
                    {!isCheckingOut && <ArrowRight size={16} />}
                  </Button>

                  <div className="mt-6 text-xs text-center text-muted-foreground">
                    By checking out, you agree to our{" "}
                    <Link href="/terms-of-service" className="underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy-policy" className="underline">
                      Privacy Policy
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

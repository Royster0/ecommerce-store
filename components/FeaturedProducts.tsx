"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Heart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/lib/cart";
import { featuredProducts } from "@/data/products";

// We now import featuredProducts from data/products instead of defining them here

export default function FeaturedProducts() {
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  const [addingToCartId, setAddingToCartId] = useState<number | null>(null);
  const { toast } = useToast();
  const { addToCart } = useCart();

  // Only show first 4 products on homepage
  const displayedProducts = featuredProducts.slice(0, 4);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {displayedProducts.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Card
            className="overflow-hidden border-none shadow-sm product-card-hover"
            onMouseEnter={() => setHoveredProductId(product.id)}
            onMouseLeave={() => setHoveredProductId(null)}
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className={`object-cover transition-transform duration-500 ${
                  hoveredProductId === product.id ? "scale-105" : "scale-100"
                }`}
              />

              {product.isNew && (
                <div className="absolute top-4 left-4 bg-black text-white text-xs font-medium px-2 py-1 rounded">
                  New
                </div>
              )}

              <div
                className={`absolute inset-0 bg-black/20 flex items-end justify-center p-4 transition-opacity duration-300 ${
                  hoveredProductId === product.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="flex gap-2 w-full">
                  <Button
                    className="flex-1 gap-1 bg-white text-black hover:bg-white/90"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      setAddingToCartId(product.id);
                      // Add to cart with quantity 1
                      setTimeout(() => {
                        addToCart(product, 1);
                        setAddingToCartId(null);
                        toast({
                          title: "Added to cart",
                          description: `${product.name} added to your cart`,
                        });
                      }, 500);
                    }}
                    disabled={addingToCartId === product.id}
                  >
                    {addingToCartId === product.id ? (
                      <>
                        <Check size={16} className="animate-bounce" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={16} />
                        Add to Cart
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white/20 border-white/40 text-white hover:bg-white/30"
                  >
                    <Heart size={16} />
                  </Button>
                </div>
              </div>
            </div>

            <CardContent className="p-4">
              <Link href={`/product/${product.id}`} className="block group">
                <h3 className="font-medium group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  {product.category}
                </p>
                <p className="mt-2 font-medium">${product.price.toFixed(2)}</p>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

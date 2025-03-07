"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Minus,
  Plus,
  ShoppingBag,
  Heart,
  Share2,
  Star,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import FeaturedProducts from "@/components/FeaturedProducts";
import { featuredProducts, Product } from "@/data/products";
import { useCart } from "@/lib/cart";

export default function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const productId = parseInt(id);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { toast } = useToast();
  const { addToCart } = useCart();

  // placeholder images
  const productImages = [
    "/placeholder.png",
    "/placeholder.png",
    "/placeholder.png",
    "/placeholder.png",
  ];

  useEffect(() => {
    // Mock API call
    const fetchProduct = () => {
      const foundProduct = featuredProducts.find((p) => p.id === productId);
      setProduct(foundProduct || null);
      setLoading(false);

      // Initialize selected color and size if product exists
      if (foundProduct) {
        if (foundProduct.colors && foundProduct.colors.length > 0) {
          setSelectedColor(foundProduct.colors[0]);
        }
        if (foundProduct.sizes && foundProduct.sizes.length > 0) {
          setSelectedSize(foundProduct.sizes[0]);
        }
      }
    };

    fetchProduct();
  }, [productId]);

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="pt-24 pb-20 px-6 flex justify-center items-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-24 pb-20 px-6 flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-2xl font-medium mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The product you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Button asChild>
          <Link href="/category/featured">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight size={14} className="mx-2" />
          <Link
            href={`/category/${product.category}`}
            className="hover:text-primary transition-colors capitalize"
          >
            {product.category}
          </Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-foreground truncate max-w-[200px]">
            {product.name}
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col lg:flex-row gap-4"
          >
            {/* Thumbnails */}
            <div className="order-2 lg:order-1 lg:w-20 flex lg:flex-col gap-2 mt-4 lg:mt-0">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`block w-16 lg:w-full aspect-square relative overflow-hidden border transition-all ${
                    currentImageIndex === index
                      ? "border-primary"
                      : "border-transparent hover:border-gray-200"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="order-1 lg:order-2 lg:flex-1 relative">
              <div className="aspect-[3/4] relative overflow-hidden border">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={productImages[currentImageIndex]}
                      alt={product.name}
                      fill
                      priority
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {product.isNew && (
                  <div className="absolute top-4 left-4 bg-black text-white text-xs font-medium px-2 py-1 font-display">
                    New
                  </div>
                )}

                {product.onSale && (
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 font-display">
                    Sale
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl font-medium mb-2 font-display">{product.name}</h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={`${
                        star <= Math.round(product.rating || 0)
                          ? "fill-primary text-primary"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground ml-2">
                  {product.rating.toFixed(1)}
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mb-6">
              <p className="text-2xl font-medium">
                ${product.price.toFixed(2)}
              </p>
              {product.onSale && (
                <p className="text-sm text-muted-foreground">
                  <span className="line-through mr-2">
                    ${(product.price * 1.2).toFixed(2)}
                  </span>
                  <span className="text-primary font-medium">20% Off</span>
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-8">{product.description}</p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3 font-display">
                  Color: {selectedColor}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`h-8 px-3 text-xs transition-colors ${
                        selectedColor === color
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium font-display">Size: {selectedSize}</h3>
                  <Button
                    variant="link"
                    size="sm"
                    className="p-0 h-auto text-xs"
                  >
                    Size Guide
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[3rem] h-10 flex items-center justify-center text-sm transition-colors ${
                        selectedSize === size
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-3 font-display">Quantity</h3>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="h-10 w-10 rounded-r-none"
                >
                  <Minus size={16} />
                </Button>
                <div className="h-10 w-16 flex items-center justify-center border-y">
                  {quantity}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                  className="h-10 w-10 rounded-l-none"
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button 
                className="flex-1 gap-2" 
                size="lg"
                disabled={isAddingToCart || !product.inStock}
                onClick={() => {
                  if (product) {
                    setIsAddingToCart(true);
                    setTimeout(() => {
                      addToCart(product, quantity);
                      setIsAddingToCart(false);
                      toast({
                        title: "Added to cart",
                        description: `${quantity} × ${product.name} added to your cart`,
                      });
                    }, 600);
                  }
                }}
              >
                {isAddingToCart ? (
                  <>
                    <Check size={18} className="animate-bounce" />
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </>
                )}
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Heart size={18} />
                Wishlist
              </Button>
            </div>

            {/* Product Info */}
            <div className="border-t pt-6">
              <div className="flex items-center gap-4">
                <div className="text-xs">
                  <p className="font-medium">Free Shipping</p>
                  <p className="text-muted-foreground">On orders over $100</p>
                </div>
                <div className="text-xs">
                  <p className="font-medium">Easy Returns</p>
                  <p className="text-muted-foreground">30 day return policy</p>
                </div>
                <Button variant="ghost" size="icon" className="ml-auto">
                  <Share2 size={18} />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* You May Also Like Section */}
      <section className="mt-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-medium mb-4 font-display">You May Also Like</h2>
          </motion.div>

          <FeaturedProducts />
        </div>
      </section>
    </div>
  );
}

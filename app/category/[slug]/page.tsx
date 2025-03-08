"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  Filter,
  ChevronDown,
  ChevronUp,
  Check,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

// Sample product data
import { featuredProducts } from "@/data/products";

// Types for filters
type SortOption = "newest" | "price-low-high" | "price-high-low";
type ColorFilter = string[];
type SizeFilter = string[];
type PriceFilter = [number, number];

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);
  const [filteredProducts, setFilteredProducts] = useState(featuredProducts);
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  const [addingToCartId, setAddingToCartId] = useState<number | null>(null);
  const { toast } = useToast();
  const { addToCart } = useCart();

  // Filters state
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [colorFilter, setColorFilter] = useState<ColorFilter>([]);
  const [sizeFilter, setSizeFilter] = useState<SizeFilter>([]);
  const [priceFilter, setPriceFilter] = useState<PriceFilter>([0, 200]);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Filter accordion states
  const [openAccordion, setOpenAccordion] = useState<string | null>("category");

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  // Get category name with capitalized first letter
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

  // Filter options
  const colorOptions = [
    "Black",
    "White",
    "Blue",
    "Green",
    "Brown",
    "Gray",
    "Beige",
  ];
  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

  // Apply filters
  useEffect(() => {
    // Filter by category first (if not "featured")
    let result = [...featuredProducts];

    if (slug !== "featured") {
      result = result.filter((p) => p.category === slug);
    }

    // Apply color filter
    if (colorFilter.length > 0) {
      // This is just a simulation since our mock data doesn't have color values
      // In a real app, you would filter by the actual color values
    }

    // Apply size filter
    if (sizeFilter.length > 0) {
      // This is just a simulation since our mock data doesn't have size values
      // In a real app, you would filter by the actual size values
    }

    // Apply price filter
    result = result.filter(
      (p) => p.price >= priceFilter[0] && p.price <= priceFilter[1]
    );

    // Apply on sale filter
    if (onSaleOnly) {
      // This is just a simulation since our mock data doesn't have sale status
      // In a real app, you would filter by the actual sale status
    }

    // Apply in stock filter
    if (inStockOnly) {
      // This is just a simulation since our mock data doesn't have stock status
      // In a real app, you would filter by the actual stock status
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
      default:
        // Assume newer products have higher IDs in our mock data
        result.sort((a, b) => b.id - a.id);
    }

    setFilteredProducts(result);
  }, [
    slug,
    sortBy,
    colorFilter,
    sizeFilter,
    priceFilter,
    onSaleOnly,
    inStockOnly,
  ]);

  // Toggle color filter
  const toggleColorFilter = (color: string) => {
    setColorFilter((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  // Toggle size filter
  const toggleSizeFilter = (size: string) => {
    setSizeFilter((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Category Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-medium mb-4 font-display">
            {categoryName}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our curated collection of{" "}
            {slug === "featured" ? "featured items" : slug} crafted with premium
            materials and timeless design.
          </p>
        </motion.div>

        {/* Filters and Products Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <motion.aside
            className="hidden lg:block w-64 flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="sticky top-24 space-y-6">
              <div className="pb-4 border-b">
                <h2 className="font-medium mb-2">Category</h2>
                <ul className="space-y-2">
                  {[
                    "Featured",
                    "Shirts",
                    "Pants",
                    "Hoodies",
                    "Accessories",
                  ].map((cat) => (
                    <li key={cat}>
                      <Link
                        href={`/category/${cat.toLowerCase()}`}
                        className={`text-sm hover:text-primary transition-colors ${
                          slug === cat.toLowerCase()
                            ? "font-medium text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        {cat}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pb-4 border-b">
                <h2 className="font-medium mb-4">Price Range</h2>
                <Slider
                  defaultValue={[0, 200]}
                  max={200}
                  step={1}
                  value={priceFilter}
                  onValueChange={(value: number[]) =>
                    setPriceFilter(value as [number, number])
                  }
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${priceFilter[0]}</span>
                  <span>${priceFilter[1]}</span>
                </div>
              </div>

              <div className="pb-4 border-b">
                <h2 className="font-medium mb-3">Colors</h2>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => toggleColorFilter(color)}
                      className={`h-8 px-3 text-xs rounded-full transition-colors ${
                        colorFilter.includes(color)
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pb-4 border-b">
                <h2 className="font-medium mb-3">Sizes</h2>
                <div className="flex flex-wrap gap-2">
                  {sizeOptions.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSizeFilter(size)}
                      className={`h-8 w-8 flex items-center justify-center text-xs rounded-full transition-colors ${
                        sizeFilter.includes(size)
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pb-4 border-b space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm">On Sale Only</label>
                  <Switch
                    checked={onSaleOnly}
                    onCheckedChange={setOnSaleOnly}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">In Stock Only</label>
                  <Switch
                    checked={inStockOnly}
                    onCheckedChange={setInStockOnly}
                  />
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSortBy("newest");
                  setColorFilter([]);
                  setSizeFilter([]);
                  setPriceFilter([0, 200]);
                  setOnSaleOnly(false);
                  setInStockOnly(false);
                }}
              >
                Reset Filters
              </Button>
            </div>
          </motion.aside>

          {/* Mobile Filters */}
          <div className="lg:hidden flex justify-between items-center mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter size={16} />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-4/5 sm:w-96 overflow-y-auto"
              >
                <h2 className="text-lg font-medium mb-6">Filters</h2>

                <div className="space-y-6">
                  <div className="border-b pb-3">
                    <button
                      className="flex items-center justify-between w-full text-left"
                      onClick={() => toggleAccordion("category")}
                    >
                      <h3 className="font-medium">Category</h3>
                      {openAccordion === "category" ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>

                    <AnimatePresence>
                      {openAccordion === "category" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <ul className="space-y-2 mt-3">
                            {[
                              "Featured",
                              "Shirts",
                              "Pants",
                              "Hoodies",
                              "Accessories",
                            ].map((cat) => (
                              <li key={cat}>
                                <Link
                                  href={`/category/${cat.toLowerCase()}`}
                                  className={`text-sm hover:text-primary transition-colors ${
                                    slug === cat.toLowerCase()
                                      ? "font-medium text-primary"
                                      : "text-muted-foreground"
                                  }`}
                                >
                                  {cat}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="border-b pb-3">
                    <button
                      className="flex items-center justify-between w-full text-left"
                      onClick={() => toggleAccordion("price")}
                    >
                      <h3 className="font-medium">Price Range</h3>
                      {openAccordion === "price" ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>

                    <AnimatePresence>
                      {openAccordion === "price" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3">
                            <Slider
                              defaultValue={[0, 200]}
                              max={200}
                              step={1}
                              value={priceFilter}
                              onValueChange={(value: number[]) =>
                                setPriceFilter(value as [number, number])
                              }
                              className="mb-2"
                            />
                            <div className="flex justify-between text-sm text-muted-foreground">
                              <span>${priceFilter[0]}</span>
                              <span>${priceFilter[1]}</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="border-b pb-3">
                    <button
                      className="flex items-center justify-between w-full text-left"
                      onClick={() => toggleAccordion("colors")}
                    >
                      <h3 className="font-medium">Colors</h3>
                      {openAccordion === "colors" ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>

                    <AnimatePresence>
                      {openAccordion === "colors" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-wrap gap-2 mt-3">
                            {colorOptions.map((color) => (
                              <button
                                key={color}
                                onClick={() => toggleColorFilter(color)}
                                className={`h-8 px-3 text-xs rounded-full transition-colors ${
                                  colorFilter.includes(color)
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                }`}
                              >
                                {color}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="border-b pb-3">
                    <button
                      className="flex items-center justify-between w-full text-left"
                      onClick={() => toggleAccordion("sizes")}
                    >
                      <h3 className="font-medium">Sizes</h3>
                      {openAccordion === "sizes" ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>

                    <AnimatePresence>
                      {openAccordion === "sizes" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-wrap gap-2 mt-3">
                            {sizeOptions.map((size) => (
                              <button
                                key={size}
                                onClick={() => toggleSizeFilter(size)}
                                className={`h-8 w-8 flex items-center justify-center text-xs rounded-full transition-colors ${
                                  sizeFilter.includes(size)
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="border-b pb-3">
                    <button
                      className="flex items-center justify-between w-full text-left"
                      onClick={() => toggleAccordion("options")}
                    >
                      <h3 className="font-medium">Other Options</h3>
                      {openAccordion === "options" ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>

                    <AnimatePresence>
                      {openAccordion === "options" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-3 mt-3">
                            <div className="flex items-center justify-between">
                              <label className="text-sm">On Sale Only</label>
                              <Switch
                                checked={onSaleOnly}
                                onCheckedChange={setOnSaleOnly}
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <label className="text-sm">In Stock Only</label>
                              <Switch
                                checked={inStockOnly}
                                onCheckedChange={setInStockOnly}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="mt-8">
                  <Button
                    variant="outline"
                    className="w-full mb-3"
                    onClick={() => {
                      setSortBy("newest");
                      setColorFilter([]);
                      setSizeFilter([]);
                      setPriceFilter([0, 200]);
                      setOnSaleOnly(false);
                      setInStockOnly(false);
                    }}
                  >
                    Reset Filters
                  </Button>
                  <SheetClose asChild>
                    <Button className="w-full">Apply Filters</Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex items-center gap-2">
              <div className="text-sm text-muted-foreground">
                {filteredProducts.length} products
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="text-sm p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
              >
                <option value="newest">Newest</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Main content with desktop sort dropdown positioned correctly */}
          <div className="flex-1">
            <div className="hidden lg:flex justify-end mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="text-sm p-2 border rounded-md dark:bg-forest-green dark:border-gray-700"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-muted-foreground">
                  No products match your current filters.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSortBy("newest");
                    setColorFilter([]);
                    setSizeFilter([]);
                    setPriceFilter([0, 200]);
                    setOnSaleOnly(false);
                    setInStockOnly(false);
                  }}
                >
                  Reset Filters
                </Button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
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
                            hoveredProductId === product.id
                              ? "scale-105"
                              : "scale-100"
                          }`}
                        />

                        {product.isNew && (
                          <div className="absolute top-4 left-4 bg-black text-white text-xs font-medium px-2 py-1 rounded">
                            New
                          </div>
                        )}

                        <div
                          className={`absolute inset-0 bg-black/20 flex items-end justify-center p-4 transition-opacity duration-300 ${
                            hoveredProductId === product.id
                              ? "opacity-100"
                              : "opacity-0"
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
                        <Link
                          href={`/product/${product.id}`}
                          className="block group"
                        >
                          <h3 className="font-medium group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-muted-foreground text-sm mt-1">
                            {product.category}
                          </p>
                          <p className="mt-2 font-medium">
                            ${product.price.toFixed(2)}
                          </p>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

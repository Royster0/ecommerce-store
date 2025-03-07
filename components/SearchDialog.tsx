"use client";

import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { featuredProducts, Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@/components/ui/visually-hidden";

interface SearchDialogProps {
  className?: string;
}

export function SearchDialog({ className }: SearchDialogProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when dialog opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery(""); // Clear search on dialog close
    }
  }, [open]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // CMD+K or CTRL+K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }

      // ESC to close
      if (e.key === "Escape" && open) {
        setSearchQuery("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, setOpen]);

  // Perform search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase().trim();

    const results = featuredProducts.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(query);
      const categoryMatch = product.category.toLowerCase().includes(query);
      const descriptionMatch = product.description
        ?.toLowerCase()
        .includes(query);

      return nameMatch || categoryMatch || descriptionMatch;
    });

    setSearchResults(results);
  }, [searchQuery]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex items-center">
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search"
            className={cn("relative", className)}
          >
            <Search size={20} />
          </Button>
        </DialogTrigger>
        <span className="hidden sm:flex items-center text-xs text-muted-foreground ml-1">
          <kbd className="flex h-5 items-center gap-0.5 border px-1.5 text-[10px] font-medium">
            <span className="text-xs">⌘</span>K
          </kbd>
        </span>
      </div>
      <DialogContent className="sm:max-w-[600px] p-0 dark:border-gray-800 dark:bg-[#1a1b1e]">
        <DialogTitle asChild>
          <VisuallyHidden>Search Products</VisuallyHidden>
        </DialogTitle>
        <div className="relative flex items-center p-4 border-b dark:border-gray-800">
          <Search className="h-5 w-5 absolute left-6 text-muted-foreground" />
          <Input
            ref={inputRef}
            placeholder="Search products..."
            className="pl-10 border-none shadow-none focus-visible:ring-0 text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-6"
              onClick={() => setSearchQuery("")}
            >
              <X size={16} />
            </Button>
          )}
        </div>

        <div className="px-2 py-4 max-h-[60vh] overflow-y-auto">
          <AnimatePresence>
            {searchQuery && searchResults.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8 text-muted-foreground"
              >
                No products found for &quot;{searchQuery}&quot;
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2">
                {searchResults.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={`/product/${product.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-4 p-2 hover:bg-accent group"
                    >
                      <div className="relative h-16 w-16 overflow-hidden bg-secondary">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium group-hover:text-primary transition-colors line-clamp-1">
                          {product.name}
                        </h4>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-muted-foreground capitalize">
                            {product.category}
                          </p>
                          <p className="font-medium">
                            ${product.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}

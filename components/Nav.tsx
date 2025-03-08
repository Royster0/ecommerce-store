"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { SearchDialog } from "@/components/SearchDialog";
import { useCart } from "@/lib/cart";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [textShadowClass, setTextShadowClass] = useState("text-shadow-sm");
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { cart } = useCart();

  // After mounting, access the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize values for text shadow based on initial state
  useEffect(() => {
    // Initialize the text shadow based on scroll position and current page
    setTextShadowClass(!scrolled && isHomePage ? "text-shadow-sm" : "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHomePage]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
        // Apply text shadow only on home page when not scrolled
        setTextShadowClass(isScrolled || !isHomePage ? "" : "text-shadow-sm");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled, isHomePage]);

  const navbarVariants = {
    top: {
      backgroundColor: "rgba(255, 255, 255, 0)",
      boxShadow: "none",
      borderBottom: "none",
    },
    scrolled: {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      borderBottom: "1px solid rgba(229, 231, 235, 0.8)",
    },
  };

  const darkNavbarVariants = {
    top: {
      backgroundColor: "rgba(30, 41, 35, 0)",
      boxShadow: "none",
      borderBottom: "none",
    },
    scrolled: {
      backgroundColor: "rgba(30, 41, 35, 0.9)",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
      borderBottom: "1px solid rgba(47, 76, 57, 0.3)",
    },
  };

  const categories = [
    { name: "Shirts", path: "/category/shirts" },
    { name: "Pants", path: "/category/pants" },
    { name: "Hoodies", path: "/category/hoodies" },
    { name: "Accessories", path: "/category/accessories" },
    { name: "About", path: "/about" },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 ${
        isHomePage && !scrolled ? "text-white" : "text-foreground"
      } dark:text-white ${textShadowClass} ${
        scrolled ? "backdrop-blur-sm" : ""
      }`}
      initial="top"
      animate={scrolled ? "scrolled" : "top"}
      variants={
        mounted && theme === "dark" ? darkNavbarVariants : navbarVariants
      }
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <motion.div
            className={`text-2xl font-semibold tracking-tight font-display ${
              isHomePage && !scrolled
                ? "text-white"
                : "text-forest-green dark:text-sage-green"
            }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Atelier Luxe
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <motion.nav
          className="hidden md:flex space-x-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.path}
              className={`text-sm font-medium transition-colors ${
                isHomePage && !scrolled
                  ? "hover:text-gray-200"
                  : "text-earth-gray dark:text-gray-400 hover:text-forest-green dark:hover:text-sage-green"
              }`}
            >
              <motion.span
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {category.name}
              </motion.span>
            </Link>
          ))}
        </motion.nav>

        {/* Icons (only Search and Cart shown on mobile) */}
        <motion.div
          className="flex items-center space-x-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ThemeToggle
            className={`hidden md:flex ${
              isHomePage && !scrolled
                ? "text-white hover:text-primary hover:bg-transparent"
                : "hover:text-primary hover:bg-transparent"
            }`}
          />
          <SearchDialog
            className={
              isHomePage && !scrolled
                ? "text-white hover:text-primary hover:bg-transparent"
                : "hover:text-primary hover:bg-transparent"
            }
          />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Account"
            className={`hidden md:flex ${
              isHomePage && !scrolled
                ? "text-white hover:text-primary hover:bg-transparent"
                : "hover:text-primary hover:bg-transparent"
            }`}
          >
            <User size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Cart"
            className={
              isHomePage && !scrolled
                ? "text-white hover:text-primary hover:bg-transparent"
                : "hover:text-primary hover:bg-transparent"
            }
            asChild
          >
            <Link href="/cart" className="relative">
              <ShoppingBag size={20} />
              {cart.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cart.itemCount}
                </span>
              )}
            </Link>
          </Button>

          {/* Mobile Menu Trigger - Now on the right */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="outline"
                size="icon"
                className={
                  isHomePage && !scrolled
                    ? "text-white border-none bg-white/30 hover:text-white hover:bg-white/10"
                    : ""
                }
              >
                <Menu size={20} />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-forest-green/20 bg-beige dark:border-forest-green/20 dark:bg-deep-forest"
            >
              <div className="flex flex-col space-y-4 mt-8">
                <Link
                  href="/"
                  className="text-lg font-semibold mb-6 text-forest-green dark:text-sage-green font-display"
                >
                  Atelier Luxe
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.path}
                    className="py-2 text-sm font-medium text-earth-gray dark:text-gray-400 hover:text-forest-green dark:hover:text-sage-green transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
                <div className="flex items-center py-2">
                  <span className="text-sm font-medium text-earth-gray dark:text-gray-400 mr-2">
                    Account
                  </span>
                </div>
                <div className="pt-4 mt-4 border-t border-forest-green/20 dark:border-forest-green/20">
                  <ThemeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </motion.div>
      </div>
    </motion.header>
  );
};

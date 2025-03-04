"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Twitter, Facebook, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary dark:bg-[#1a1b1e] px-6 py-12 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h4 className="text-lg font-semibold mb-4">Atelier Luxe</h4>
          <p className="text-sm text-muted-foreground">
            Redefining modern fashion with timeless elegance and sustainable
            craftsmanship. Our premium clothing and accessories embody luxury
            for the discerning individual.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h4 className="text-lg font-semibold mb-4">Shop</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/category/shirts"
                className="text-sm hover:text-primary transition-colors"
              >
                Shirts
              </Link>
            </li>
            <li>
              <Link
                href="/category/pants"
                className="text-sm hover:text-primary transition-colors"
              >
                Pants
              </Link>
            </li>
            <li>
              <Link
                href="/category/hoodies"
                className="text-sm hover:text-primary transition-colors"
              >
                Hoodies
              </Link>
            </li>
            <li>
              <Link
                href="/category/accessories"
                className="text-sm hover:text-primary transition-colors"
              >
                Accessories
              </Link>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h4 className="text-lg font-semibold mb-4">Help</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/customer-service"
                className="text-sm hover:text-primary transition-colors"
              >
                Customer Service
              </Link>
            </li>
            <li>
              <Link
                href="/shipping"
                className="text-sm hover:text-primary transition-colors"
              >
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link
                href="/size-guide"
                className="text-sm hover:text-primary transition-colors"
              >
                Size Guide
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="text-sm hover:text-primary transition-colors"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h4 className="text-lg font-semibold mb-4">Connect</h4>
          <div className="flex space-x-4 mb-4">
            <Link
              href="https://instagram.com"
              className="hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </Link>
            <Link
              href="https://twitter.com"
              className="hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </Link>
            <Link
              href="https://facebook.com"
              className="hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </Link>
            <Link
              href="mailto:contact@atelierluxe.com"
              className="hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            Subscribe to our newsletter for exclusive offers and fashion
            updates.
          </p>
          <form className="mt-2 flex">
            <input
              type="email"
              placeholder="Your email"
              className="bg-background px-3 py-2 text-sm rounded-l-md w-full focus:outline-none border dark:border-gray-700"
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-4 py-2 text-sm rounded-r-md hover:bg-primary/90 transition-colors"
            >
              Join
            </button>
          </form>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-border dark:border-[#2a2b2f]">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Atelier Luxe. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              href="/privacy-policy"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

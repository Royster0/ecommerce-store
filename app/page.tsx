"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import FeaturedProducts from "@/components/FeaturedProducts";

const heroImages = [
  {
    src: "/hero1.jpg",
    alt: "Fashion model in Atelier Luxe attire",
    title: "Elevate Your Style",
    subtitle: "Discover our new collection of premium essentials",
  },
  {
    src: "/hero2.jpg",
    alt: "Fashion model in Atelier Luxe attire",
    title: "Elevate Your Style",
    subtitle: "Discover our new collection of premium essentials",
  },
];

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Full-screen Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="relative h-full w-full">
              <Image
                src={heroImages[currentImageIndex].src}
                alt={heroImages[currentImageIndex].alt}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
          <motion.div
            className="max-w-3xl mx-auto text-white"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${currentImageIndex}`}
                className="text-4xl md:text-6xl font-medium mb-6 font-display"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {heroImages[currentImageIndex].title}
              </motion.h1>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p
                key={`subtitle-${currentImageIndex}`}
                className="text-lg md:text-xl max-w-xl mx-auto mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {heroImages[currentImageIndex].subtitle}
              </motion.p>
            </AnimatePresence>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-white text-forest-green hover:bg-white/90 border border-forest-green/20"
              >
                <Link href="/category/featured">Explore Collection</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-forest-green text-white hover:bg-forest-green/90"
              >
                <Link href="/about">Our Story</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Dots navigation */}
        <div className="absolute bottom-10 left-0 right-0">
          <div className="flex justify-center gap-3">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 transition-all ${
                  currentImageIndex === index ? "bg-white w-6" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-medium mb-4 font-display text-forest-green dark:text-sage-green">
              Featured Collection
            </h2>
            <p className="text-earth-gray dark:text-gray-400 max-w-xl mx-auto">
              Curated pieces that define modern elegance and timeless style,
              crafted with exceptional materials and attention to detail.
            </p>
          </motion.div>

          <FeaturedProducts />

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button asChild className="group">
              <Link href="/category/featured" className="flex items-center">
                View All Featured Items
                <ChevronRight
                  size={16}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Collections Showcase */}
      <section className="py-20 px-6 bg-beige dark:bg-deep-forest">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-medium mb-4 font-display text-forest-green dark:text-sage-green">
              Shop By Category
            </h2>
            <p className="text-earth-gray dark:text-gray-400 max-w-xl mx-auto">
              Explore our curated collections for every occasion and style
              preference.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Shirts", "Pants", "Hoodies", "Accessories"].map(
              (category, index) => (
                <motion.div
                  key={category}
                  className="relative overflow-hidden aspect-[3/4] group border border-forest-green/20 dark:border-forest-green/20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Image
                    src={`/placeholder.png`}
                    alt={`${category} category`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-medium mb-2 font-display">
                      {category}
                    </h3>
                    <Link
                      href={`/category/${category.toLowerCase()}`}
                      className="text-white/90 text-sm hover:text-white flex items-center"
                    >
                      Shop Now
                      <ChevronRight
                        size={14}
                        className="ml-1 transition-transform group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Newsletter & Special Offer */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-beige p-10 md:p-16 border border-forest-green/20 dark:bg-deep-forest dark:border-forest-green/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-medium mb-4 font-display text-forest-green dark:text-sage-green">
                  Join Our Community
                </h2>
                <p className="mb-6 text-earth-gray dark:text-gray-400">
                  Subscribe to our newsletter and be the first to know about new
                  collections, exclusive offers, and styling inspiration.
                </p>
                <form className="flex flex-col sm:flex-row gap-3 max-w-md">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="bg-white px-4 py-3 flex-grow focus:outline-none border border-forest-green/20 dark:border-forest-green/20"
                    required
                  />
                  <Button
                    type="submit"
                    className="bg-forest-green text-white hover:bg-forest-green/90 dark:bg-forest-dark"
                  >
                    Subscribe
                  </Button>
                </form>
              </motion.div>

              <motion.div
                className="bg-warm-tan p-8 border border-forest-green/20 text-center dark:bg-forest-dark dark:border-forest-green/20"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-medium mb-2 font-display text-forest-green dark:text-sage-green">
                  First Order Offer
                </h3>
                <p className="text-5xl font-medium mb-4 font-display text-forest-green dark:text-sage-green">
                  20% OFF
                </p>
                <p className="mb-6 text-sm text-earth-gray dark:text-gray-400">
                  Use code{" "}
                  <span className="font-medium text-forest-green dark:text-sage-green">
                    WELCOME20
                  </span>{" "}
                  at checkout
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="border-forest-green text-forest-green hover:bg-forest-green hover:text-white dark:border-sage-green dark:text-sage-green dark:hover:bg-sage-green dark:hover:text-deep-forest"
                >
                  <Link href="/category/featured">Shop Now</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

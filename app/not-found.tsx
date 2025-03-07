"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-24">
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-8xl font-medium mb-6 font-display">404</h1>
        <h2 className="text-2xl font-medium mb-4 font-display">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/">
              <ArrowLeft size={16} />
              Return Home
            </Link>
          </Button>
          <Button asChild>
            <Link href="/category/featured">Continue Shopping</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

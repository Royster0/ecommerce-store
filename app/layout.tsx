import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Nav";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CartProvider } from "@/lib/cart";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Atelier Luxe",
  description: "High-quality apparel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <CartProvider>
            <Navbar />
            {children}
            <Footer />
            <Toaster />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

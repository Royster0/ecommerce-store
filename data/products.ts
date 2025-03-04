// Mock data for products

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  isNew: boolean;
  description?: string;
  colors?: string[];
  sizes?: string[];
  inStock?: boolean;
  onSale?: boolean;
  rating?: number;
}

export const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Slim Fit Cotton Shirt",
    price: 89.99,
    category: "shirts",
    image: "/placeholder.png",
    isNew: true,
    description:
      "Crafted from premium cotton, this slim-fit shirt offers both comfort and elegance. Perfect for formal occasions or a polished casual look.",
    colors: ["White", "Blue", "Black"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Tailored Wool Trousers",
    price: 129.99,
    category: "pants",
    image: "/placeholder.png",
    isNew: true,
    description:
      "These tailored wool trousers combine timeless style with modern comfort. The perfect foundation for your professional wardrobe.",
    colors: ["Black", "Gray", "Navy"],
    sizes: ["29", "30", "32", "34", "36"],
    inStock: true,
    rating: 4.7,
  },
  {
    id: 3,
    name: "Cashmere Blend Hoodie",
    price: 159.99,
    category: "hoodies",
    image: "/placeholder.png",
    isNew: false,
    description:
      "Luxurious cashmere blend hoodie offering exceptional warmth and softness. Elevate your casual wear with this premium essential.",
    colors: ["Gray", "Black", "Beige"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    onSale: true,
    rating: 4.9,
  },
  {
    id: 4,
    name: "Leather Card Holder",
    price: 49.99,
    category: "accessories",
    image: "/placeholder.png",
    isNew: false,
    description:
      "Minimalist leather card holder with multiple slots. Made from full-grain leather that develops a beautiful patina over time.",
    colors: ["Brown", "Black"],
    inStock: true,
    rating: 4.6,
  },
  {
    id: 5,
    name: "Premium Linen Shirt",
    price: 99.99,
    category: "shirts",
    image: "/placeholder.png",
    isNew: true,
    description:
      "Breathable linen shirt perfect for warmer days. Relaxed fit with natural texture for a sophisticated casual look.",
    colors: ["White", "Blue", "Beige"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    rating: 4.7,
  },
  {
    id: 6,
    name: "Merino Wool Beanie",
    price: 39.99,
    category: "accessories",
    image: "/placeholder.png",
    isNew: false,
    description:
      "Ultra-soft merino wool beanie providing superior warmth without bulk. A winter essential with a clean, modern design.",
    colors: ["Gray", "Black", "Navy", "Burgundy"],
    inStock: true,
    onSale: true,
    rating: 4.8,
  },
  {
    id: 7,
    name: "Minimalist Denim Jacket",
    price: 149.99,
    category: "hoodies",
    image: "/placeholder.png",
    isNew: true,
    description:
      "Contemporary denim jacket with clean lines and minimal detailing. Versatile layering piece for year-round style.",
    colors: ["Blue", "Black", "Gray"],
    sizes: ["S", "M", "L", "XL"],
    inStock: false,
    rating: 4.5,
  },
  {
    id: 8,
    name: "Relaxed Fit Chinos",
    price: 89.99,
    category: "pants",
    image: "/placeholder.png",
    isNew: false,
    description:
      "Comfortable relaxed fit chinos made from soft, durable cotton twill. Perfect for both work and weekend wear.",
    colors: ["Khaki", "Navy", "Olive", "Black"],
    sizes: ["30", "32", "34", "36", "38"],
    inStock: true,
    rating: 4.6,
  },
  {
    id: 9,
    name: "Oxford Button-Down Shirt",
    price: 95.99,
    category: "shirts",
    image: "/placeholder.png",
    isNew: false,
    description:
      "Classic Oxford button-down shirt made from premium cotton. A timeless essential for any well-rounded wardrobe.",
    colors: ["White", "Blue", "Pink"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    rating: 4.7,
  },
  {
    id: 10,
    name: "Leather Belt",
    price: 69.99,
    category: "accessories",
    image: "/placeholder.png",
    isNew: false,
    description:
      "Full-grain leather belt with subtle brass buckle. Handcrafted for durability and refined style.",
    colors: ["Brown", "Black"],
    sizes: ["32", "34", "36", "38", "40"],
    inStock: true,
    rating: 4.9,
  },
  {
    id: 11,
    name: "Cashmere Crewneck Sweater",
    price: 179.99,
    category: "hoodies",
    image: "/placeholder.png",
    isNew: true,
    description:
      "Luxurious cashmere sweater with a classic crewneck design. Exceptionally soft and warm for everyday elegance.",
    colors: ["Gray", "Navy", "Burgundy", "Camel"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    rating: 4.8,
  },
  {
    id: 12,
    name: "Selvedge Denim Jeans",
    price: 139.99,
    category: "pants",
    image: "/placeholder.png",
    isNew: false,
    description:
      "Premium selvedge denim jeans with a slim-straight fit. Crafted for outstanding durability and personalized wear patterns.",
    colors: ["Indigo", "Black"],
    sizes: ["29", "30", "31", "32", "33", "34", "36"],
    inStock: true,
    rating: 4.9,
  },
  {
    id: 13,
    name: "Silk Pocket Square",
    price: 34.99,
    category: "accessories",
    image: "/placeholder.png",
    isNew: false,
    description:
      "Hand-rolled silk pocket square with refined pattern. The perfect finishing touch for formal and business attire.",
    colors: ["Navy/Red", "Black/White", "Burgundy/Blue"],
    inStock: true,
    onSale: true,
    rating: 4.5,
  },
  {
    id: 14,
    name: "Lightweight Linen Blazer",
    price: 199.99,
    category: "shirts",
    image: "/placeholder.png",
    isNew: true,
    description:
      "Unstructured linen blazer perfect for warm-weather occasions. Breathable fabric with a natural texture.",
    colors: ["Beige", "Navy", "Olive"],
    sizes: ["38", "40", "42", "44", "46"],
    inStock: true,
    rating: 4.7,
  },
  {
    id: 15,
    name: "Merino Wool Scarf",
    price: 59.99,
    category: "accessories",
    image: "/placeholder.png",
    isNew: false,
    description:
      "Soft merino wool scarf providing luxurious warmth. A versatile accessory for colder months.",
    colors: ["Gray", "Navy", "Burgundy", "Black"],
    inStock: true,
    rating: 4.8,
  },
  {
    id: 16,
    name: "Logo Embroidered Sweatshirt",
    price: 119.99,
    category: "hoodies",
    image: "/placeholder.png",
    isNew: false,
    description:
      "Premium cotton sweatshirt with subtle logo embroidery. Comfortable fit with ribbed cuffs and hem.",
    colors: ["Gray", "Black", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    onSale: true,
    rating: 4.6,
  },
];

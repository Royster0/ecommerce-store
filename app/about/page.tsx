import React from "react";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Atelier Luxe",
  description: "Our story, mission, and commitment to quality craftsmanship.",
};

export default function AboutPage() {
  return (
    <main className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero2.jpg"
            alt="Atelier workshop"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-4 font-medium text-shadow-sm">
            Our Story
          </h1>
          <p className="text-white/90 max-w-2xl text-lg md:text-xl">
            Founded on principles of quality craftsmanship and timeless design
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="font-display text-3xl font-medium mb-6 text-forest-green dark:text-sage-green">Our Mission</h2>
            <p className="text-earth-gray dark:text-gray-400 mb-4">
              At Atelier Luxe, we believe that true luxury lies in the perfect balance of form and function. 
              Our mission is to create apparel that transcends seasonal trends, offering timeless pieces that 
              become integral to your personal style journey.
            </p>
            <p className="text-earth-gray dark:text-gray-400">
              Each garment we produce represents our commitment to exceptional quality, 
              thoughtful design, and meticulous attention to detail. We source the finest 
              materials and work with skilled artisans who share our passion for craftsmanship.
            </p>
          </div>
          <div className="md:w-1/2 h-[400px] relative border-b-2 border-forest-green shadow-md">
            <div className="absolute inset-0 bg-warm-tan dark:bg-forest-dark"></div>
            <Image 
              src="/placeholder.png" 
              alt="Atelier workshop" 
              fill 
              className="object-cover mix-blend-multiply opacity-90"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-beige dark:bg-background py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-display text-3xl font-medium mb-12 text-center text-forest-green dark:text-sage-green">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality",
                description: "We never compromise on materials or construction, ensuring every piece will stand the test of time.",
              },
              {
                title: "Sustainability",
                description: "We're committed to ethical production practices and reducing our environmental footprint.",
              },
              {
                title: "Craftsmanship",
                description: "Our artisans bring decades of experience to every stitch and detail of our garments.",
              },
            ].map((value, index) => (
              <div key={index} className="p-6 bg-white dark:bg-card shadow-md border-t-2 border-forest-green">
                <h3 className="font-display text-xl font-medium mb-3 text-forest-green dark:text-sage-green">{value.title}</h3>
                <p className="text-earth-gray dark:text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="font-display text-3xl font-medium mb-12 text-center text-forest-green dark:text-sage-green">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Claire Dumont",
              role: "Creative Director",
              bio: "With over 15 years in luxury fashion, Claire brings her visionary approach to every collection.",
            },
            {
              name: "Marcus Chen",
              role: "Head of Design",
              bio: "Marcus combines traditional techniques with contemporary aesthetics to create our signature style.",
            },
            {
              name: "Sophia Rivera",
              role: "Production Manager",
              bio: "Sophia ensures our ethical manufacturing standards are upheld throughout our production process.",
            },
          ].map((member, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-40 h-40 bg-clay dark:bg-card mb-6 relative border border-forest-green/20">
                <div className="absolute inset-0 shadow-md"></div>
              </div>
              <h3 className="font-display text-xl font-medium mb-1">{member.name}</h3>
              <p className="text-forest-green dark:text-sage-green mb-3 text-sm font-medium">{member.role}</p>
              <p className="text-earth-gray dark:text-gray-400 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-beige dark:bg-background py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-medium mb-6 text-forest-green dark:text-sage-green">Experience Atelier Luxe</h2>
          <p className="text-earth-gray dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            We invite you to explore our collections and experience the difference that 
            thoughtful design and quality craftsmanship make.
          </p>
          <a 
            href="/category/all" 
            className="inline-flex h-10 items-center justify-center px-6 py-2 bg-forest-green text-white dark:bg-forest-dark shadow-md hover:bg-forest-green/90 dark:hover:bg-forest-dark/90 transition-colors"
          >
            Explore Our Collections
          </a>
        </div>
      </section>
    </main>
  );
}
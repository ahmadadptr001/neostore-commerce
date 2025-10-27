'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import React from 'react';

const products = [
  {
    id: 1,
    name: "Plant A",
    image: "https://images.unsplash.com/photo-1761405378292-30f64ad6f60b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8&w=400",
  },
  {
    id: 2,
    name: "Plant B",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400",
  },
  {
    id: 3,
    name: "Plant C",
    image: "https://images.unsplash.com/photo-1761123489272-ab7534a498d8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=40&w=400",
  },
];

export default function Landing() {
  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-green-400 to-green-700 flex flex-col justify-center items-center text-center overflow-hidden">
      {/* Animated Floating Products */}
      {products.map((product, index) => (
        <img
          key={product.id}
          src={product.image}
          alt={product.name}
          className={`absolute w-32 md:w-48 rounded-lg shadow-xl animate-float-${
            index + 1
          }`}
          style={{
            top: `${10 + index * 20}%`,
            left: `${20 + index * 25}%`,
          }}
        />
      ))}

      {/* Main Text */}
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-slideDown">
        Selamat Datang di NeoStore
      </h1>
      <p className="text-lg md:text-2xl text-white/90 mb-8 animate-slideDown delay-200">
        Temukan Produk Tanaman Terbaik untuk Rumahmu
      </p>

      {/* Button */}
      <Link
        href="/home"
        className="px-8 py-4 flex items-center gap-2 bg-white text-green-700 font-bold rounded-full shadow-lg hover:scale-105 transition-transform animate-slideUp delay-400"
      >
        Mulai <ArrowRight />
      </Link>
    </div>
  );
}

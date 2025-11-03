'use client';
import { getAllProducts } from '../services/products';
import { bestSelling } from '../utils/products';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function BestSellingProducts() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryRef = useRef(null);

  useEffect(() => {
    (async () => {
      let products = await getAllProducts();
      if (products === 'Network Error') products = [];
      const bestSellingFilterProducts = bestSelling(products);
      setItems(bestSellingFilterProducts);
    })();
  }, []);

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
      galleryRef.current?.scrollTo({
        left: (activeIndex + 1) * 280,
        behavior: 'smooth',
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [items, activeIndex]);

  const scrollBy = (offset) => {
    galleryRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <section className="container mx-auto px-4 py-12 mt-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div className="max-w-md">
          <h2 className="text-2xl md:text-3xl font-bold">🔥 Best Selling Products</h2>
          <p className="mt-3 text-gray-500 text-sm md:text-base leading-relaxed">
            Discover & buy the most popular products at NeoStore and make your shopping easier than ever.
          </p>
        </div>
        <Link
          href="/products"
          className="btn btn-lg w-fit text-white bg-gradient-to-r from-purple-600 to-pink-500 mt-6 md:mt-0 flex items-center gap-2"
        >
          See More <ArrowRight size={15} />
        </Link>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Arrows */}
        <button
          onClick={() => scrollBy(-300)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow rounded-full p-2 hidden md:block"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => scrollBy(300)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow rounded-full p-2 hidden md:block"
        >
          <ChevronRight />
        </button>

        <div
          ref={galleryRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide px-2"
        >
          {items.map((item, i) => (
            <div
              key={i}
              className={`relative min-w-[220px] md:min-w-[280px] snap-center group cursor-pointer transition-transform duration-500 ${
                activeIndex === i ? 'scale-105 shadow-xl' : 'scale-95 opacity-90'
              }`}
              onClick={() => router.push('/products/details/' + item.id)}
            >
              {/* Image Card */}
              <div className="relative h-60 md:h-72 rounded-xl overflow-hidden shadow-md group-hover:shadow-2xl group-hover:scale-[1.03] transition-all duration-500">
                <Image
                  src={item.images[0]}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  draggable={false}
                />
              </div>

              {/* Card Body */}
              <div className="p-3 text-center md:text-left">
                <h3 className="font-semibold text-sm sm:text-base line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm sm:text-base">$ {item.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-6 gap-2">
          {items.map((_, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full transition ${
                activeIndex === i ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

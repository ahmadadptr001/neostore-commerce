'use client';
import { getAllProducts } from '../services/products';
import { bestSelling } from '../utils/products';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function BestSellingProducts() {
  const router = useRouter();
  const [items, setItmes] = useState([]);

  useEffect(() => {
    (async () => {
      let products = await getAllProducts();
      if (products == 'Network Error') {
        products = [];
      }
      const bestSellingFilterProducts = bestSelling(products);
      setItmes(bestSellingFilterProducts);
    })();
  }, []);

  const galleryRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - galleryRef.current.offsetLeft);
    setScrollLeft(galleryRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - galleryRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // kecepatan scroll
    galleryRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6 md:gap-10 mt-10">
      <div className="flex-1 md:max-w-[300px] text-right sm:text-left p-4 max-w-md ms-auto">
        <h2 className="text-2xl md:text-3xl font-bold">
          Best Selling Products
        </h2>
        <p className="mt-3 text-gray-500 text-sm md:text-base leading-relaxed">
          Discover & buy the most popular products at Neostore and make your
          shopping easier than ever.
        </p>
        <button className="btn btn-lg text-white bg-primary-new mt-6 flex items-center gap-2 ms-auto sm:mx-0">
          See More <ArrowRight size={15} />
        </button>
      </div>

      <div
        ref={galleryRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`px-5 scrollbar-hide flex gap-4 overflow-x-auto scrollbar-hide select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        } md:flex-1`}
      >
        {items &&
          items.map((item, i) => (
            <div
              key={i}
              className="block min-w-[150px] sm:min-w-[220px] md:min-w-[250px]"
              onClick={() => router.push('/products/details/' + item.id)}
            >
              {/* Image Card */}
              <div className="relative h-50 sm:h-60 md:h-64 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 shadow-sm hover:shadow-md transition">
                <Image
                  src={item.images[0]}
                  alt={`gambar ke-${i}`}
                  fill
                  className="object-cover"
                  draggable={false}
                />
              </div>

              {/* Card Body */}
              <div className="p-3 sm:p-4 text-center md:text-left">
                <h3 className="font-semibold text-sm sm:text-base line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm sm:text-base">
                  $ {item.price}
                </p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

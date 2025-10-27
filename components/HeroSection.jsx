import { Minus, Search } from 'lucide-react';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="bg-[#C1DCDC] rounded-xl mx-auto mt-5 container p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
      {/* Teks Hero */}
      <div className="flex flex-col justify-center space-y-6">
        <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight text-gray-800">
          Shop Your Dream Finds
        </h1>

        {/* Statistik */}
        <div className="flex items-center justify-start gap-2">
          <div className="flex flex-col items-center sm:items-start">
            <span className="text-2xl font-bold text-gray-800">20+</span>
            <span className="text-sm sm:text-base text-gray-600">
              Categories
            </span>
          </div>

          {/* Divider */}
          <Minus className="rotate-90 w-8 sm:w-10 text-gray-500" />

          <div className="flex flex-col items-center sm:items-start">
            <span className="text-2xl font-bold text-gray-800">100+</span>
            <span className="text-sm sm:text-base text-gray-600">
              Customers
            </span>
          </div>
        </div>

        {/* Search Box */}
        <div className="bg-white w-fit flex items-center justify-between gap-26 sm:gap-4 p-3 sm:p-4 rounded-lg shadow-md sm:w-[90%] lg:w-[80%]">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="flex-1 text-sm sm:text-base outline-none border-none bg-transparent placeholder-gray-500"
          />
          <button className="bg-primary-new p-2 sm:p-3 rounded-lg hover:bg-[#a8cbcb] transition">
            <Search size={18} className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* Gambar Hero */}
      <div className="relative w-full h-60 sm:h-80 lg:h-[400px] hidden lg:block">
        <Image
          src="/hero-image.png"
          alt="NeoTstore hero"
          fill
          className="object-contain rounded-lg"
          priority
        />
      </div>
    </section>
  );
}

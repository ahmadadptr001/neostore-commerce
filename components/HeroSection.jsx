import { Minus, Search } from 'lucide-react';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 w-full p-12 bg-[#2563EB] gap-4">
      {/* teks hero */}
      <div className="flex flex-col gap-4 text-white justify-center order-2 md:order-1">
        <h2 className='text-5xl font-bold'>Summer Sale</h2>
        <p>Up to 70% off on selected items. Limited time offer!</p>
        <div className="flex items-center flex-nowrap gap-2">
          <button className='btn bg-white text-[#2563EB] rounded-md p-4'>Shop Now</button>
          <button className='btn hover:bg-white border-2 border-white bg-[#2563EB] text-white hover:text-[#2563EB] rounded-md p-4'>Learn More</button>
        </div>
      </div>

      {/* image hero */}
      <div className="relative order-1 md:order-2">
        <img src="/hero-image.png" alt="hero-image" className='w-full object-cover rounded-xl'/>
      </div>
    </section>
  );
}

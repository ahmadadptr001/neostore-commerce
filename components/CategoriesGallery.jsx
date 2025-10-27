'use client';
import RollingGallery from '@/UI/RollingGallery/RollingGallery';
import { ArrowRight } from 'lucide-react';

export default function CateoriesGallery() {
  return (
    <section className="p-6 my-7 mt-12 bg-black grid grid-cols-1 sm:grid-cols-2 gap-8">
      <div className="order-1 sm:order-2 mt-5">
        <h3 className="text-white text-4xl">Categories</h3>
        <p className="text-gray-500 mt-1">
          Browse through different product categories to find what you need
        </p>
        <button className="btn btn-lg bg-primary-new mt-10">
          Explore <ArrowRight />
        </button>
      </div>
      <div className="max-w-xl order-2 sm:order-1">
        <RollingGallery autoplay={true} pauseOnHover={true} />
      </div>
    </section>
  );
}

'use client'
import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center text-center bg-blue-800">
      {/* Background Image */}
      <Image
        src="/hero-image.png"
        alt="Hero Background"
        fill
        priority
        className="object-cover object-[center_top] md:object-center"
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-blue-900/60 via-indigo-800/50 to-purple-700/50" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          Summer Sale
        </h1>
        <p className="text-gray-100 text-base md:text-lg mb-8">
          Up to 70% off on selected items. Limited time offer!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <button className="bg-white text-blue-700 px-8 py-3 rounded-full font-bold shadow hover:bg-gray-100 transition">
              Shop Now
            </button>
          </Link>
          <Link href="/learn">
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-blue-700 transition">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

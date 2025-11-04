'use client'
import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center text-center">
      {/* Background Image */}
      <Image
        src="/hero-image.png"
        alt="Hero Background"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-700/30 to-indigo-600/30" />

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
          <button className="btn btn-secondary btn-lg">
              Shop Now
          </button>
          </Link>
          <Link href="/learn">
          <button className="btn btn-secondary btn-lg btn-soft">
              Learn More
          </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

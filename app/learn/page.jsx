// src/app/(info)/learn-more/page.tsx
'use client';

import { ShieldCheck, Rocket, Smartphone, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LearnMorePage() {
  return (
    <main className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center text-center">
        <Image
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=80"
          alt="NeoStore Hero"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-700/70 to-pink-600/70" />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h1 className="text-5xl font-extrabold text-white mb-6">
            Shopping Made Effortless
          </h1>
          <p className="text-gray-100 text-lg mb-8">
            Experience blazing-fast performance, secure checkout, and a responsive design built for everyone.
          </p>
          <Link href="https://neostore-commerce.vercel.app/">
            <button className="bg-white text-purple-700 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-gray-100 transition">
              Shop Now
            </button>
          </Link>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose NeoStore?</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          {[
            { icon: Rocket, title: 'Fast Performance', desc: 'Next.js powered for instant loads.' },
            { icon: ShieldCheck, title: 'Secure Checkout', desc: 'Safe payments with modern standards.' },
            { icon: Smartphone, title: 'Mobile Ready', desc: 'Optimized for all devices.' },
            { icon: ShoppingBag, title: 'Modern UI/UX', desc: 'Clean, interactive, and user-friendly.' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-xl transition">
              <item.icon className="mx-auto text-purple-600 mb-4" size={40} />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Image + Content */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1200&q=80"
              alt="NeoStore Showcase"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Seamless Shopping Journey</h2>
            <p className="text-gray-600 mb-6">
              NeoStore combines speed, security, and design to give you the best online shopping experience.
            </p>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <Rocket className="text-purple-600 mt-1" size={24} />
                <span>Lightning-fast navigation and load times.</span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="text-pink-600 mt-1" size={24} />
                <span>Secure transactions with encrypted checkout.</span>
              </li>
              <li className="flex items-start gap-3">
                <Smartphone className="text-yellow-500 mt-1" size={24} />
                <span>Responsive design for mobile and desktop.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-100 py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          {[
            { value: '2.5M+', label: 'Active Users', color: 'text-purple-600' },
            { value: '10M+', label: 'Orders Delivered', color: 'text-pink-600' },
            { value: '99.8%', label: 'Customer Satisfaction', color: 'text-yellow-500' },
            { value: '99.9%', label: 'Platform Uptime', color: 'text-green-500' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition">
              <h3 className={`text-3xl font-bold ${stat.color}`}>{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-6 text-center bg-gradient-to-r from-purple-600 to-pink-500 text-white">
        <h2 className="text-3xl font-bold mb-6">Ready to experience NeoStore?</h2>
        <Link href="/products">
          <button className="bg-white text-purple-600 px-10 py-4 rounded-full font-bold shadow-lg hover:bg-gray-100 transition">
            Shop Now
          </button>
        </Link>
      </section>
    </main>
  );
}

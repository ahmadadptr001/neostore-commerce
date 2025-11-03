// src/app/(info)/learn-more/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function LearnMorePage() {
  return (
    <main className="bg-[#0f172a] text-white min-h-screen">
      {/* Hero Section */}
      <section className="px-6 py-20 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
          Why NeoStore?
        </h1>
        <p className="text-gray-300 text-lg mb-8">
          NeoStore is built for modern commerce — fast, secure, and beautifully responsive.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/">
            <button className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-purple-100 transition">
              Back to Home
            </button>
          </Link>
          <Link href="https://neostore-commerce.vercel.app/">
            <button className="bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-2 rounded-full font-semibold hover:opacity-90 transition">
              Visit NeoStore
            </button>
          </Link>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="bg-[#1e293b] py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-pink-400">⚡ Performance First</h3>
            <p className="text-gray-400">
              NeoStore is optimized with Next.js for blazing-fast page loads and smooth transitions.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-purple-400">🔒 Secure Checkout</h3>
            <p className="text-gray-400">
              Built with HTTPS, token-based auth, and secure payment flows to protect every transaction.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-yellow-400">📱 Mobile Ready</h3>
            <p className="text-gray-400">
              Fully responsive design ensures seamless shopping across all devices.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
          Built with Modern Technologies
        </h2>
        <div className="flex justify-center gap-6 flex-wrap">
          <Image src="https://skillicons.dev/icons?i=next,react,tailwind,nodejs,mongodb" alt="Tech Stack" width={300} height={48} />
        </div>
        <p className="text-gray-400 mt-6 max-w-xl mx-auto">
          NeoStore leverages a powerful stack for scalability and developer experience — from frontend to backend.
        </p>
      </section>

      {/* Stats Section */}
      <section className="bg-[#111827] py-16 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-4 gap-6 text-center">
          <div>
            <h3 className="text-3xl font-bold text-purple-400">2.5M+</h3>
            <p className="text-gray-400">Active Users</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-pink-400">10M+</h3>
            <p className="text-gray-400">Orders Delivered</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-yellow-400">99.8%</h3>
            <p className="text-gray-400">Customer Satisfaction</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-green-400">99.9%</h3>
            <p className="text-gray-400">Platform Uptime</p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-white">Ready to experience NeoStore?</h2>
        <Link href="https://neostore-commerce.vercel.app/">
          <button className="bg-gradient-to-r from-purple-600 to-pink-500 px-8 py-3 rounded-full font-bold text-white hover:opacity-90 transition">
            Explore Now
          </button>
        </Link>
      </section>
    </main>
  );
}

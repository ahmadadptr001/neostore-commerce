'use client';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center px-6">
      {/* Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 12 }}
        className="flex items-center justify-center w-20 h-20 bg-primary rounded-xl mb-6 shadow-lg"
      >
        <ShoppingBag className="w-10 h-10 text-base-100" />
      </motion.div>

      {/* Judul */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-5xl md:text-6xl font-bold text-primary mb-3"
      >
        404
      </motion.h1>

      {/* Pesan */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-base md:text-lg text-base-content/70 mb-8 max-w-md leading-relaxed"
      >
        Oops! Halaman yang kamu cari tidak ditemukan. Mungkin sudah dihapus atau
        tidak tersedia di{' '}
        <span className="font-semibold text-primary">NeoStore</span>.
      </motion.p>

      {/* Tombol kembali */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Link
          href="/"
          className="btn btn-primary btn-wide shadow-sm hover:shadow-md transition-all duration-200"
        >
          Kembali ke Beranda
        </Link>
      </motion.div>
    </main>
  );
}

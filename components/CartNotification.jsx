'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CartNotification({ show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000); // auto close after 4s
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div
      className={`fixed bottom-5 right-5 transition-transform duration-500 z-[10000] 
        ${show ? 'translate-x-0 opacity-100' : 'translate-x-100 '} 
        bg-white shadow-lg rounded-lg p-4 flex items-center gap-3`}
    >
      <span className="text-green-500 text-2xl">🛒</span>
      <div className="flex flex-col">
        <p className="font-semibold">Product added!</p>
        <Link
          href="/cart"
          className="mt-1 text-sm text-blue-600 hover:underline"
        >
          View Cart →
        </Link>
      </div>
      <button
        onClick={onClose}
        className="ml-auto text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>
    </div>
  );
}

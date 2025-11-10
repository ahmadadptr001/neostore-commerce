'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Eye, ShoppingBag, Trash2, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion'; // opsional
import { getPriceDiscount } from '../../utils/products';

const STORAGE_KEY = 'cart-storage';

function formatCurrency(val) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
}

function safeParseStorage() {
  try {
    const raw = typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to parse storage', e);
    return null;
  }
}

function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white rounded-lg shadow p-4">
      <div className="flex gap-4">
        <div className="w-28 h-28 bg-slate-200 rounded-md" />
        <div className="flex-1">
          <div className="h-4 bg-slate-200 rounded w-3/4 mb-3" />
          <div className="h-3 bg-slate-200 rounded w-1/3 mb-2" />
          <div className="h-8 bg-slate-200 rounded w-1/4" />
        </div>
      </div>
    </div>
  );
}

const WishCard = ({ item, onRemove, onMoveToCart }) => {
  const priceHaveDiscount = useMemo(
    () => getPriceDiscount(item.discountPercentage, item.price),
    [item.discountPercentage, item.price]
  );

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-200"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 items-center">
        {/* Image + thumbs */}
        <div className="flex flex-col items-center sm:items-start">
          <img
            src={item.images?.[0] ?? '/placeholder.png'}
            alt={item.title}
            loading="lazy"
            className="w-full max-w-[220px] h-[160px] object-contain rounded-md bg-white"
          />
          <div className="flex gap-2 mt-3">
            {(item.images ?? []).slice(0, 4).map((src, i) => (
              <button
                key={i}
                type="button"
                className="w-14 h-10 rounded-md outline outline-1 outline-slate-200 hover:scale-105 transition-transform"
                aria-label={`thumbnail-${i}`}
                onClick={(e) => {
                  e.currentTarget.closest('article')?.querySelector('img')?.setAttribute('src', src);
                }}
              >
                <img src={src} alt={`thumb-${i}`} className="w-full h-full object-contain" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        {/* Title + tags + brand */}
        <div className="sm:col-span-1 flex flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            {(item.tags ?? []).map((t, idx) => (
              <span key={idx} className="text-xs font-medium bg-amber-100 text-amber-800 px-2 py-1 rounded">
                {t}
              </span>
            ))}
          </div>

          <h3 className="text-lg font-semibold line-clamp-2">{item.title}</h3>
          <p className="text-sm text-slate-500">Brand: <span className="text-slate-800">{item.brand}</span></p>

          <div className="mt-2 flex items-center gap-3">
            <Link href={`/products/details/${item.id}`} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-sky-600 text-white hover:bg-sky-700 transition">
              <Eye size={16} /> Detail
            </Link>
            <button
              onClick={() => onMoveToCart(item)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition"
              aria-label="move-to-cart"
            >
              <ShoppingCart size={16} /> Move to Cart
            </button>
          </div>
        </div>

        {/* Price + actions */}
        <div className="flex flex-col items-end gap-3">
          <div className="text-right">
            <div className="text-sm text-slate-400 line-through">{formatCurrency(item.price)}</div>
            <div className="text-2xl font-bold">{formatCurrency(priceHaveDiscount)}</div>
            <div className="text-sm text-emerald-600">Save {formatCurrency(item.price - priceHaveDiscount)}</div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onRemove(item.id)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-red-50 text-red-700 hover:bg-red-100 transition"
              aria-label="remove-wishlist"
            >
              <Trash2 size={16} /> Remove
            </button>
            <Link href="/products" className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-slate-100 hover:bg-slate-200 transition">
              <ShoppingBag size={16} /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default function WishListPage() {
  const [cartWish, setCartWish] = useState(null); // null = loading, [] = empty
  const [toast, setToast] = useState(null);

  useEffect(() => {
    // load
    const data = safeParseStorage();
    const wishlist = data?.state?.wishlist ?? [];
    setCartWish(wishlist);
  }, []);

  const persist = useCallback(
    (nextWishlist) => {
      try {
        const raw = safeParseStorage() || { state: { wishlist: [] } };
        raw.state = { ...(raw.state || {}), wishlist: nextWishlist };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(raw));
      } catch (e) {
        console.warn('persist fail', e);
      }
    },
    []
  );

  const handleRemove = useCallback(
    (id) => {
      const next = (cartWish ?? []).filter((it) => it.id !== id);
      setCartWish(next);
      persist(next);
      setToast({ type: 'info', text: 'Removed from wishlist' });
      setTimeout(() => setToast(null), 2000);
    },
    [cartWish, persist]
  );

  const handleMoveToCart = useCallback(
    (item) => {
      // simple move-to-cart logic: remove from wishlist and add to cart array in storage
      const storage = safeParseStorage() || { state: { wishlist: [], cart: [] } };
      const currentCart = storage.state.cart ?? [];
      const already = currentCart.find((c) => c.id === item.id);
      const nextCart = already ? currentCart : [...currentCart, { ...item, quantity: already ? already.quantity : 1 }];
      const nextWish = (cartWish ?? []).filter((it) => it.id !== item.id);

      storage.state = { ...storage.state, cart: nextCart, wishlist: nextWish };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
        setCartWish(nextWish);
        setToast({ type: 'success', text: 'Moved to cart' });
        setTimeout(() => setToast(null), 2000);
      } catch (e) {
        console.warn(e);
        setToast({ type: 'error', text: 'Action failed' });
        setTimeout(() => setToast(null), 2000);
      }
    },
    [cartWish]
  );

  return (
    <main className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold">My Wishlist</h1>
          <p className="text-sm text-slate-500">
            {cartWish === null ? 'Loading...' : `${cartWish.length} item${(cartWish.length ?? 0) === 1 ? '' : 's'} saved for later`}
          </p>
        </div>

        <div className="flex gap-2">
          <Link href="/products" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200">
            <ShoppingBag size={16} /> Shopping
          </Link>
        </div>
      </section>

      {/* List */}
      <section className="grid grid-cols-1 gap-4">
        {cartWish === null ? (
          // show skeletons
          <>
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : cartWish.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-md shadow-sm">
            <p className="text-xl font-medium mb-2">Your wishlist is empty</p>
            <p className="text-sm text-slate-500 mb-4">Add items you love and come back later</p>
            <Link href="/products" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-sky-600 text-white">
              Browse products
            </Link>
          </div>
        ) : (
          <AnimatePresence>
            {cartWish.map((item) => (
              <WishCard key={item.id} item={item} onRemove={handleRemove} onMoveToCart={handleMoveToCart} />
            ))}
          </AnimatePresence>
        )}
      </section>

      {/* Toast */}
      <div aria-live="polite" className="fixed bottom-6 right-6">
        {toast && (
          <div className={`px-4 py-2 rounded-md shadow ${toast.type === 'success' ? 'bg-emerald-600 text-white' : toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-slate-700 text-white'}`}>
            {toast.text}
          </div>
        )}
      </div>
    </main>
  );
}

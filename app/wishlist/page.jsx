'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Eye, ShoppingBag, ShoppingCart, Trash2 } from 'lucide-react';

/**
 * Constants
 */
const STORAGE_KEY = 'cart-storage';

/**
 * Helpers
 */
function safeParseStorage() {
  try {
    const raw =
      typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (!raw) return { state: { cart: [], wishlist: [] } };
    return JSON.parse(raw);
  } catch (e) {
    console.warn('safeParseStorage error', e);
    return { state: { cart: [], wishlist: [] } };
  }
}

function saveStorage(obj) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  } catch (e) {
    console.warn('saveStorage error', e);
  }
}

function formatCurrency(val, locale = 'en-US', currency = 'USD') {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(val);
  } catch {
    return `$ ${val}`;
  }
}

/**
 * WishCard component
 * Props:
 *  - item
 *  - isInCart (boolean)
 *  - onRemove(itemId)
 *  - onMoveToCart(item)
 */
function WishCard({ item, isInCart, onRemove, onMoveToCart }) {
  const outOfStock = item?.stock === 0;
  const disabled = isInCart || outOfStock;

  // price discount helper—fallback simple calculation jika util tidak ada
  const getPriceDiscount = (discountPercentage = 0, price = 0) => {
    const disc = Number(discountPercentage) || 0;
    const p = Number(price) || 0;
    return +(p - (p * disc) / 100).toFixed(2);
  };
  const discounted = getPriceDiscount(item.discountPercentage, item.price);

  return (
    <article className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 items-center">
        {/* Image */}
        <div className="flex flex-col items-center sm:items-start">
          <img
            src={item.images?.[0] ?? '/placeholder.png'}
            alt={item.title}
            loading="lazy"
            className="w-full max-w-[220px] h-[140px] object-contain rounded-md bg-white"
          />
          <div className="flex gap-2 mt-3">
            {(item.images ?? []).slice(0, 4).map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  const article = e.currentTarget.closest('article');
                  const img = article?.querySelector('img');
                  if (img) img.src = src;
                }}
                className="w-12 h-10 rounded-md outline outline-1 outline-slate-200 hover:scale-105 transition-transform"
                aria-label={`thumbnail-${i}`}
              >
                <img
                  src={src}
                  alt={`thumb-${i}`}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Title + tags + brand */}
        <div className="sm:col-span-2 flex flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            {(item.tags ?? []).map((t, idx) => (
              <span
                key={idx}
                className="text-xs font-medium bg-amber-100 text-amber-800 px-2 py-1 rounded"
              >
                {t}
              </span>
            ))}
          </div>

          <h3 className="text-lg font-semibold line-clamp-2">{item.title}</h3>
          <p className="text-sm text-slate-500">
            Brand: <span className="text-slate-800">{item.brand}</span>
          </p>

          <div className="mt-2 flex items-center gap-3">
            <Link
              href={`/products/details/${item.id}`}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-sky-600 text-white hover:bg-sky-700 transition"
            >
              <Eye size={16} /> Detail
            </Link>

            <button
              onClick={() => onMoveToCart(item)}
              disabled={disabled}
              aria-disabled={disabled}
              title={
                disabled
                  ? isInCart
                    ? 'Sudah ada di keranjang'
                    : 'Stok habis'
                  : 'Pindahkan ke keranjang'
              }
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-md transition ${
                disabled
                  ? 'bg-gray-200 text-gray-500 pointer-events-none'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              <ShoppingCart size={16} />{' '}
              {disabled
                ? isInCart
                  ? 'Sudah di Keranjang'
                  : 'Tidak Tersedia'
                : 'Move to Cart'}
            </button>
          </div>
        </div>

        {/* Price + actions */}
        <div className="flex flex-col items-end gap-3">
          <div className="text-right">
            <div className="text-sm text-slate-400 line-through">
              {formatCurrency(item.price)}
            </div>
            <div className="text-2xl font-bold">
              {formatCurrency(discounted)}
            </div>
            <div className="text-sm text-emerald-600">
              Save {formatCurrency(item.price - discounted)}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onRemove(item.id)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-red-50 text-red-700 hover:bg-red-100 transition"
            >
              <Trash2 size={16} /> Remove
            </button>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-slate-100 hover:bg-slate-200 transition"
            >
              <ShoppingBag size={16} /> Shopping
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * Main WishListPage
 */
export default function WishListPage() {
  const [wishlist, setWishlist] = useState(null); // null = loading; [] = empty
  const [cartIds, setCartIds] = useState(new Set());
  const [toast, setToast] = useState(null);

  // Load storage once on mount
  useEffect(() => {
    const storage = safeParseStorage();
    const wish = storage.state?.wishlist ?? [];
    const cart = storage.state?.cart ?? [];
    setWishlist(wish);
    setCartIds(new Set(cart.map((c) => c.id)));
  }, []);

  // Persist helper
  const persistStorage = useCallback((nextState) => {
    const base = safeParseStorage();
    base.state = { ...(base.state || {}), ...nextState };
    saveStorage(base);
  }, []);

  // Remove from wishlist
  const handleRemove = useCallback(
    (id) => {
      const nextWishlist = (wishlist || []).filter((it) => it.id !== id);
      setWishlist(nextWishlist);
      persistStorage({ wishlist: nextWishlist });
      setToast({ type: 'info', text: 'Dihapus dari wishlist' });
      setTimeout(() => setToast(null), 2000);
    },
    [wishlist, persistStorage]
  );

  // Move to cart with defensive checks
  const handleMoveToCart = useCallback((item) => {
    const storage = safeParseStorage();
    const currentCart = storage.state?.cart ?? [];
    const already = currentCart.some((c) => c.id === item.id);
    if (already || item.stock === 0) {
      // defensif: jangan tambah jika sudah ada atau stok 0
      setToast({
        type: 'error',
        text: already ? 'Item sudah ada di keranjang' : 'Stok habis',
      });
      setTimeout(() => setToast(null), 2000);
      return;
    }

    // add to cart
    const nextCart = [...currentCart, { ...item, quantity: 1 }];
    const nextWishlist = (storage.state?.wishlist ?? []).filter(
      (w) => w.id !== item.id
    );

    // save
    storage.state = {
      ...(storage.state || {}),
      cart: nextCart,
      wishlist: nextWishlist,
    };
    saveStorage(storage);

    // update UI
    setWishlist(nextWishlist);
    setCartIds(new Set(nextCart.map((c) => c.id)));
    setToast({ type: 'success', text: 'Dipindahkan ke keranjang' });
    setTimeout(() => setToast(null), 2000);
  }, []);

  // Derived: loading / empty states
  const isLoading = wishlist === null;
  const isEmpty = !isLoading && wishlist.length === 0;

  return (
    <main className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold">Daftar Keinginan Saya</h1>
          <p className="text-sm text-slate-500">
            {isLoading
              ? 'Memuat...'
              : `${wishlist.length} item${
                  wishlist.length === 1 ? '' : 's'
                } tersimpan`}
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200"
          >
            <ShoppingBag size={16} /> Telusuri Produk
          </Link>
        </div>
      </section>

      {/* List */}
      <section className="grid grid-cols-1 gap-4">
        {isLoading ? (
          // skeleton simple
          <>
            <div className="animate-pulse bg-white rounded-md shadow p-4">
              <div className="h-36 bg-slate-200 rounded" />
            </div>
            <div className="animate-pulse bg-white rounded-md shadow p-4">
              <div className="h-36 bg-slate-200 rounded" />
            </div>
          </>
        ) : isEmpty ? (
          <div className="text-center py-20 bg-white rounded-md shadow-sm">
            <p className="text-xl font-medium mb-2">Wishlist kamu kosong</p>
            <p className="text-sm text-slate-500 mb-4">
              Tambahkan produk yang kamu suka dan kembali nanti
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-sky-600 text-white"
            >
              Telusuri produk
            </Link>
          </div>
        ) : (
          wishlist.map((item) => (
            <WishCard
              key={item.id}
              item={item}
              isInCart={cartIds.has(item.id)}
              onRemove={handleRemove}
              onMoveToCart={handleMoveToCart}
            />
          ))
        )}
      </section>

      {/* Toast */}
      <div aria-live="polite" className="fixed bottom-6 right-6 z-50">
        {toast && (
          <div
            className={`px-4 py-2 rounded-md shadow ${
              toast.type === 'success'
                ? 'bg-emerald-600 text-white'
                : toast.type === 'error'
                ? 'bg-red-600 text-white'
                : 'bg-slate-700 text-white'
            }`}
          >
            {toast.text}
          </div>
        )}
      </div>
    </main>
  );
}

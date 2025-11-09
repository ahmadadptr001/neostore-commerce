'use client';
import WishNotification from '../../components/WishNotification';
import { useProductStore } from '../../store/useProductStore';
import { getPriceDiscount } from '../../utils/products';
import { ArrowLeft, Heart, Minus, Plus, Trash } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CartProducts() {
  const [minCount, setMinCount] = useState(false);
  const [maxCount, setMaxCount] = useState(false);
  const [cartProducts, setCartProducts] = useState(null);
  const [cartWish, setCartWish] = useState(null);
  const [viewNotifWish, setViewNotifWish] = useState(false);

  const updateQuantity = useProductStore((state) => state.updateQuantity);
  const removeToCart = useProductStore((state) => state.removeToCart);
  const addToWishList = useProductStore((state) => state.addToWishList);

  useEffect(() => {
    const carts = JSON.parse(localStorage.getItem('cart-storage'));

    if (carts) {
      setCartProducts(carts.state.cart);
      setCartWish(carts.state.wishlist);
    }
  }, []);

  const handleCountMines = (item) => {
    if (item.quantity <= 2) {
      setMinCount(true);
    }
    if (item.quantity == 1) {
      updateQuantity(item.id, item.quantity);
      window.location.reload();
      return item.quantity;
    }
    let countNew = item.quantity - 1;
    setMaxCount(false);
    updateQuantity(item.id, countNew);
    window.location.reload();
  };

  const handleCountPlus = (item) => {
    if (item.uantity >= item.stock - 1) {
      setMaxCount(true);
    }
    if (item.quantity == item.stock) {
      updateQuantity(item.id, item.quantity);
      window.location.reload();
      return item.quantity;
    }
    let countNew = item.quantity + 1;
    setMinCount(false);
    updateQuantity(item.id, countNew);
    window.location.reload();
  };

  const handleRemoveCart = (id) => {
    const resultNotif = confirm('remove this product from your cart?');

    if (resultNotif) {
      removeToCart(id);
      window.location.reload();
      return;
    }
  };

  const handleAddWishList = (item) => {
    addToWishList(item);
    setViewNotifWish(true);
  };

  const cardCartProducts = (item) => {
    const priceDiscount = getPriceDiscount(item.discountPercentage, item.price);

    return (
      <div className="flex flex-col md:flex-row gap-4 border-y border-gray-300 py-3">
        {/* Gambar produk */}
        <div className="flex items-center gap-3 sm:mx-0 justify-between">
          <img
            src={item.images[0]}
            className="h-30 w-30 sm:h-32 sm:w-32 object-contain rounded-md"
            alt={item.title}
          />
          {/* Harga */}
          <div className="flex md:hidden flex-col items-end gap-1 text-right min-w-[90px]">
            <span className="font-semibold text-base sm:text-lg">
              ${priceDiscount}
            </span>
            <small className="line-through text-sm">${item.price}</small>
            <span className="text-green-500 text-sm sm:text-base">
              {item.discountPercentage}% OFF
            </span>
          </div>
        </div>

        {/* Detail produk + harga */}
        <div className="flex flex-col sm:flex-row justify-between flex-1 gap-4">
          {/* Info produk */}
          <div className="flex flex-col gap-1 sm:gap-2 flex-1">
            <span className="font-semibold text-base sm:text-lg line-clamp-1">
              {item.title}
            </span>
            <div className="flex gap-3 md:flex-col md:gap-1 justify-between">
              <span className="text-gray-500 text-sm">Brand: {item.brand}</span>
              <span className="text-gray-500 text-sm">SKU: {item.sku}</span>
            </div>

            <div className="flex gap-3 md:gap-1 justify-between mt-2 md:mt-0 items-center">
              {/* button increment dan decrement */}
              <div className="flex-items-center">
                <button
                  className="btn btn-sm btn-base-200 rounded-none rounded-l-md"
                  disabled={minCount}
                  onClick={() => handleCountMines(item)}
                >
                  <Minus size={13} />
                </button>
                <button className="btn btn-sm bg-transparent rounded-none ">
                  {item.quantity}
                </button>
                <button
                  className="btn btn-sm btn-base-200 rounded-none rounded-r-md"
                  disabled={maxCount}
                  onClick={() => handleCountPlus(item)}
                >
                  <Plus size={13} />
                </button>
              </div>

              {/* button remove and save */}
              <div className="flex items-center">
                <button
                  className="btn btn-error rounded-none"
                  onClick={() => handleRemoveCart(item.id)}
                >
                  <Trash className="fill-white stroke-error stroke-1 size-5" />
                </button>
                <button
                  className="btn btn-info rounded-none"
                  onClick={() => handleAddWishList(item)}
                >
                  <Heart className="fill-white stroke-info stroke-1 size-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Harga */}
          <div className="hidden md:flex flex-col items-end gap-1 text-right min-w-[90px]">
            <span className="font-semibold text-base sm:text-lg">
              ${priceDiscount}
            </span>
            <small className="line-through text-sm">${item.price}</small>
            <span className="text-green-500 text-sm sm:text-base">
              {item.discountPercentage}% OFF
            </span>
          </div>
        </div>
      </div>
    );
  };

  const cardCartWish = (item) => {
    const priceDiscount = getPriceDiscount(item.discountPercentage, item.price);
    return (
      <div className="border items-center border-gray-300 rounded-md p-4 flex gap-3 mt-3 justify-between">
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-18 h-18 object-contain"
        />
        <div className="flex flex-col gap-1">
          <p className="font-semibold line-clamp-1">
            {item.title}
          </p>
          <small>${priceDiscount}</small>
        </div>

        <Link href={`/products/details/${item.id}`} className="btn btn-ghost text-secondary">Move to Cart</Link>
      </div>
    );
  };

  const cardCartEmpty = () => {
    return (
      <div className="flex flex-col items-center justify-center text-center animate-fadeIn py-5">
        <div className="text-6xl mb-4 animate-bounce">🛒</div>
        <h2 className="text-xl font-semibold text-gray-700">
          Your cart is still empty
        </h2>
        <p className="text-gray-500 mt-2">
          Discover your favorite products and add them to your cart!
        </p>

        <Link
          href="/products"
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Start Shopping →
        </Link>
      </div>
    );
  };

  return (
    <main className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <WishNotification
        show={viewNotifWish}
        onClose={() => setViewNotifWish(false)}
      />
      {/* Left Section */}
      <section className="lg:col-span-2 space-y-4">
        {/* Header Actions */}
          <Link
            href="/products"
            className="flex items-center gap-2 hover:underline decoration-secondary"
          >
            <ArrowLeft size={18} className="stroke-secondary fill-secondary" />
            <span className="text-secondary text-base">
              Continue Shopping
            </span>
          </Link>
          

        {/* Cart Box */}
        <div className="mt-4 bg-white shadow-md p-4 sm:p-6 rounded-md">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <h2 className="font-semibold text-lg sm:text-xl md:text-2xl">
              Shopping Cart
            </h2>
            <span className="text-gray-500 text-sm">
              {cartProducts?.length} items
            </span>
          </div>

          {/* Product Item */}
          {cartProducts !== null &&
          cartProducts.length !== 0 &&
          cartProducts !== undefined
            ? cartProducts.map((data) => (
                <div key={data.id}>{cardCartProducts(data)}</div>
              ))
            : cardCartEmpty()}

          {/* more info */}
          <div className="mt-3">
            <div className="rounded-lg bg-info/10 flex items-center gap-3 w-full p-5">
              <svg
                width="20"
                height="16"
                viewBox="0 0 20 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 0C0.671875 0 0 0.671875 0 1.5V11.5C0 12.3281 0.671875 13 1.5 13H2C2 14.6562 3.34375 16 5 16C6.65625 16 8 14.6562 8 13H12C12 14.6562 13.3438 16 15 16C16.6562 16 18 14.6562 18 13H19C19.5531 13 20 12.5531 20 12C20 11.4469 19.5531 11 19 11V9V8V7.41563C19 6.88438 18.7906 6.375 18.4156 6L16 3.58437C15.625 3.20937 15.1156 3 14.5844 3H13V1.5C13 0.671875 12.3281 0 11.5 0H1.5ZM13 5H14.5844L17 7.41563V8H13V5ZM3.5 13C3.5 12.6022 3.65804 12.2206 3.93934 11.9393C4.22064 11.658 4.60218 11.5 5 11.5C5.39782 11.5 5.77936 11.658 6.06066 11.9393C6.34196 12.2206 6.5 12.6022 6.5 13C6.5 13.3978 6.34196 13.7794 6.06066 14.0607C5.77936 14.342 5.39782 14.5 5 14.5C4.60218 14.5 4.22064 14.342 3.93934 14.0607C3.65804 13.7794 3.5 13.3978 3.5 13ZM15 11.5C15.3978 11.5 15.7794 11.658 16.0607 11.9393C16.342 12.2206 16.5 12.6022 16.5 13C16.5 13.3978 16.342 13.7794 16.0607 14.0607C15.7794 14.342 15.3978 14.5 15 14.5C14.6022 14.5 14.2206 14.342 13.9393 14.0607C13.658 13.7794 13.5 13.3978 13.5 13C13.5 12.6022 13.658 12.2206 13.9393 11.9393C14.2206 11.658 14.6022 11.5 15 11.5Z"
                  fill="#2563EB"
                />
              </svg>
              <div>
                <p>Free shipping on orders over $50</p>
                <small className="text-info">Ships in 3-5 business days</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Right Section (Summary / Checkout) */}
      <section className="bg-white shadow-md p-4 sm:p-6 rounded-md h-fit">
        <h3 className="font-semibold text-lg sm:text-xl mb-4">Order Summary</h3>
        <div className="flex justify-between text-sm sm:text-base mb-2">
          <span>Subtotal</span>
          <span>$8.94</span>
        </div>
        <div className="flex justify-between text-sm sm:text-base mb-4">
          <span>Discount</span>
          <span className="text-green-500">- $0.06</span>
        </div>
        <div className="flex justify-between font-semibold text-base sm:text-lg border-t pt-2">
          <span>Total</span>
          <span>$8.94</span>
        </div>
        <button className="mt-4 w-full bg-secondary text-white py-2 rounded-md hover:bg-secondary/90 transition">
          Checkout
        </button>
      </section>

      {/* Saved for Later Section */}
      <section className="bg-white lg:col-span-2 shadow-md p-4 sm:p-6 rounded-md">
        <h3 className="font-semibold text-xl">
          Saved for Later {'('}{cartProducts?.length} items{')'}
        </h3>
        <div className="grid grid-cols-1 md:gap-3 md:grid-cols-2">
          {/* card products */}
          {cartWish !== null && cartWish.length !== 0 && cartWish !== undefined
            ? cartWish.map((data) => (
                <div key={data.id}>{cardCartWish(data)}</div>
              ))
            : (
              <span className='mt-3 text-error'>Empty</span>
            )}
        </div>
      </section>
    </main>
  );
}

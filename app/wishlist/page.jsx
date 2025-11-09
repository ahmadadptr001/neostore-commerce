'use client';

import { getPriceDiscount } from '../../utils/products';
import { Eye, ShoppingBag, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function WishListPage() {
  const [cartWish, setCartWish] = useState([]);

  useEffect(() => {
    const carts = JSON.parse(localStorage.getItem('cart-storage'));

    if (carts) {
      setCartWish(carts.state.wishlist);
    }
  }, []);

  const cardWishlist = (item) => {
    const priceHaveDiscount = getPriceDiscount(
      item.discountPercentage,
      item.price
    );
    return (
      <div className="flex flex-col sm:flex-row gap-7 w-full border-3 shadow-md border-gray-300 p-4 rounded-md">
        <div className="w-full">
          <img
            src={item.images[0]}
            alt={item.title}
            className="mx-auto w-50 object-contain"
          />
          <div className="flex items-center gap-2 mt-3 justify-center">
            {item.images.map((image_, i) => (
              <div key={i} className="outline outline-gray-400 rounded-md">
                <img
                  src={image_}
                  alt="image-sh"
                  className="w-32 object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full sm:w-1/2">
          <div className="flex items-center gap-1 flex-wrap justify-center sm:justify-start">
            {item.tags.map((tag) => (
              <span className="badge badge-warning">{tag}</span>
            ))}
          </div>

          <p className="h3 font-semibold text-xl mt-2 line-clamp-2 sm:text-start text-center">{item.title}</p>
          <small className="text-gray-500 flex items-center gap-1 justify-center sm:justify-start">
            brand: <span className="text-gray-900">{item.brand}</span>
          </small>

          {/* price */}
          <div className="flex flex-col mt-3 text-end">
            <small className="line-through">$ {item.price}</small>
            <h3 className="text-3xl font-bold">${priceHaveDiscount}</h3>
            <small className="text-success">
              Save ${(item.price - priceHaveDiscount).toFixed(2)}
            </small>
          </div>
          
          {/* button */}
          <div className="mt-4">
            <Link href={`/products/details/${item.id}`} className="btn btn-lg w-full flex items-center gap-2 btn-info text-base">
              <Eye size={16} /> Detail
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="p-4">
      {/* header section */}
      <section className="flex items-centeer flex-wrap justify-between mx-auto container gap-2">
        <p className="flex flex-col gap-1">
          <span className="text-3xl font-bold">My Whislist</span>
          <span className="text-gray-500">
            {cartWish?.length} item saved for later
          </span>
        </p>

        <Link
          href="/products"
          className="btn btn-secondary btn-soft btn-md flex items-center"
        >
          <ShoppingBag size={15} /> Shopping
        </Link>
      </section>

      {/* card wishlist */}
      <section className="mt-5 container mx-auto flex flex-col gap-2">
        {cartWish.length !== 0 &&
        cartWish !== undefined &&
        cartWish !== null ? (
          cartWish.map((item) => cardWishlist(item))
        ) : (
          <span className="text-error min-h-50">Empty</span>
        )}
      </section>
    </main>
  );
}

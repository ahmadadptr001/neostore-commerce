'use client';

import { getSingleProducts } from '@/services/products';
import { getPriceDiscount } from '@/utils/products';
import {
  Heart,
  Repeat,
  Share2Icon,
  ShoppingCart,
  Star,
  Truck,
  X,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DetailProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [priceDiscount, setPriceDiscount] = useState(0);
  const [imageChoice, setImageChoice] = useState('');

  useEffect(() => {
    (async () => {
      const data = await getSingleProducts(id);
      setImageChoice(data.images[0]);
      setRating(Math.floor(data.rating));
      const priceDis = getPriceDiscount(data.discountPercentage, data.price);
      setPriceDiscount(priceDis);
      if (data) setProduct(data);
    })();
  }, [id]);

  return (
    <>
      {product ? (
        <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Gambar produk */}
          <div className="flex flex-col gap-4 items-center">
            <img
              src={imageChoice}
              alt={product.title}
              className="w-full max-w-md object-contain rounded-md"
            />
            <div className="flex flex-wrap justify-center gap-2">
              {product.images.map((srcImage, i) => (
                <div
                  key={i}
                  onClick={() => setImageChoice(srcImage)}
                  className={`w-20 sm:w-24 cursor-pointer border ${
                    imageChoice === srcImage
                      ? 'border-secondary scale-105'
                      : 'border-gray-300'
                  } bg-gray-100 p-1 rounded-md transition-all`}
                >
                  <img
                    src={srcImage}
                    alt={`variate-${i}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Deskripsi produk */}
          <div className="border border-gray-300 rounded-md p-5 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center flex-wrap gap-2">
                <div className="badge badge-info rounded-none">
                  {product.availabilityStatus}
                </div>
                <span className="text-gray-500 text-sm">{product.sku}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold mt-3">
                {product.title}
              </h1>

              <div className="flex items-center gap-1 mt-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${
                      i < rating ? 'fill-warning text-warning' : 'text-gray-400'
                    }`}
                  />
                ))}
                <span className="ml-1 text-sm text-gray-600">
                  {product.rating} ({product.reviews.length} reviews)
                </span>
              </div>

              <p className="text-gray-600 mt-3 text-sm sm:text-base leading-relaxed">
                {product.description}
              </p>

              {/* Harga */}
              <div className="border-y border-gray-200 mt-5 py-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <p className="text-2xl font-semibold text-primary">
                    $ {priceDiscount}
                  </p>
                  <p className="line-through text-gray-400 text-lg">
                    $ {product.price}
                  </p>
                  <span className="badge badge-error text-white">
                    {product.discountPercentage}% OFF
                  </span>
                </div>
                <p className="text-gray-400 text-sm mt-2">
                  Free shipping on orders over $100
                </p>
              </div>

              {/* Quantity */}
              <div className="mt-5">
                <div className="flex justify-between items-center flex-wrap gap-3">
                  <span className="text-sm sm:text-base font-medium">
                    Quantity:
                  </span>
                  <div className="flex items-center">
                    <button className="btn btn-sm sm:btn-md rounded-none">
                      -
                    </button>
                    <span className="btn btn-sm sm:btn-md btn-ghost rounded-none">
                      {quantity}
                    </span>
                    <button className="btn btn-sm sm:btn-md rounded-none">
                      +
                    </button>
                  </div>
                </div>
                <p className="text-gray-500 text-xs sm:text-sm mt-2">
                  {product.stock} items available
                </p>
              </div>

              {/* Tombol aksi */}
              <div className="mt-5 flex flex-col gap-3">
                <button className="btn btn-secondary w-full">
                  <ShoppingCart size={18} /> Add to Cart
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button className="btn btn-outline btn-sm sm:btn-md flex justify-center items-center gap-2">
                    <Heart size={15} /> Wishlist
                  </button>
                  <button className="btn btn-outline btn-sm sm:btn-md flex justify-center items-center gap-2">
                    <Share2Icon size={15} /> Share
                  </button>
                </div>
              </div>

              {/* Info tambahan */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p>
                    Brand :{' '}
                    <span className="text-gray-500">{product.brand}</span>
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-1 sm:gap-2 text-sm">
                    <span>Dimensions :</span>
                    <span className="text-gray-500">
                      {product.dimensions.width}"
                    </span>
                    <X size={10} className="text-gray-400" />
                    <span className="text-gray-500">
                      {product.dimensions.height}"
                    </span>
                    <X size={10} className="text-gray-400" />
                    <span className="text-gray-500">
                      {product.dimensions.depth}"
                    </span>
                  </div>
                </div>

                <div>
                  <p>
                    Weight :{' '}
                    <span className="text-gray-500">{product.weight} lbs</span>
                  </p>
                  <p className="mt-2">
                    Warranty :{' '}
                    <span className="text-gray-500">
                      {product.warrantyInformation}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2 text-sm">
                <span className="flex items-center gap-2 text-success">
                  <Truck size={15} className="fill-success" />{' '}
                  {product.shippingInformation}
                </span>
                <span className="flex items-center gap-2 text-secondary">
                  <Repeat size={15} className="fill-secondary" />{' '}
                  {product.returnPolicy}
                </span>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <p className="text-center text-gray-500 py-20">Loading...</p>
      )}
    </>
  );
}

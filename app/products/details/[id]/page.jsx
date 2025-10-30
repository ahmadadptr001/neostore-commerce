'use client';

import { getSingleProducts } from '@/services/products';
import { getPriceDiscount } from '@/utils/products';
import { Heart, Repeat, Share2Icon, ShoppingCart, Star, Truck, X } from 'lucide-react';
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
  }, []);

  return (
    <>
      {product ? (
        <section className="container mx-auto px-5 grid grid-cols-2 gap-5">
          {/* untuk gambar */}
          <div className="">
            <img
              src={imageChoice}
              alt={product.title}
              className="w-full object-contain"
            />
            <div className="flex items-center justify-center gap-2">
              {product.images.map((srcImage, i) => (
                <div
                  key={i}
                  className="z-20 w-32 cursor-pointer hover:scale-102 duration-300"
                  onClick={() => setImageChoice(srcImage)}
                >
                  <img
                    src={srcImage}
                    alt={`variate-${i}`}
                    className="border border-gray-300 bg-gray-200"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* untuk deskripsi dll */}
          <div className="flex items-center justify-center">
            <div className="border border-gray-300 p-7 w-full h-full">
              <div className="flex items-center gap-2">
                <div className="badge badge-info rounded-0">
                  {product.availabilityStatus}
                </div>
                <span className="text-gray-500">{product.sku}</span>
              </div>

              <p className="text-2xl font-bold mt-3">{product.title}</p>
              <div className="p-1 flex gap-2 text-sm items-center">
                {Array.from({ length: 5 }, (_, i) => (
                  <div className="mt-1 text-warning flex-items-center">
                    <Star
                      size={14}
                      className={`${i < rating ? 'fill-warning' : ''}`}
                    />
                  </div>
                ))}
                <span>
                  {product.rating} {'('} {product.reviews.length} reviews {')'}
                </span>
              </div>

              <p className="text-gray-500 mt-2">{product.description}</p>
              <div className="border-t border-b border-gray-300 mt-3 py-7">
                <div className="items-center flex gap-2">
                  <p className="text-2xl font-semibold">$ {priceDiscount}</p>
                  <p className="line-through text-lg text-gray-500">
                    $ {product.price}
                  </p>
                  <span className="badge badge-error text-white line-through-none text-sm">
                    {product.discountPercentage}% OFF
                  </span>
                </div>
                <p className="mt-1 text-gray-400">
                  Free shipping on orders over $100
                </p>
              </div>

              <div className="div border-b border-gray-300 pb-7 mt-3">
                <div className="flex justify-between items-center flex-wrap">
                  <span>Quantity: </span>
                  <div className="flex items-center">
                    <button className="btn !rounded-none">-</button>
                    <span className="btn rounded-none btn-ghost">
                      {' '}
                      {quantity}{' '}
                    </span>
                    <button className="btn !rounded-none">+</button>
                  </div>
                </div>
                <p className="text-gray-500 text-sm mt-3">
                  {product.stock} items available
                </p>

                <div className="mt-3">
                  <button className="btn btn-md w-full mt-5 btn-secondary">
                    <ShoppingCart size={20} />
                    Add to Cart
                  </button>
                  <div className="grid grid-cols-2 mt-2 gap-3">
                    <button className="btn btn-md">
                      <Heart fill="black" size={15} /> Wishlist
                    </button>
                    <button className="btn btn-md">
                      <Share2Icon fill="black" size={15} /> Share
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <div className="grid grid-cols-2 gap-7 text-sm">
                  <div>
                    <p className="line-clamp-1">
                      Brand :{' '}
                      <span className="text-gray-500">{product.brand}</span>
                    </p>
                    <div className="mt-2 flex-wrap flex items-center gap-2 line-clamp-1">
                      <span>Dimensions : </span>
                      <span className="text-gray-500">
                        {product.dimensions.width}"
                      </span>{' '}
                      <X size={10} />
                      <span className="text-gray-500">
                        {product.dimensions.height}"
                      </span>{' '}
                      <X size={10} />
                      <span className="text-gray-500">
                        {product.dimensions.depth}"
                      </span>
                    </div>
                  </div>

                  <div>
                    <p>
                      Weight :{' '}
                      <span className="text-gray-500">
                        {product.weight} lbs
                      </span>
                    </p>
                    <p className="mt-2">
                      Warranty :{' '}
                      <span className="text-gray-500">
                        {product.warrantyInformation}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <span className="flex items-center text-sm gap-2 text-success">
                  <Truck size={15} className='fill-success'/> {product.shippingInformation}
                </span>
                <span className="flex items-center text-sm gap-2 text-secondary">
                  <Repeat size={15} className='fill-secondary'/> {product.returnPolicy}
                </span>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <p className="text-center text-gray-500">loading..</p>
      )}
    </>
  );
}

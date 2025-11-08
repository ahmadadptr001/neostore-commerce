'use client';

import { useProductStore } from '../../../../store/useProductStore';
import { getSingleProducts } from '../../../../services/products';
import { formatDate, getPriceDiscount } from '../../../../utils/products';
import CartNotification from '../../../../components/CartNotification';
import WishNotification from '../../../../components/WishNotification';
import {
  CalendarDays,
  Car,
  CircleCheck,
  CircleX,
  Hammer,
  Heart,
  Mail,
  MapPin,
  MessagesSquare,
  Minus,
  Package2,
  Phone,
  Plus,
  Pocket,
  Repeat,
  Share2Icon,
  ShoppingCart,
  Star,
  Truck,
  X,
  Zap,
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
  const [activeTab, setActiveTab] = useState('reviews');
  const [stock, setStock] = useState(0);
  const [maxCount, setMaxCount] = useState(false);
  const [minCount, setMinCount] = useState(true);
  const [showNotif, setShowNotif] = useState(false);
  const [showNotif2, setShowNotif2] = useState(false);

  const addToCart = useProductStore((state) => state.addToCart);
  const addToWishList = useProductStore((state) => state.addToWishList);

  const [cartProduct, setCartProduct] = useState({
    id: product?.id ?? null,
    title: product?.title ?? '',
    images: product?.images ?? '',
    price: product?.price ?? 0,
    stock: product?.stock ?? 0,
    discountPercentage: product?.discountPercentage ?? 0,
    sku: product?.sku ?? '',
    brand: product?.brand ?? '',
    quantity: quantity,
  });

  useEffect(() => {
    (async () => {
      const data = await getSingleProducts(id);
      setStock(data.stock);
      setImageChoice(data.images[0]);
      setRating(Math.floor(data.rating));
      const priceDis = getPriceDiscount(data.discountPercentage, data.price);
      setPriceDiscount(priceDis);

      if (data) {
        setProduct(data);
        setCartProduct({
          id: data?.id ?? null,
          title: data?.title ?? '',
          images: data?.images ?? '',
          price: data?.price ?? 0,
          stock: data?.stock ?? 0,
          discountPercentage: data?.discountPercentage ?? 0,
          sku: data?.sku ?? '',
          brand: data?.brand ?? '',
          quantity: quantity,
        });
      }
    })();
  }, [id]);

  const handleCountMines = () => {
    if (quantity <= 2) {
      setMinCount(true);
    }
    if (quantity == 1) {
      setCartProduct({ ...cartProduct, quantity: quantity });
      return quantity;
    }
    let countNew = quantity - 1;
    setQuantity(countNew);
    setMaxCount(false);
    setCartProduct({ ...cartProduct, quantity: countNew });
  };

  const handleCountPlus = () => {
    if (quantity >= stock - 1) {
      setMaxCount(true);
    }
    if (quantity == stock) {
      setCartProduct({ ...cartProduct, quantity: quantity });

      return quantity;
    }
    let countNew = quantity + 1;
    setQuantity(countNew);
    setMinCount(false);
    setCartProduct({ ...cartProduct, quantity: countNew });
  };

  const handleToCart = () => {
    addToCart(cartProduct);
    setShowNotif(true);
  };

  const handleToWishlist = () => {
    addToWishList(cartProduct);
    setShowNotif2(true);
  };

  return (
    <>
      {product ? (
        <>
          <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <CartNotification
              show={showNotif}
              onClose={() => setShowNotif(false)}
            />
            <WishNotification
              show={showNotif2}
              onClose={() => setShowNotif2(false)}
            />
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
                        i < rating
                          ? 'fill-warning text-warning'
                          : 'text-gray-400'
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
                      <button
                        onClick={handleCountMines}
                        className="btn btn-sm sm:btn-md rounded-none"
                        disabled={stock ? minCount : true}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="btn btn-sm sm:btn-md btn-ghost rounded-none">
                        {stock ? quantity : '0'}
                      </span>
                      <button
                        onClick={handleCountPlus}
                        className="btn btn-sm sm:btn-md rounded-none"
                        disabled={stock ? maxCount : true}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs sm:text-sm mt-2">
                    {product.stock} items available
                  </p>
                </div>

                {/* Tombol aksi */}
                <div className="mt-5 flex flex-col gap-3">
                  <button
                    className="btn btn-secondary w-full py-6"
                    onClick={handleToCart}
                  >
                    <ShoppingCart size={18} /> Add to Cart
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleToWishlist()}
                      className="btn btn-outline btn-sm sm:btn-md flex justify-center items-center gap-2"
                    >
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

          <section className="w-full container mx-auto mt-10">
            {/* Tab Menu */}
            <div className="tabs tabs-lift w-full">
              <a
                className={`tab tab-bordered ${
                  activeTab === 'reviews'
                    ? 'tab-active text-primary font-semibold'
                    : ''
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </a>
              <a
                className={`tab tab-bordered ${
                  activeTab === 'shipping'
                    ? 'tab-active text-primary font-semibold'
                    : ''
                }`}
                onClick={() => setActiveTab('shipping')}
              >
                Shipping
              </a>

              <a
                className={`tab tab-bordered ${
                  activeTab === 'spesifications'
                    ? 'tab-active text-primary font-semibold'
                    : ''
                }`}
                onClick={() => setActiveTab('spesifications')}
              >
                Spesifications
              </a>
            </div>

            {/* Tab Content */}
            <div className="p-5 border border-base-300 rounded-b-box">
              {activeTab === 'shipping' && (
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    Shipping & Returns
                  </h3>
                  <p className="text-gray-600">
                    Everything you need to know about delivery and returns for
                    your order
                  </p>

                  <div className="p-4 rounded-lg bg-white mt-3 py-10">
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-200 rounded-full p-3">
                        <Car className="fill-secondary" size={30} />
                      </div>
                      <div className="flex flex-col text-sm">
                        <span className="text-2xl font-semibold">
                          Shipping Information
                        </span>
                        <span className="text-gray-500">
                          Fast and reliable delivery options
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 mt-4">
                      <div className="p-5 rounded-md bg-secondary/5">
                        <p className="flex items-center gap-2 font-bold">
                          <Zap size={18} className="fill-secondary" />
                          <span>Express Delivery</span>
                        </p>
                        <p className="font-bold text-2xl mt-3 text-secondary">
                          Ships Overnight
                        </p>
                        <p className="text-gray-500">
                          Get your furniture delivered within 24 hours
                        </p>
                      </div>
                      <div className="p-5 rounded-md bg-success/5">
                        <p className="flex items-center gap-2 font-bold">
                          <Pocket size={18} className="fill-success" />
                          <span>Express Delivery</span>
                        </p>
                        <p className="font-bold text-2xl mt-3 text-success">
                          Ships Overnight
                        </p>
                        <p className="text-gray-500">
                          Get your furniture delivered within 24 hours
                        </p>
                      </div>
                    </div>

                    <div className="mt-7 flex flex-col gap-7">
                      <div className="flex items-center gap-2">
                        <p className="p-3 rounded-full bg-secondary/20">
                          <Package2 size={15} className="fill-secondary" />
                        </p>
                        <div className="flex flex-col">
                          <span className="font-semibold">Processing Time</span>
                          <span className="text-gray-500 text-md">
                            Orders are processed within 2-4 business hours
                            during weekdays
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="p-3 rounded-full bg-secondary/20">
                          <MapPin size={15} className="fill-secondary" />
                        </p>
                        <div className="flex flex-col">
                          <span className="font-semibold">Delivery Areas</span>
                          <span className="text-gray-500 text-md">
                            We deliver to all major cities and suburban areas.
                            Remote locations may require additional time
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="p-3 rounded-full bg-secondary/20">
                          <Phone size={15} className="fill-secondary" />
                        </p>
                        <div className="flex flex-col">
                          <span className="font-semibold">
                            Delivery Updates
                          </span>
                          <span className="text-gray-500 text-md">
                            Track your order in real-time and receive SMS/email
                            notifications
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-white mt-10 py-10">
                    <div className="flex items-center gap-2">
                      <div className="bg-warning/20 rounded-full p-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="var(--color-warning)"
                          stroke="var(--color-warning)"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-repeat-icon lucide-repeat"
                        >
                          <path d="m17 2 4 4-4 4" />
                          <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
                          <path d="m7 22-4-4 4-4" />
                          <path d="M21 13v1a4 4 0 0 1-4 4H3" />
                        </svg>
                      </div>
                      <div className="flex flex-col text-sm">
                        <span className="text-2xl font-semibold">
                          Return Policy
                        </span>
                        <span className="text-gray-500">
                          Hassle-free returns within our policy period
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 rounded-lg p-7 bg-warning/5">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={20} className="fill-warning" />
                        <span className="font-semibold">Return Windows</span>
                      </div>
                      <p className="font-bold text-2xl mt-2 text-warning">
                        7 Days Return Policy
                      </p>
                      <p className="text-sm text-gray-500">
                        Return or exchange within 7 days of delivery
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 px-2 mt-6">
                      <div>
                        <h3 className="flex-set font-semibold gap-2">
                          <CircleCheck className="fill-success" />
                          <span>What can be returned</span>
                        </h3>

                        <div className="mt-2 flex flex-col gap-3">
                          <div className="flex-set gap-2 px-3 mt-3">
                            <div className="rounded-full bg-success w-5 h-5"></div>
                            <span className="flex-set gap-1">
                              Items in original condition and packaging
                            </span>
                          </div>
                          <div className="flex-set gap-2 px-3">
                            <div className="rounded-full bg-success w-5 h-5"></div>
                            <span className="flex-set gap-1">
                              Unused furniture with all accessories
                            </span>
                          </div>
                          <div className="flex-set gap-2 px-3">
                            <div className="rounded-full bg-success w-5 h-5"></div>
                            <span className="flex-set gap-1">
                              Items with original tags and labels
                            </span>
                          </div>
                          <div className="flex-set gap-2 px-3">
                            <div className="rounded-full bg-success w-5 h-5"></div>
                            <span className="flex-set gap-1">
                              Defective or damaged items
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 sm:mt-0">
                        <h3 className="flex-set font-semibold gap-2">
                          <CircleX className="fill-error" />
                          <span>What cannot be returned</span>
                        </h3>

                        <div className="mt-2 flex flex-col gap-3">
                          <div className="flex-set gap-2 px-3 mt-3">
                            <div className="rounded-full bg-error w-5 h-5"></div>
                            <span className="flex-set gap-1">
                              Custom or personalized furniture
                            </span>
                          </div>
                          <div className="flex-set gap-2 px-3">
                            <div className="rounded-full bg-error w-5 h-5"></div>
                            <span className="flex-set gap-1">
                              Items damaged by misuse
                            </span>
                          </div>
                          <div className="flex-set gap-2 px-3">
                            <div className="rounded-full bg-error w-5 h-5"></div>
                            <span className="flex-set gap-1">
                              Items returned after 7 days
                            </span>
                          </div>
                          <div className="flex-set gap-2 px-3">
                            <div className="rounded-full bg-error w-5 h-5"></div>
                            <span className="flex-set gap-1">
                              Items without original packaging
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-white mt-10 py-10">
                    <div className="flex items-center gap-2">
                      <div className="bg-purple-200 rounded-full p-3">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_10_1384)">
                            <path
                              d="M8.2422 0.285043C8.00782 0.0389495 7.65626 -0.0548005 7.32813 0.031137C7.00001 0.117074 6.7461 0.378793 6.66017 0.706918L6.04298 3.14832L3.6211 2.46473C3.29298 2.37098 2.94142 2.46473 2.70313 2.70301C2.46485 2.94129 2.3711 3.29286 2.46485 3.62098L3.14845 6.04286L0.70704 6.66395C0.378915 6.74598 0.121103 7.00379 0.0312591 7.33192C-0.0585847 7.66004 0.0390716 8.0077 0.285165 8.24207L2.08985 9.99989L0.285165 11.7577C0.0390716 11.9921 -0.0546784 12.3436 0.0312591 12.6718C0.117197 12.9999 0.378915 13.2538 0.70704 13.3397L3.14845 13.9569L2.46485 16.3788C2.3711 16.7069 2.46485 17.0585 2.70313 17.2968C2.94142 17.535 3.29298 17.6288 3.6211 17.535L6.04298 16.8514L6.66017 19.2929C6.7422 19.621 7.00001 19.8788 7.32813 19.9686C7.65626 20.0585 8.00392 19.9608 8.2422 19.7186L10 17.9139L11.7578 19.7186C11.9961 19.9608 12.3438 20.0585 12.6719 19.9686C13 19.8788 13.2539 19.621 13.3399 19.2929L13.957 16.8514L16.3789 17.535C16.707 17.6288 17.0586 17.535 17.2969 17.2968C17.5352 17.0585 17.6289 16.7069 17.5352 16.3788L16.8516 13.9569L19.293 13.3397C19.6211 13.2577 19.8789 12.9999 19.9688 12.6718C20.0586 12.3436 19.9609 11.996 19.7188 11.7577L17.9141 9.99989L19.7188 8.24207C19.9609 8.00379 20.0586 7.65614 19.9688 7.32801C19.8789 6.99989 19.6211 6.74598 19.293 6.66004L16.8516 6.04286L17.5352 3.62098C17.6289 3.29286 17.5352 2.94129 17.2969 2.70301C17.0586 2.46473 16.707 2.37098 16.3789 2.46473L13.957 3.14832L13.3359 0.706918C13.2539 0.378793 12.9961 0.120981 12.668 0.031137C12.3399 -0.0587068 11.9922 0.0389495 11.7578 0.285043L10 2.08973L8.2422 0.285043Z"
                              fill="#9333EA"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_10_1384">
                              <path d="M0 0H20V20H0V0Z" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div className="flex flex-col text-sm">
                        <span className="text-2xl font-semibold">
                          Shipping Information
                        </span>
                        <span className="text-gray-500">
                          Fast and reliable delivery options
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 rounded-lg p-7 bg-purple-500/5">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={20} className="fill-purple-500" />
                        <span className="font-semibold">Return Windows</span>
                      </div>
                      <p className="font-bold text-2xl mt-2 text-purple-500">
                        7 Days Return Policy
                      </p>
                      <p className="text-sm text-gray-500">
                        Return or exchange within 7 days of delivery
                      </p>
                    </div>

                    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-4">
                      <div className="bg-gray-100 p-7 rounded-md flex flex-col items-center">
                        <svg
                          width="25"
                          height="25"
                          viewBox="0 0 24 29"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M24 29H0V0H24V29Z" stroke="#E5E7EB" />
                          <g clipPath="url(#clip0_10_1300)">
                            <path
                              d="M3.68448 2.23445C3.23917 1.88758 2.60636 1.92976 2.20323 2.3282L0.328233 4.2032C-0.0702049 4.60164 -0.112392 5.23445 0.229795 5.68445L3.9798 10.5595C4.19073 10.836 4.52355 11.0001 4.87042 11.0001H7.40636L12.5157 16.1095C11.8267 17.4688 12.047 19.1751 13.186 20.3095L18.436 25.5595C19.022 26.1454 19.9735 26.1454 20.5595 25.5595L23.5595 22.5595C24.1454 21.9735 24.1454 21.0219 23.5595 20.436L18.3095 15.186C17.1751 14.0516 15.4689 13.8266 14.1095 14.5157L9.00011 9.40633V6.87508C9.00011 6.52351 8.83605 6.19539 8.55948 5.98445L3.68448 2.23445ZM0.93292 20.5673C0.337608 21.1626 0.000107637 21.9735 0.000107637 22.8173C0.000107637 24.5751 1.42511 26.0001 3.18292 26.0001C4.02667 26.0001 4.83761 25.6626 5.43292 25.0673L10.9548 19.5454C10.5892 18.5657 10.5329 17.5016 10.786 16.4938L7.89386 13.6016L0.93292 20.5673ZM24.0001 8.75008C24.0001 8.25789 23.9485 7.77976 23.8501 7.32039C23.7376 6.79539 23.0954 6.65945 22.7157 7.03914L19.7204 10.0345C19.5798 10.1751 19.3876 10.2548 19.1907 10.2548H16.5001C16.0876 10.2548 15.7501 9.91726 15.7501 9.50476V6.80945C15.7501 6.61258 15.8298 6.42039 15.9704 6.27976L18.9657 3.28445C19.3454 2.90476 19.2095 2.26258 18.6845 2.15008C18.2204 2.05164 17.7423 2.00008 17.2501 2.00008C13.5235 2.00008 10.5001 5.02351 10.5001 8.75008V8.78758L14.4985 12.786C16.186 12.3595 18.0517 12.8094 19.3735 14.1313L20.1095 14.8673C22.4064 13.7891 24.0001 11.4548 24.0001 8.75008ZM2.62511 22.2501C2.62511 21.9517 2.74363 21.6656 2.95461 21.4546C3.16559 21.2436 3.45174 21.1251 3.75011 21.1251C4.04848 21.1251 4.33462 21.2436 4.5456 21.4546C4.75658 21.6656 4.87511 21.9517 4.87511 22.2501C4.87511 22.5484 4.75658 22.8346 4.5456 23.0456C4.33462 23.2565 4.04848 23.3751 3.75011 23.3751C3.45174 23.3751 3.16559 23.2565 2.95461 23.0456C2.74363 22.8346 2.62511 22.5484 2.62511 22.2501Z"
                              fill="#4B5563"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_10_1300">
                              <path d="M0 2H24V26H0V2Z" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <h3 className="font-semibold">Manufacturing Defects</h3>
                        <span className="text-gray-500">
                          Full coverage for production
                        </span>
                      </div>

                      <div className="bg-gray-100 p-7 rounded-md flex flex-col items-center">
                        <Hammer />
                        <h3 className="font-semibold">Manufacturing Defects</h3>
                        <span className="text-gray-500">
                          Full coverage for production
                        </span>
                      </div>

                      <div className="bg-gray-100 p-7 rounded-md flex flex-col items-center">
                        <svg
                          width="25"
                          height="25"
                          viewBox="0 0 26 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.4047 17.2078C15.6844 17.025 16.8375 16.2985 17.5547 15.1969L25.1344 3.47346C25.725 2.5594 25.575 1.35002 24.7781 0.604709C23.9812 -0.140604 22.7672 -0.206229 21.8953 0.450021L10.8 8.77502C9.675 9.61877 9.00938 10.936 9 12.3422L14.4047 17.2078ZM13.4859 18.3985L8.04844 13.5047C5.24531 13.6078 3 15.9188 3 18.75C3 18.9328 3.00937 19.1156 3.02812 19.2938C3.1125 20.1141 2.55 21 1.725 21H1.5C0.670312 21 0 21.6703 0 22.5C0 23.3297 0.670312 24 1.5 24H8.25C11.1516 24 13.5 21.6516 13.5 18.75C13.5 18.6328 13.4953 18.5156 13.4906 18.3985H13.4859Z"
                            fill="#4B5563"
                          />
                        </svg>

                        <h3 className="font-semibold">Manufacturing Defects</h3>
                        <span className="text-gray-500">
                          Full coverage for production
                        </span>
                      </div>
                    </div>
                    <div className="mt-7 rounded-lg bg-secondary flex flex-col gap-2 items-center p-3">
                      <h2 className="text-2xl font-bold text-white">
                        Need Help?
                      </h2>
                      <span className="text-gray-300 text-center">
                        Our customer service team is here to assist you
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center mt-4">
                        <div className="flex flex-col gap-1 text-center text-white  p-4">
                          <span className="bg-gray-100/20 p-3 rounded-full w-fit mx-auto">
                            <Phone className="fill-white stroke-0" size={20} />
                          </span>
                          <small className="text-gray-300 mt-1">Call Us</small>
                          <span className="text-semibold text-lg">
                            {' '}
                            +62 823-2126-1350
                          </span>
                        </div>
                        <div className="flex flex-col gap-1 text-center text-white  p-4">
                          <span className="bg-gray-100/20 p-3 rounded-full w-fit mx-auto">
                            <Mail className="" size={20} />
                          </span>
                          <small className="text-gray-300 mt-1">Email Us</small>
                          <span className="text-semibold text-lg">
                            {' '}
                            ahmadadptr@gmail.com
                          </span>
                        </div>
                        <div className="flex flex-col gap-1 text-center text-white p-4">
                          <span className="bg-gray-100/20 p-3 rounded-full w-fit mx-auto">
                            <MessagesSquare
                              className="fill-white stroke-0"
                              size={20}
                            />
                          </span>
                          <small className="text-gray-300 mt-1">
                            Live Chat
                          </small>
                          <span className="text-semibold text-lg">
                            {' '}
                            1-800-FURNI-CRAFT
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <>
                  {product.reviews.map((review, i) => {
                    const convertDate = formatDate(review.date);
                    return (
                      <div key={i} className="mb-3 bg-gray-200 p-4 rounded-md">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <img
                              src="/user.avif"
                              alt="user"
                              className="w-10 h-10 rounded-full object-contain"
                            />
                            <div className="flex flex-col justify-center">
                              <span className="font-semibold">
                                {review.reviewerName}
                              </span>
                              <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }, (_, i) => (
                                  <Star
                                    key={i}
                                    size={12}
                                    className={`${
                                      i < review.rating
                                        ? 'fill-warning text-warning'
                                        : 'text-gray-400'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-gray-500">{convertDate}</span>
                        </div>

                        <p className="p-2 mt-1">{review.comment}</p>
                      </div>
                    );
                  })}
                </>
              )}

              {activeTab === 'spesifications' && (
                <div>
                  <div className="font-semibold">Product Specifications</div>
                  <div className="overflow-x-auto w-full my-4">
                    <table className="table w-full border border-base-300">
                      <tbody>
                        <tr className="hover">
                          <th className="bg-base-200 w-1/3">Brand</th>
                          <td>{product.brand}</td>
                        </tr>
                        <tr className="hover">
                          <th className="bg-base-200">Category</th>
                          <td>{product.category}</td>
                        </tr>
                        <tr className="hover">
                          <th className="bg-base-200">SKU</th>
                          <td>{product.sku}</td>
                        </tr>
                        <tr className="hover">
                          <th className="bg-base-200">Dimensions</th>
                          <td>
                            <div className="flex flex-col">
                              <span>Width: {product.dimensions.width} cm</span>
                              <span>
                                Height: {product.dimensions.height} cm
                              </span>
                              <span>Depth: {product.dimensions.depth} cm</span>
                            </div>
                          </td>
                        </tr>
                        <tr className="hover">
                          <th className="bg-base-200">Weight</th>
                          <td>{product.weight} kg</td>
                        </tr>
                        <tr className="hover">
                          <th className="bg-base-200">Min. Order</th>
                          <td>{product.minimumOrderQuantity} units</td>
                        </tr>
                        <tr className="hover">
                          <th className="bg-base-200">Warranty</th>
                          <td>{product.warrantyInformation}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="font-semibold mt-6">Description</p>
                  <p className="text-gray-500 mt-2 text-sm">
                    {product.description}
                  </p>

                  <p className="font-semibold mt-3 mb-1">Tags</p>
                  <div className="flex items-center gap-1 flex-wrap">
                    {product.tags.map((item, i) => (
                      <div key={i}>
                        <span className="badge bg-secondary/20 text-gray-600">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </>
      ) : (
        <p className="text-center text-gray-500 py-20">Loading...</p>
      )}
    </>
  );
}

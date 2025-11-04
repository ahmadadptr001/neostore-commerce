'use client';
import { getAllCategories, getAllProducts } from '../../services/products';
import { Search, Star, ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Products() {
  const router = useRouter();

  // data utama
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);

  // filter states
  const [availability, setAvailability] = useState(null); // 'available' | 'notAvailable' | null
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [query, setQuery] = useState('');

  // UI states
  const [categoriesFilter, setCategoriesFilter] = useState([]);
  const [openFilters, setOpenFilters] = useState(false);
  const [loading, setLoading] = useState(false);

  // fetch awal
  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getAllProducts();
      const cats = await getAllCategories();

      if (res === 'Network Error') {
        setAllProducts([]);
        setProducts([]);
        setLoading(false);
        return;
      }

      setAllProducts(res.products);
      setProducts(res.products);
      setCategoriesFilter(cats);
      setLoading(false);
    })();
  }, []);

  // pipeline filter
  useEffect(() => {
    let filtered = [...allProducts];

    // search
    if (query) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    // availability
    if (availability === 'available') {
      filtered = filtered.filter((p) => p.stock > 0);
    } else if (availability === 'notAvailable') {
      filtered = filtered.filter((p) => p.stock <= 0);
    }

    // category
    if (category) {
      filtered = filtered.filter((p) => p.category === category);
    }

    // rating
    if (rating > 0) {
      filtered = filtered.filter((p) => Math.floor(p.rating) === rating);
    }

    // price
    filtered = filtered.filter(
      (p) => p.price >= minPrice && p.price <= maxPrice
    );

    setProducts(filtered);
  }, [query, availability, category, rating, minPrice, maxPrice, allProducts]);

  // reset filter
  const resetFilters = () => {
    setAvailability(null);
    setCategory('');
    setRating(0);
    setMinPrice(0);
    setMaxPrice(1000);
  };

  // card produk
  const cardProducts = (item) => (
    <div
      key={item.id}
      className="cursor-pointer"
      onClick={() => router.push('/products/details/' + item.id)}
    >
      <img
        className="object-contain h-50 w-50 mx-auto"
        src={item.images[0]}
        alt={item.title}
        loading="lazy"
      />
      <p className="text-gray-500 mt-3">{item.category}</p>
      <div className="mt-1 flex flex-col text-[14px]">
        <h3 className="font-[550] text-md line-clamp-1">{item.title}</h3>
        <div className="flex items-center flex-wrap justify-between px-1 mt-1">
          <p className="font-bold text-error">${item.price}</p>
          <p className="font-bold text-warning flex items-center gap-1">
            <Star size={10} /> {item.rating}
          </p>
        </div>
      </div>
    </div>
  );

  const cardFilters = ({
    openFilters,
    availability,
    setAvailability,
    category,
    setCategory,
    categoriesFilter,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    rating,
    setRating,
    allProducts,
    resetFilters,
  }) => (
    <div className={`p-4 ${openFilters ? 'block' : 'hidden'} md:block`}>
      <div className="flex items-center justify-between flex-nowrap">
        <h2 className="font-semibold text-lg md:text-2xl">Filters Product</h2>
        <button
          type="button"
          onClick={resetFilters}
          className="cursor-pointer underline text-red-700 text-sm md:text-base"
        >
          Reset Filters
        </button>
      </div>

      {/* Reset */}

      {/* Availability */}
      <div className="collapse collapse-arrow !rounded-[0] border-dashed pt-5 border-t border-gray-300 mt-5">
        <input type="radio" name="accordion" defaultChecked />
        <div className="collapse-title font-semibold p-1">Availability</div>
        <div className="collapse-content mt-3 p-1 text-gray-500">
          <label htmlFor="available" className="flex items-center gap-2">
            <input
              id="available"
              type="radio"
              name="availability"
              checked={availability === 'available'}
              onChange={() => setAvailability('available')}
              className="h-6 w-6"
            />
            <span>
              Available (
              <span className="text-info">
                {allProducts.filter((p) => p.stock > 0).length}
              </span>
              )
            </span>
          </label>
          <label
            htmlFor="notAvailable"
            className="mt-2 flex items-center gap-2 pb-5"
          >
            <input
              id="notAvailable"
              type="radio"
              name="availability"
              checked={availability === 'notAvailable'}
              onChange={() => setAvailability('notAvailable')}
              className="h-6 w-6"
            />
            <span>
              Out of Stock (
              <span className="text-error">
                {allProducts.filter((p) => p.stock <= 0).length}
              </span>
              )
            </span>
          </label>
        </div>
      </div>

      {/* Category */}
      <div className="collapse collapse-arrow !rounded-[0] border-dashed pt-5 border-t border-gray-300">
        <input type="radio" name="accordion" />
        <div className="collapse-title font-semibold p-1">Category</div>
        <div className="collapse-content mt-3 p-1">
          <div className="pb-4 flex flex-col gap-1">
            {categoriesFilter.map((item) => (
              <label
                key={item}
                htmlFor={`cat-${item}`}
                className="flex items-center gap-2"
              >
                <input
                  id={`cat-${item}`}
                  type="radio"
                  name="categories"
                  checked={category === item}
                  onChange={() => setCategory(item)}
                  className="w-7 h-7"
                />
                <p className="line-clamp-1 text-gray-500">{item}</p>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Price Range */}
      <div className="collapse collapse-arrow !rounded-[0] border-dashed pt-5 border-t border-gray-300">
        <input type="radio" name="accordion" />
        <div className="collapse-title font-semibold p-1">Price Range</div>
        <div className="collapse-content mt-3 p-1">
          <div className="w-full max-w-xs p-6 bg-base-100 border border-base-300 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-center mb-4">
              Price Range
            </h2>

            <div className="flex items-center justify-between gap-6 mb-4">
              <div className="flex flex-col items-start w-full">
                <label
                  htmlFor="min-price"
                  className="text-sm text-base-content/70 mb-1"
                >
                  Min
                </label>
                <div className="relative w-full">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-base-content/70">
                    $
                  </span>
                  <input
                    id="min-price"
                    type="number"
                    min="0"
                    max={maxPrice}
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className="input input-bordered input-sm w-full pl-6"
                  />
                </div>
              </div>

              <div className="flex flex-col items-start w-full">
                <label
                  htmlFor="max-price"
                  className="text-sm text-base-content/70 mb-1"
                >
                  Max
                </label>
                <div className="relative w-full">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-base-content/70">
                    $
                  </span>
                  <input
                    id="max-price"
                    type="number"
                    min={minPrice}
                    max="1000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="input input-bordered input-sm w-full pl-6"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="range-min" className="sr-only">
                Minimum Price
              </label>
              <input
                id="range-min"
                type="range"
                min="0"
                max="1000"
                step="10"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="range range-sm accent-primary"
              />
              <label htmlFor="range-max" className="sr-only">
                Maximum Price
              </label>
              <input
                id="range-max"
                type="range"
                min="0"
                max="1000"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="range range-sm accent-primary"
              />
            </div>

            <div className="text-center mt-5 text-base-content/80">
              <span className="font-medium">${minPrice.toLocaleString()}</span>
              <span className="mx-2 text-base-content/50">—</span>
              <span className="font-medium">${maxPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ratings */}
      <div className="collapse collapse-arrow !rounded-[0] border-dashed pt-5 border-t border-gray-300">
        <input type="radio" name="accordion" />
        <div className="collapse-title font-semibold p-1">Ratings</div>
        <div className="collapse-content mt-3 p-1">
          <>
            {[1, 2, 3, 4, 5].map((r) => (
              <label key={r} htmlFor={`rating-${r}`} className="rating">
                <input
                  id={`rating-${r}`}
                  type="radio"
                  name="rating"
                  className="mask mask-star-2 bg-orange-400"
                  checked={rating === r}
                  onChange={() => setRating(r)}
                />
              </label>
            ))}
          </>
        </div>
      </div>
    </div>
  );

  return (
    <section className="overflow-x-hidden grid grid-cols-3 min-h-[80vh]">
      {/* Search */}
      <div className="md:col-span-2 md:order-2 order-1 col-span-3 p-4 flex flex-col justify-center">
        <label
          htmlFor="search-products"
          className="mt-4 mx-auto w-full md:mx-0 max-w-md rounded-md p-3 bg-gray-200 flex items-center justify-between"
        >
          <Search size={20} />
          <input
            className="input-none w-full text-end"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            id="search-products"
          />
        </label>
      </div>

      {/* Sidebar Filters */}
      <div
        className={`flex flex-col px-5 py-0 md:py-10 md:order-1 md:row-span-2 order-2 row-span-1 ${
          openFilters ? 'col-span-2' : 'col-span-1'
        }`}
      >
        {cardFilters({
          openFilters,
          availability,
          setAvailability,
          category,
          setCategory,
          categoriesFilter,
          minPrice,
          setMinPrice,
          maxPrice,
          setMaxPrice,
          rating,
          setRating,
          allProducts,
          resetFilters,
        })}
      </div>

      {/* Products Grid */}
      <div
        className={`md:order-3 md:col-span-2 order-3 p-3 ${
          openFilters ? 'col-span-1' : 'col-span-3'
        } duration-500`}
      >
        <p
          className="md:hidden py-2 px-2 font-bold text-2xl flex items-center text-gray-600 gap-3 cursor-pointer mb-3"
          onClick={() => setOpenFilters(!openFilters)}
        >
          {openFilters ? (
            <ArrowLeft size={18} />
          ) : (
            <>
              Filters <ArrowRight size={18} />
            </>
          )}
        </p>

        <p className="mt-3 font-semibold ms-2 text-lg">All Products</p>
        <div
          className={`grid ${
            openFilters ? 'grid-cols-1' : 'grid-cols-2'
          } md:grid-cols-3 lg:grid-cols-4 gap-6 text-xs sm:text-sm mt-5 overflow-y-scroll h-150 p-5`}
        >
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skeleton h-40 sm:h-60"></div>
            ))
          ) : products.length === 0 ? (
            <div className="p-3 col-span-3">
              <img
                className="mx-auto"
                src="https://media.tenor.com/9X3Fc4fequQAAAAi/not-at-all-work.gif"
                alt="gif tidak ditemukan"
              />
            </div>
          ) : (
            products.map(cardProducts)
          )}
        </div>
      </div>
    </section>
  );
}

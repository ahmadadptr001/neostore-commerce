'use client';
import {
  getAllCategories,
  getAllProducts,
  getProductByCategory,
} from '@/services/products';
import { getAllCategoryName } from '@/utils/products';
import {
  ArrowLeft,
  ArrowRight,
  MinusCircle,
  PlusCircle,
  Search,
  Star,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Products() {
  const router = useRouter();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [queryInputSearch, setQueryInputSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [available, setAvailable] = useState(0);
  const [categoriesChoice, setCategoriesChoice] = useState('');
  const [notAvailable, setNotAvailable] = useState(0);
  const [openFilters, setOpenFilters] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoriesFilter, setCategoriesFilter] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      let response = await getAllProducts();
      if (response == 'Network Error') {
        response = [];
      }

      response = response.products;
      let allCategory = getAllCategoryName(response);
      let allCategoryFilter = await getAllCategories();
      setCategoriesFilter(allCategoryFilter);
      setCategories(allCategory);

      const availableProducts = response.filter((item) => item.stock > 0);
      const notAvailableProducts = response.filter((item) => item.stock <= 0);

      if (categoriesChoice) {
        const responseByCategory = await getProductByCategory(categoriesChoice);
        setProducts(responseByCategory.products);
        setLoading(false);
        return;
      }

      if (queryInputSearch) {
        setProducts(
          response.filter((item) =>
            item.title
              .toLowerCase()
              .includes(queryInputSearch.toLocaleLowerCase())
          )
        );
        setLoading(false);
        return;
      }

      if (rating !== 0) {
        const filterProductsRating = response.filter(
          (item) => Math.floor(item.rating) === rating
        );
        setProducts(filterProductsRating);
        setLoading(false);
        return;
      }

      if (minPrice !== 0 || maxPrice !== 0) {
        const filterRangePriceProducts = response.filter(
          (item) => item.price >= minPrice && item.price <= maxPrice
        );
        setProducts(filterRangePriceProducts);
        setLoading(false);
        return;
      }

      setAvailable(availableProducts);
      setNotAvailable(notAvailableProducts);
      setProducts(response);

      setLoading(false);
    })();
  }, [queryInputSearch, categoriesChoice, rating, minPrice, maxPrice]);

  const sizes = ['XS', 'S', 'M', 'L', 'XL', '2X'];

  const cardCategories = (item) => (
    <div
      className="p-3 hover:bg-gray-300 select-none active:bg-gray-300 border border-gray-300 hover:scale-105 duration-500 cursor-pointer"
      onClick={() => setCategoriesChoice(item)}
    >
      <p>{item}</p>
    </div>
  );

  const cardProducts = (item) => (
    <div
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
      <div className="mt-1 flex flex-col">
        <h3 className="font-[550] text-md line-clamp-1">{item.title}</h3>
        <div className="flex items-center flex-wrap justify-between px-2 mt-1">
          <p className="font-bold text-error">$ {item.price}</p>
          <p className="font-bold text-warning flex items-center gap-1">
            <Star size={10} /> {item.rating}
          </p>
        </div>
      </div>
    </div>
  );

  const cardFilters = () => (
    <div className={`p-4 ${openFilters ? 'block' : 'hidden'} md:block`}>
      <h2 className="font-semibold text-2xl">Filters Product</h2>
      <p className="font-semibold mt-3">Size</p>
      <div className="flex flex-wrap gap-1 mt-2">
        {sizes.map((item, i) => (
          <div
            key={i}
            className="p-2 border border-gray-400 px-3 hover:scale-105 duration-500 cursor-pointer"
          >
            {item}
          </div>
        ))}
      </div>

      {/* accordion fitlers */}
      <div className="collapse collapse-arrow !rounded-[0] border-dashed pt-5 border-t border-gray-300 mt-5">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title font-semibold p-1">Availability</div>
        <div className="collapse-content mt-3 p-1 text-gray-500">
          <label htmlFor="av-1" className="flex items-center gap-2">
            <input
              type="radio"
              name="availability"
              id="av-1"
              onChange={() => setProducts(available)}
              className="h-6 w-6"
            />
            <span>
              Availability {'('}
              <span className="text-info">{available.length}</span>
              {')'}
            </span>
          </label>
          <label htmlFor="av-2" className="mt-2 flex items-center gap-2 pb-5">
            <input
              type="radio"
              name="availability"
              id="av-2"
              onChange={() => setProducts(notAvailable)}
              className="h-6 w-6"
            />
            <span>
              Out of Stack {'('}
              <span className="text-error">{notAvailable.length}</span>
              {')'}
            </span>
          </label>
        </div>
      </div>

      <div className="collapse collapse-arrow !rounded-[0] border-dashed pt-5 border-t border-gray-300">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold p-1">Category</div>
        <div className="collapse-content mt-3 p-1">
          <div className="pb-4 flex flex-col gap-1">
            {categoriesFilter &&
              categoriesFilter.map((item, i) => (
                <label
                  key={i}
                  htmlFor={`category-${item}`}
                  className="flex items-center gap-2"
                >
                  <input
                    type="radio"
                    name="categories"
                    onChange={(e) => setCategoriesChoice(item)}
                    id={`category-${item}`}
                    className="w-7 h-7"
                  />
                  <p className="line-clamp-1 text-gray-500">{item}</p>
                </label>
              ))}
          </div>
        </div>
      </div>

      <div className="collapse collapse-arrow !rounded-[0] border-dashed pt-5 border-t border-gray-300">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold p-1">Price Range</div>
        <div className="collapse-content mt-3 p-1">
          <div className="w-full max-w-xs p-6 bg-base-100 border border-base-300 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-center mb-4">
              Price Range
            </h2>

            <div className="flex items-center justify-between gap-6 mb-4">
              <div className="flex flex-col items-start w-full">
                <label className="text-sm text-base-content/70 mb-1">Min</label>
                <div className="relative w-full">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-base-content/70">
                    $
                  </span>
                  <input
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
                <label className="text-sm text-base-content/70 mb-1">Max</label>
                <div className="relative w-full">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-base-content/70">
                    $
                  </span>
                  <input
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
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="range range-sm accent-primary"
              />
              <input
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

      <div className="collapse collapse-arrow !rounded-[0] border-dashed pt-5 border-t border-gray-300">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold p-1">Ratings</div>
        <div className="collapse-content mt-3 p-1">
          <div className="rating">
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
              aria-label="1 star"
              onChange={() => setRating(1)}
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
              aria-label="2 star"
              onChange={() => setRating(2)}
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
              aria-label="3 star"
              onChange={() => setRating(3)}
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
              aria-label="4 star"
              onChange={() => setRating(4)}
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
              aria-label="5 star"
              onChange={() => setRating(5)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="overflow-x-hidden grid grid-cols-3 min-h-[80vh]">
      <div className=" md:col-span-2 md:order-2 order-1 col-span-3 md:text-start text-center p-4 flex flex-col justify-center">
        <p className="font-semibold text-gray-500">
          Home / <span className="text-gray-600">Products</span>
        </p>
        <h3 className="font-extrabold text-2xl">PRODUCTS</h3>
        <label
          htmlFor="search-products"
          className="mt-4 mx-auto w-full md:mx-0 max-w-md rounded-md p-3 bg-gray-200 flex items-center justify-between"
        >
          <Search size={20} />
          <input
            className="input-none w-full text-end"
            type="text"
            value={queryInputSearch}
            onChange={(e) => setQueryInputSearch(e.target.value)}
            placeholder="Search"
            id="search-products"
          />
        </label>
      </div>

      <div
        className={`flex flex-col px-5 py-0 md:py-10 md:order-1 md:row-span-2 order-2 row-span-1 ${
          openFilters ? 'col-span-2' : 'col-span-1'
        }`}
      >
        {cardFilters()}
      </div>

      <div
        className={`md:order-3 md:col-span-2 order-3 p-3 ${
          openFilters ? 'col-span-1' : 'col-span-3'
        } duration-500`}
      >
        {/* filter kategory */}
        <p
          className="md:hidden py-2 px-2 font-bold text-2xl flex items-center text-gray-600 gap-3 cursor-pointer mb-3"
          onClick={() => setOpenFilters(!openFilters)}
        >
          Filters
          {openFilters ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {categories &&
            categories.map((item, i) => (
              <div key={i}>{cardCategories(item)}</div>
            ))}
        </div>

        {/* grid products */}
        <div
          className={`grid ${
            openFilters ? 'grid-cols-1' : 'grid-cols-3'
          } md:grid-cols-3 lg:grid-cols-4 gap-6 text-xs sm:text-sm mt-5 overflow-y-scroll h-150 p-5`}
        >
          {loading ? (
            <>
              <div className="skeleton h-40 sm:h-40"></div>
              <div className="skeleton h-40 sm:h-60"></div>
              <div className="skeleton h-40 sm:h-60"></div>
              <div className="skeleton h-40 sm:h-60"></div>
              <div className="skeleton h-40 sm:h-60"></div>
              <div className="skeleton h-40 sm:h-60"></div>
              <div className="skeleton h-40 sm:h-60"></div>
              <div className="skeleton h-40 sm:h-60"></div>
            </>
          ) : (
            <>
              {products.length == 0 && (
                <div className="p-3 col-span-3">
                  <img
                    className="mx-auto"
                    src="https://media.tenor.com/9X3Fc4fequQAAAAi/not-at-all-work.gif"
                    alt="gif tidak ditemukan"
                  />
                </div>
              )}
              {products &&
                products.map((item, i) => (
                  <div key={i}>{cardProducts(item)}</div>
                ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

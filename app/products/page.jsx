'use client';
import { getAllProducts } from '@/services/products';
import {
  Minus,
  MinusCircle,
  MinusSquare,
  Plus,
  PlusCircle,
  Search,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [openFilters, setOpenFilters] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getAllProducts();
      setProducts(response);
    })();
  });

  const categories = [
    "Men's Clothing",
    "Woman's Clothing",
    'Electronics',
    'Jewelery',
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', '2X'];

  const cardCategories = (item) => (
    <div className="p-3 border border-gray-300">
      <p>{item}</p>
    </div>
  );

  const cardProducts = (item) => (
    <div>
      <img
        className="object-contain h-50 w-50 mx-auto"
        src={item.image}
        alt={item.title}
        loading="lazy"
      />
      <p className="text-gray-500 mt-3">{item.category}</p>
      <div className="mt-1 flex flex-col">
        <h3 className="font-[550] text-md line-clamp-1">{item.title}</h3>
        <p className="font-bold text-error">$ {item.price}</p>
      </div>
    </div>
  );

  const cardFilters = () => (
    <div className={`p-4 ${openFilters ? 'block' : 'hidden'} md:block`}>
      <h2 className="font-semibold text-2xl">Filters</h2>
      <p className="font-semibold mt-3">Size</p>
      <div className="flex flex-wrap gap-1 mt-2">
        {sizes.map((item, i) => (
          <div key={i} className="p-2 border border-gray-400 px-3 ">
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
              className="h-6 w-6"
            />
            <span>
              Availability {'('}
              <span className="text-info">450</span>
              {')'}
            </span>
          </label>
          <label htmlFor="av-2" className="mt-2 flex items-center gap-2 pb-5">
            <input
              type="radio"
              name="availability"
              id="av-2"
              className="h-6 w-6"
            />
            <span>
              Out of Stack {'('}
              <span className="text-error">16</span>
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
            {categories.map((item, i) => (
              <label
                key={i}
                htmlFor={`category-${item}`}
                className="flex items-center gap-2"
              >
                <input
                  type="radio"
                  name="categories"
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
          <p className="pb-4">🙌 sabar fitur belum tersedia</p>
        </div>
      </div>

      <div className="collapse collapse-arrow !rounded-[0] border-dashed pt-5 border-t border-gray-300">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold p-1">Ratings</div>
        <div className="collapse-content mt-3 p-1">
          <p className="pb-4">🙌 sabar fitur belum tersedia</p>
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
          className="mt-4 mx-auto w-full md:mx-0 max-w-md rounded-md p-3 bg-gray-300 flex items-center justify-between"
        >
          <Search size={20} />
          <input
            className="input-none w-full text-end"
            type="text"
            placeholder="Search"
            id="search-products"
          />
        </label>
      </div>

      <div className={`flex flex-col px-5 justify-center md:order-1 md:row-span-2 order-2 row-span-1 ${openFilters ? 'col-span-2' : 'col-span-1'}`}>
        {cardFilters()}
      </div>

      <div className={`md:order-3 md:col-span-2 order-3 p-3 ${openFilters ? 'col-span-1' : 'col-span-3'} duration-500`}>
        {/* filter kategory */}
        <p
          className="md:hidden py-2 px-2 font-bold text-2xl flex items-center text-gray-600 gap-3 cursor-pointer mb-3"
          onClick={() => setOpenFilters(!openFilters)}
        >
          Filters
          {openFilters ? <PlusCircle size={18} /> : <MinusCircle size={18} />}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {categories.map((item, i) => (
            <div key={i}>{cardCategories(item)}</div>
          ))}
        </div>

        {/* grid products */}
        <div className={`grid ${openFilters ? 'grid-cols-1' : 'grid-cols-3'} md:grid-cols-3 lg:grid-cols-4 gap-6 text-xs sm:text-sm mt-5 overflow-y-scroll h-150`}>
          {products.length == 0 && (
            <>
              <div className="skeleton w-50 h-50"></div>
              <div className="skeleton w-50 h-50"></div>
              <div className="skeleton w-50 h-50"></div>
              <div className="skeleton w-50 h-50"></div>
              <div className="skeleton w-50 h-50"></div>
              <div className="skeleton w-50 h-50"></div>
              <div className="skeleton w-50 h-50"></div>
              <div className="skeleton w-50 h-50"></div>
              <div className="skeleton w-50 h-50"></div>
              <div className="skeleton w-50 h-50"></div>
              <div className="skeleton w-50 h-50"></div>
              <div className="skeleton w-50 h-50"></div>
            </>
          )}
          {products &&
            products.map((item, i) => <div key={i}>{cardProducts(item)}</div>)}
        </div>
      </div>
    </section>
  );
}

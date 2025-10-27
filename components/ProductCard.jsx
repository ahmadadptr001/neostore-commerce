"use client";
import Image from "next/image";
import { useState } from "react";

export default function ProductCard({ item }) {
  const [imgError, setImgError] = useState(false);

  const showSkeleton = !item?.image || imgError;

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition duration-300">
      <figure className="px-4 pt-4 h-56 flex items-center justify-center">
        {showSkeleton ? (
          // ✅ Skeleton fallback jika image belum siap atau undefined
          <div className="skeleton w-40 h-40 rounded-xl bg-base-200 animate-pulse"></div>
        ) : (
          <Image
            src={item.image}
            alt={item.title || "Produk"}
            width={300}
            height={300}
            className="rounded-xl object-contain h-48 transition-opacity duration-300"
            onError={() => setImgError(true)}
          />
        )}
      </figure>

      <div className="card-body">
        <h2 className="card-title text-sm md:text-base line-clamp-2">{item?.title || "Produk Tanpa Judul"}</h2>
        <p className="text-lg font-bold text-primary">
          {item?.price ? `$${item.price}` : "Harga belum tersedia"}
        </p>

        <div className="card-actions justify-end">
          <button className="btn btn-sm btn-primary">Detail</button>
          <button className="btn btn-sm btn-secondary">Tambah</button>
        </div>
      </div>
    </div>
  );
}

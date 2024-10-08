"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * ProductList component that displays a list of products with image and information.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.product - The product data to display.
 * @returns {JSX.Element} - Rendered ProductList component.
 */
export default function ProductList({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const searchParams = useSearchParams();

  /**
   * Handle showing the previous image in the gallery.
   *
   * @param {Event} e - The click event.
   */
  const handlePrevImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  /**
   * Handle showing the next image in the gallery.
   *
   * @param {Event} e - The click event.
   */
  const handleNextImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Link
      href={`/products/${product.id}?${searchParams.toString()}`}
      className="block p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="relative bg-slate-300">
        <Image
          src={
            product.images
              ? product.images[currentImageIndex]
              : product.thumbnail
          }
          alt={`Image of ${product.title}`}
          width={320}
          height={320}
          className="object-contain w-full h-48 mb-4"
          quality={75} // Serve optimized image
          priority // For preloading important images
        />

        {product.images && product.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
              &#8249;
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
              &#8250;
            </button>
          </>
        )}
      </div>
      <h2 className="text-lg font-bold truncate text-black ">
        {product.title}
      </h2>
      <p className="text-gray-700">{product.category}</p>
      <p className="text-green-600 font-semibold">
        ${product.price.toFixed(2)}
      </p>
      <div className="flex items-center mt-2">
        <span className="text-yellow-400 mr-1">★</span>
        <span className="text-gray-600 text-sm">
          {product.rating.toFixed(1)}
        </span>
      </div>
      <button className="inline-flex justify-center whitespace-nowrap rounded-lg bg-cyan-700 px-3 py-2 text-sm font-medium text-white hover:bg-cyan-900 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors">
              Add To Cart
            </button>
    </Link>
  );
}

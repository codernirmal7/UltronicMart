import React from "react";
import { FaStar } from "react-icons/fa6";

type ProductCardProps = {
  id: string;
  image: string;
  name: string;
  price: number;
  rating: number;
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  name,
  price,
  rating,
}) => {
  return (
    <div
      className="relative flex flex-col w-full max-w-xl max-[580px]:max-w-xl border border-gray-100 bg-white shadow-md rounded-lg overflow-hidden"
      key={id}
      style={{ height: '450px' }} // Set a fixed height for all cards
    >
      {/* Image Section */}
      <a
        className="relative flex justify-center items-center h-60 overflow-hidden rounded-xl"
        href="#"
      >
        <img
          className="object-contain w-full h-full"
          src={image}
          alt="product image"
        />
      </a>

      {/* Content Section */}
      <div className="w-full px-5 py-4 flex flex-col justify-between absolute bottom-0">
        {/* Product Title */}
        <a href="#" className="text-main hover:underline">
          <h5 className="text-md font-medium text-slate-900 hover:text-main h-auto">
            {name}
          </h5>
        </a>

        {/* Price and Rating Section */}
        <div className="mt-2 mb-4 flex items-center justify-between">
          <p>
            <span className="text-xl font-bold text-primary ">${price.toFixed(2)}</span>
          </p>
          <div className="flex items-center">
            {/* Render Star Rating dynamically based on rating */}
            {Array.from({ length: 5 }, (_, index) => (
              <FaStar
                key={index}
                className={index < rating ? "fill-yellow-200" : "fill-gray-300"}
              />
            ))}
            <span className="ml-3 text-xs font-semibold text-yellow-500 bg-yellow-200 rounded px-2.5 py-0.5">
              {rating}
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <a
          href="#"
          className="flex items-center justify-center rounded-md bg-primary/75 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Add to cart
        </a>
      </div>
    </div>
  );
};

export default ProductCard;

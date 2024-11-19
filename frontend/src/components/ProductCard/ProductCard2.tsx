import React from "react";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";

type Product2CardProps = {
  id: string;
  image: string;
  name: string;
  price: number;
  rating: number;
  handelAddToCart: () => void;
};

const ProductCard2: React.FC<Product2CardProps> = ({
  id,
  image,
  name,
  price,
  rating,
  handelAddToCart,
}) => {
  return (
    <div
      className="sm:flex border rounded-md border-gray-300 cursor-pointer group p-2"
      key={id}
    >
      <div className="w-full sm:w-[19rem] md:w-[20rem] flex justify-center items-center sm:border-r border-gray-300 p-3">
        <Link to={`/product/${id}`} className="block" key={id}>
          <img
            src={image}
            alt={name}
            className="rounded group-hover:scale-105 transition-transform duration-300 sm:w-auto max-w-[15rem]"
          />
        </Link>
      </div>
      <div className="w-full sm:w-2/3 p-4 flex flex-col justify-center">
        <Link
          to={`/product/${id}`}
          key={id}
          className="font-normal text-lg sm:text-xl group-hover:underline mb-2"
        >
          {name}
        </Link>
        <div className="flex items-center my-2">
          {Array.from({ length: 5 }, (_, index) => (
            <FaStar
              key={index}
              className={index < rating ? "fill-yellow-400" : "fill-gray-300"}
            />
          ))}
          <span className="ml-2 text-xs font-semibold text-yellow-500 bg-yellow-200 rounded px-2 py-0.5">
            {rating}
          </span>
        </div>
        <div className="text-2xl sm:text-2xl font-bold text-primary mt-2">
          ${price}
        </div>

        <button
          className="bg-primary/75 hover:bg-primary text-white sm:w-36 px-4 sm:px-5 py-2 sm:py-3 rounded-full mt-3 transition duration-200"
          onClick={handelAddToCart}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard2;

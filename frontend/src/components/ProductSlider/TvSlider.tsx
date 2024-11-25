import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../ProductCard/ProductCard"; // Assuming ProductCard is in the same folder
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { backendURL } from "@/constant/backendUrl";

type Product = {
  _id: string;
  name: string;
  price: number;
  rating: number;
  stock: number;
  category: string; // Add category to product data
  images: string[];
};

type TvSliderProps = {
  productData: Product[];
  loading: boolean;
  error: string | null;
};

const TvSlider: React.FC<TvSliderProps> = ({ productData, loading, error }) => {
  // Filter products by 'tv' category
  const filteredProducts = productData
    .filter((product) => product.category.toLowerCase() === "television")
    .slice(0, 5);

 
  return (
    <div className="pt-12 relative">
      <div className="flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          New Television
        </h2>
        <Link
          to="/television"
          className="flex items-center gap-1 font-medium text-main"
        >
          View more
          <FaArrowRight />
        </Link>
      </div>

      {loading ? (
        <span>Loading...</span>
      ) : error ? (
        <span>An error occurred.</span>
      ) : (
        <div className="py-10">
          {/* Swiper for displaying filtered tv */}
          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={3}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: ".custom-swiper-button-next3",
              prevEl: ".custom-swiper-button-prev3",
            }}
          
          >
            {filteredProducts.map((item) => (
              <SwiperSlide
                key={item._id}
                className="productslider flex justify-center"
              >
                  <ProductCard
                  key={item._id}
                    id={item._id}
                    image={`${backendURL}/productImages${
                      item.images[0].split("productImages")[1]
                    }`}
                    name={item.name}
                    price={item.price}
                    rating={item.rating}
                    stock={item.stock}

                  />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Swiper Navigation Buttons */}
          <div className="custom-swiper-button-prev3 absolute left-2 top-[50%] z-10 bg-primary/25 rounded-full w-14 h-14 p-2 cursor-pointer translate-y-[-50%]">
            <svg
              viewBox="0 0 1024 1024"
              className="icon fill-primary"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              
            >
              <path
                d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z"
                className="fill-primary"
              />
            </svg>
          </div>
          <div className="custom-swiper-button-next3 absolute right-2 top-[50%] z-10 bg-primary/25 rounded-full w-14 h-14 p-2 cursor-pointer translate-y-[-50%]">
            <svg
              viewBox="0 0 1024 1024"
              className="icon fill-primary"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              fill="rgb(174, 174, 174)"
            >
              <path
                d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z"
                className="fill-primary"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default TvSlider;

import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../ProductCard/ProductCard"; // Assuming ProductCard is in the same folder
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

type Product = {
  id: string;
  name: string;
  price: number;
  rating: number;
  category: string; // Add category to product data
  images: string[];
};

type LaptopSliderProps = {
  productData: Product[];
  loading: boolean;
  error: string | null;
};

const LaptopSlider: React.FC<LaptopSliderProps> = ({
  productData,
  loading,
  error,
}) => {
  // Filter products by 'laptop' category
  const filteredProducts = productData
    .filter((product) => product.category.toLowerCase() === "laptops")
    .slice(0, 5);

  return (
    <div className="pt-12 relative">
      <div className="flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          New Laptops
        </h2>
        <Link
          to="/laptops"
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
          {/* Swiper for displaying filtered laptops */}
          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={3} // Show 3 products per slide
            pagination={{ clickable: true }}
            navigation={{
              nextEl: ".custom-swiper-button-next1",
              prevEl: ".custom-swiper-button-prev1",
            }}
            breakpoints={{
              640: {
                slidesPerView: 1, // Mobile: show 1 product per slide
              },
              768: {
                slidesPerView: 2, // Tablet: show 2 products per slide
              },
              1024: {
                slidesPerView: 3, // Desktop: show 3 products per slide
              },
            }}
          >
            {filteredProducts.map((item) => (
              <SwiperSlide
                key={item.id}
                className="productslider flex justify-center"
              >
                <ProductCard
                  id={item.id}
                  image={`http://localhost:4000/productImages${
                    item.images[0].split("productImages")[1]
                  }`}
                  name={item.name}
                  price={item.price}
                  rating={item.rating}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Swiper Navigation Buttons */}
          <div className="swiper-button-prev custom-swiper-button-prev1">
            <svg
              viewBox="0 0 1024 1024"
              className="icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              fill="rgb(174, 174, 174)"
            >
              <path
                d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z"
                fill="rgb(174, 174, 174)"
              />
            </svg>
          </div>
          <div className="swiper-button-next custom-swiper-button-next1">
            <svg
              viewBox="0 0 1024 1024"
              className="icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              fill="rgb(174, 174, 174)"
            >
              <path
                d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z"
                fill="rgb(174, 174, 174)"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default LaptopSlider;

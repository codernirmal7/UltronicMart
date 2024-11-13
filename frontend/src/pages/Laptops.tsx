import Navbar from "@/components/Navbar/Navbar";
import ProductCard from "@/components/ProductCard/ProductCard";
import { AppDispatch, RootState } from "@/redux";
import { getAllProductsData } from "@/redux/slices/productSlice";
import { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function Laptops() {
  const product = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch<AppDispatch>();
  const filteredProducts = product.productData.filter(
    (product) => product.category.toLowerCase() === "laptops"
  );
  useEffect(() => {
    dispatch(getAllProductsData());
  }, []);

  return (
    <>
      <Navbar />
      <section id="home" className="hero-slider flex justify-center mt-24">
        <div className="w-full max-w-screen-xl py-7 px-3 ">
          <div className="relative">
            {product.loading ? (
              <span>Loading...</span>
            ) : product.error ? (
              <span>An error occurred.</span>
            ) : (
              <div className="py-5 grid grid-cols-3 gap-5">
                {filteredProducts.map((item) => (
                  <ProductCard
                    id={item.id}
                    image={`http://localhost:4000/productImages${
                      item.images[0].split("productImages")[1]
                    }`}
                    name={item.name}
                    price={item.price}
                    rating={item.rating}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

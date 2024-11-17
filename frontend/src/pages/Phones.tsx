import { useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import ProductCard2 from "@/components/ProductCard/ProductCard2";
import { AppDispatch, RootState } from "@/redux";
import { getAllProductsData } from "@/redux/slices/productSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { FaFilter } from "react-icons/fa6";
import PhonesProductFilter from "@/components/FilterProduct/PhonesProductFilter";
import { Link } from "react-router-dom";

export default function Phones() {
  const product = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch<AppDispatch>();
  const [navbarOpen, setnavbarOpen] = useState(false);

  // State to hold active filters
  const [activeFilters, setActiveFilters] = useState({
    brand: "",
    priceRange: [0, 2000], // Default range
    processor: "",
    ram: "",
    storage: "",
    screenSize: "",
  });

  // Filter products based on category and active filters
  const filteredProducts = product.productData.filter((product) => {
    const matchesCategory = product.category.toLowerCase() === "phones";
    const matchesBrand =
      !activeFilters.brand ||
      product.name.toLowerCase().includes(activeFilters.brand.toLowerCase());
    const matchesPrice =
      product.price >= activeFilters.priceRange[0] &&
      product.price <= activeFilters.priceRange[1];
    const matchesProcessor =
      !activeFilters.processor ||
      product.name
        .toLowerCase()
        .includes(activeFilters.processor.toLowerCase());
    const matchesRAM =
      !activeFilters.ram ||
      product.name.toLowerCase().includes(activeFilters.ram.toLowerCase());
    const matchesStorage =
      !activeFilters.storage ||
      product.name.toLowerCase().includes(activeFilters.storage.toLowerCase());
    const matchesScreenSize =
      !activeFilters.screenSize ||
      product.name
        .toLowerCase()
        .includes(activeFilters.screenSize.toLowerCase());

    return (
      matchesCategory &&
      matchesBrand &&
      matchesPrice &&
      matchesProcessor &&
      matchesRAM &&
      matchesStorage &&
      matchesScreenSize
    );
  });

  useEffect(() => {
    dispatch(getAllProductsData());
  }, []);

  return (
    <>
      <Navbar />
      <section className="flex justify-center mt-[4.7rem]">
        <div className="w-full max-w-screen-xl py-7 px-3">
          <div className="relative">
            {product.loading ? (
              <span>Loading...</span>
            ) : product.error ? (
              <span>An error occurred.</span>
            ) : (
              <div className="min-[1085px]:flex gap-5">
                <FaFilter
                  className="filterOpenButton mt-4 fill-primary"
                  size={25}
                  onClick={() => setnavbarOpen(true)}
                />
                <div className="w-full max-w-xs hidden min-[1085px]:flex">
                  <PhonesProductFilter
                    navbarOpen={navbarOpen}
                    setnavbarOpen={setnavbarOpen}
                    onFilterChange={(filters) => setActiveFilters(filters)}
                  />
                </div>
                <div className="w-full py-8 grid grid-cols-1 gap-5">
                  {filteredProducts.map((item) => (
                    <Link
                      to={`/product/${item._id}`}
                      className="block"
                      key={item._id}
                    >
                      <ProductCard2
                        id={item._id}
                        image={`http://localhost:4000/productImages${
                          item.images[0].split("productImages")[1]
                        }`}
                        name={item.name}
                        price={item.price}
                        rating={item.rating}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

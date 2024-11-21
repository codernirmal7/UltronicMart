import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux";
import Navbar from "@/components/Navbar/Navbar";
import { FaStar } from "react-icons/fa6";
import { Lens } from "@/components/ui/lens";
import CustomerReviews from "@/components/CustomerReviews/CustomerReviews";
import { useDispatch } from "react-redux";
import { addProductToCart } from "@/redux/slices/productSlice";
import { getUserCartAndPaymentHistory } from "@/redux/slices/authSlice";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [hovering, setHovering] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const product = useSelector((state: RootState) =>
    state.product.productData.find((item) => item._id === id)
  );
  const user = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const descriptionItems = product?.description.split("\\n");

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Product not found.</p>
      </div>
    );
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handelAddToCart = async () => {
    try {
      await dispatch(
        addProductToCart({
          productId: id,
          quantity: 1,
          userId: user.userData.message.id,
        })
      ).unwrap();

      //on Success
      dispatch(
        getUserCartAndPaymentHistory({ email: user.userData.message?.email })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen my-24 max-w-screen-xl mx-auto ">
        <div className="px-4 md:py-12">
          {/* Product Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Side - Image Gallery */}
            <div>
              <div>
                <div className="relative">
                  <div className="relative z-10">
                    <Lens hovering={hovering} setHovering={setHovering}>
                      <img
                        src={`http://localhost:4000/productImages${
                          product.images[selectedImage].split(
                            "productImages"
                          )[1]
                        }`}
                        alt="image"
                        className="rounded-2xl w-full h-[30rem] md:h-[33rem]"
                      />
                    </Lens>
                  </div>
                </div>
                <div className="mt-4 flex space-x-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      className={`w-16 h-16 border rounded-lg overflow-hidden ${
                        selectedImage === index
                          ? "border-primary ring-2 ring-primary"
                          : "border-gray-200"
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={`http://localhost:4000/productImages${
                          image.split("productImages")[1]
                        }`}
                        alt={`Thumbnail ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Product Details */}
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {product.name}
              </h1>
              <p className="text-2xl text-primary font-semibold">
                ${product.price.toFixed(2)}
              </p>
              <div className="flex items-center">
                {/* Render Star Rating dynamically based on rating */}
                {Array.from({ length: 5 }, (_, index) => (
                  <FaStar
                    key={index}
                    className={
                      index < product.rating
                        ? "fill-yellow-200"
                        : "fill-gray-300"
                    }
                  />
                ))}
                <span className="ml-3 text-xs font-semibold text-yellow-500 bg-yellow-200 rounded px-2.5 py-0.5">
                  {product.rating}
                </span>
              </div>
              <div className="h-7">
                <span className="font-medium text-base">
                  Stock available : {product.stock}
                </span>
              </div>
              {/* Highlights */}
              <h2 className="text-xl font-medium text-gray-700 mt-6">
                Key Features
              </h2>
              <ul className="mt-4 space-y-3 text-gray-600 text-base">
                {descriptionItems?.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-primary">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Add to Bag Button */}
              {user.isLoggedIn ? (
                <div className="mt-8 flex items-center space-x-4">
                  <button
                    className="bg-primary text-white text-base font-medium py-3 px-10 rounded-lg shadow-lg hover:bg-primary/90"
                    onClick={() => handelAddToCart()}
                  >
                    Add to Cart
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <CustomerReviews productData={product} />
      </div>
    </>
  );
};

export default ProductDetails;

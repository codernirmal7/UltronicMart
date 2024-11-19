import { AppDispatch, RootState } from "@/redux";
import { getUserCartAndPaymentHistory } from "@/redux/slices/authSlice";
import { addProductToCart } from "@/redux/slices/productSlice";
import React from "react";
import { FaStar } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

type Product2CardProps = {
  id: string;
  image: string;
  name: string;
  price: number;
  stock: number;
  rating: number;
};

const ProductCard2: React.FC<Product2CardProps> = ({
  id,
  image,
  name,
  price,
  rating,
  stock
}) => {

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth);

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
      console.log(error)
    }
  };
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
        <span className="py-3 font-medium text-base">stock available : {stock}</span>


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

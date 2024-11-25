import ErrorAlert from "@/components/alerts/ErrorAlert";
import SuccessAlert from "@/components/alerts/SuccessAlert";
import { backendURL } from "@/constant/backendUrl";
import { AppDispatch, RootState } from "@/redux";
import { getUserCartAndPaymentHistory } from "@/redux/slices/authSlice";
import { purchaseProduct } from "@/redux/slices/paymentSlice";
import {
  addProductToCart,
  decreaseQuantityOfProductFromCart,
  removeProductFromCart,
} from "@/redux/slices/productSlice";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth);
  const cart = useSelector(
    (state: RootState) =>
      state.auth.userCartAndPaymentHistory?.message?.cart || []
  );
  const products = useSelector((state: RootState) => state.product.productData);
  const dispatch = useDispatch<AppDispatch>();
  const [isShowSuccessAlert, setIsShowSuccessAlert] = useState({
    show: false,
    message: "",
  });
  const [isShowErrorAlert, setIsShowErrorAlert] = useState<{
    show: boolean;
    message: string | null;
  }>({
    show: false,
    message: "",
  });

  const [inputDetails , setInputDetails] = useState({
    email : user.userData?.message?.email,
    cardHolderName : "",
    cardNumber : "",
    cardExpireYDate : "",
    cardExpireMDate : "",
    cardCvv : "",
    address : "",
    postalCode : "",
  })

  // Validate cart as an array
  const cartItems = Array.isArray(cart)
    ? cart
        .map((cartItem: any) => {
          const product = products.find(
            (product) => product._id === cartItem.productId
          );
          return product
            ? { ...product, quantity: cartItem.quantity || 1 } // Default quantity to 1 if not available
            : null;
        })
        .filter(Boolean) // Remove null values if product is not found
    : [];

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total: number, item: any) =>
      total + (item?.price || 0) * (item?.quantity || 1),
    0
  );

  useEffect(() => {
    if (localStorage.getItem("checkoutRedirect") !== "true" || cartItems.length === 0) {
      navigate("/", { replace: true });
    }
    localStorage.removeItem("checkoutRedirect");
  }, []);

  const handelIncreaseQuantity = async (id: string) => {
    try {
      await dispatch(
        addProductToCart({
          productId: id,
          quantity: 1,
          userId: user?.userData?.message?.id,
        })
      ).unwrap();

      //on Success
      dispatch(
        getUserCartAndPaymentHistory({ email: user?.userData?.message?.email })
      );
    } catch (error) {
      console.log(error);
      if (typeof error === "string") {
        setIsShowErrorAlert({
          show: true,
          message: error, // This will be the error string from rejectWithValue
        });
      } else if (error instanceof Error) {
        setIsShowErrorAlert({
          show: true,
          message: error.message,
        });
      } else {
        setIsShowErrorAlert({
          show: true,
          message: "An unexpected error occurred.",
        });
      }
    }
  };

  const handelDecreaseQuantity = async (id: string) => {
    try {
      await dispatch(
        decreaseQuantityOfProductFromCart({
          cartProductId: id,
          userId: user?.userData?.message?.id,
        })
      ).unwrap();

      //on Success
      dispatch(
        getUserCartAndPaymentHistory({ email: user?.userData?.message?.email })
      );
    } catch (error) {
      console.log(error);
      if (typeof error === "string") {
        setIsShowErrorAlert({
          show: true,
          message: error, // This will be the error string from rejectWithValue
        });
      } else if (error instanceof Error) {
        setIsShowErrorAlert({
          show: true,
          message: error.message,
        });
      } else {
        setIsShowErrorAlert({
          show: true,
          message: "An unexpected error occurred.",
        });
      }
    }
  };

  const handelRemoveProduct = async (product: any) => {
    try {
      await dispatch(
        removeProductFromCart({
          productId: product._id,
          userId: user?.userData?.message?.id,
        })
      ).unwrap();

      //on Success
      dispatch(
        getUserCartAndPaymentHistory({ email: user?.userData?.message?.email })
      );
      setIsShowSuccessAlert({
        show: true,
        message: "product removed.",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlaceOrder = async()=>{

    try {
      await dispatch(
        purchaseProduct(inputDetails)
      ).unwrap();

      // On success, show success message
      setIsShowSuccessAlert({
        show: true,
        message: "Product purchased successful.",
      });

      setTimeout(()=>{
         window.location.href  = "/"
      },2000)

    } catch (error: unknown) {
      // Handle error in case of failure
      if (typeof error === "string") {
        setIsShowErrorAlert({
          show: true,
          message: error, // This will be the error string from rejectWithValue
        });
      } else if (error instanceof Error) {
        setIsShowErrorAlert({
          show: true,
          message: error.message,
        });
      } else {
        setIsShowErrorAlert({
          show: true,
          message: "An unexpected error occurred.",
        });
      }
    }
  }
  return (
    <div>
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <div className="flex gap-3 items-center">
          <FaArrowLeft
            onClick={() => (window.location.href = "/")}
            className="cursor-pointer"
            size={25}
          />
          <span className="font-bold">back</span>
        </div>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base ">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <span className="font-semibold text-gray-900">Shop</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>

              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a className="flex h-6 w-6 items-center cursor-pointer justify-center rounded-full bg-gray-400 text-xs font-semibold text-white">
                  3
                </a>
                <span className="font-semibold text-gray-500">Payment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 max-w-screen-2xl w-full mx-auto">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6">
            {cartItems.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {cartItems.map((product: any, i: number) => (
                  <li key={i} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={`${backendURL}/productImages${
                          product?.images[0].split("productImages")[1]
                        }`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div className="flex justify-between text-gray-900">
                        <h3>{product?.name}</h3>
                        <p className="ml-4">${product?.price}</p>
                      </div>
                      <div className="mt-2 flex justify-between">
                        <p className="text-gray-500">
                          Qty: {product?.quantity}
                        </p>
                        <FaCircleMinus
                          size={25}
                          className="fill-primary cursor-pointer"
                          onClick={() => handelDecreaseQuantity(product?._id)}
                        />
                        <FaCirclePlus
                          size={25}
                          className="fill-primary cursor-pointer"
                          onClick={() => handelIncreaseQuantity(product?._id)}
                        />
                        <button
                          className="text-primary hover:text-red-500 select-none"
                          onClick={() => handelRemoveProduct(product)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-primary mt-5">Your cart is empty.</p>
            )}
          </div>

          <p className="mt-8 text-lg font-medium">Shipping Methods</p>
          <form className="mt-5 grid gap-6">
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                checked
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_1"
              >
                <img
                  className="w-14 object-contain"
                  src="/images/naorrAeygcJzX0SyNI4Y0.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Fedex Delivery</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
          </form>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <div className="">
            <label
              htmlFor="email"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="text"
                id="email"
                name="email"
                value={user.userData?.message?.email}
                disabled={true}
                required
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="your.email@gmail.com"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
            </div>
            <label
              htmlFor="card-holder"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Card Holder
            </label>
            <div className="relative">
              <input
                type="text"
                id="card-holder"
                name="card-holder"
                minLength={3}
                maxLength={20}
                value={inputDetails.cardHolderName}
                onChange={(e)=> setInputDetails((prev)=>{
                   return {...prev , cardHolderName : e.target.value}
                })}
                required
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your full name here"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                  />
                </svg>
              </div>
            </div>
            <label
              htmlFor="card-no"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Card Details
            </label>
            <div className="flex gap-2">
              <div className="relative w-7/12 flex-shrink-0">
                <input
                  type="text"
                  id="card-no"
                  name="card-no"
                  minLength={16}
                  maxLength={16}
                  value={inputDetails.cardNumber}
                  onChange={(e)=> setInputDetails((prev)=>{
                     return {...prev , cardNumber : e.target.value}
                  })}
                  required
                  className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="xxxx-xxxx-xxxx-xxxx"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                    <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                  </svg>
                </div>
              </div>
              <input
                type="text"
                name="credit-expiry"
                minLength={5}
                maxLength={5}
                required
                onChange={(e)=> setInputDetails((prev)=>{
                   return {...prev ,  cardExpireMDate : e.target.value.split("/")[0] , cardExpireYDate : e.target.value.split("/")[1]}
                })}
                className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="MM/YY"
              />
              <input
                type="text"
                name="credit-cvc"
                minLength={3}
                maxLength={3}
                required
                value={inputDetails.cardCvv}
                onChange={(e)=> setInputDetails((prev)=>{
                   return {...prev , cardCvv : e.target.value}
                })}
                className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="CVC"
              />
            </div>
            <label
              htmlFor="billing-address"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Billing Address
            </label>
            <div className="flex gap-2 flex-col sm:flex-row">
              <div className="relative flex-shrink-0 sm:w-7/12">
                <input
                  type="text"
                  id="billing-address"
                  name="billing-address"
                  required
                  value={inputDetails.address}
                  onChange={(e)=> setInputDetails((prev)=>{
                     return {...prev , address : e.target.value}
                  })}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Street Address"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <img
                    className="h-4 w-4 object-contain"
                    src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg"
                    alt=""
                  />
                </div>
              </div>
             
              <input
                type="text"
                name="billing-zip"
                className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="ZIP"
                value={inputDetails.postalCode}
                onChange={(e)=> setInputDetails((prev)=>{
                   return {...prev , postalCode : e.target.value}
                })}
                required
              />
            </div>

            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">${subtotal}</p>
            </div>
          </div>
          <button type="submit" className="mt-4 mb-8 w-full rounded-md bg-primary/80 hover:bg-primary transition-all px-6 py-3 font-medium text-white" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>
      {/* Success and Error Alerts */}
      <SuccessAlert
        isShowSuccessAlert={isShowSuccessAlert}
        setIsShowSuccessAlert={setIsShowSuccessAlert}
      />
      <ErrorAlert
        isShowErrorAlert={isShowErrorAlert}
        setIsShowErrorAlert={setIsShowErrorAlert}
      />
    </div>
  );
}

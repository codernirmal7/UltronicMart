import { AppDispatch, RootState } from "@/redux";
import { getUserCartAndPaymentHistory, getUserData } from "@/redux/slices/authSlice";
import { getAllProductsData } from "@/redux/slices/productSlice";
import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Footer from "@/components/Footer/Footer";
import { backendURL } from "@/constant/backendUrl";

export default function PaymentHistory() {
  const orderProducts = useSelector(
    (state: RootState) => state.auth.userCartAndPaymentHistory?.message?.purchaseHistory || []
  );
  const products = useSelector((state: RootState) => state.product.productData);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data first
        const userData = await dispatch(getUserData("user-data")).unwrap();
        const userEmail = userData.message?.email;

        // Once user data is ready, fetch cart and payment history
        if (userEmail) {
          await dispatch(getUserCartAndPaymentHistory({ email: userEmail }));
        }

        // Fetch product data
        dispatch(getAllProductsData());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  // Map order products with their details
  const orderItems = orderProducts
    .map((orderItem: any) => {
      const product = products.find(
        (product) => product._id === orderItem.productId[0]
      );
      return { ...product, quantity: orderItem.quantity };
    })
    .filter(Boolean);

  // Calculate total items, quantity, and price
  const totalItems = orderItems.length;
  const totalQuantity = orderItems.reduce((acc : any, item : any) => acc + item.quantity, 0);
  const totalPrice = orderItems.reduce((acc : any, item : any) => acc + item.price * item.quantity, 0);

  return (
   
    <>
     <motion.div
      className="py-16 px-6 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-10">
        <FaArrowLeft
          onClick={() => (window.location.href = "/")}
          className="cursor-pointer text-indigo-600 hover:text-indigo-800 transition-all duration-300"
          size={24}
        />
        <span className="text-lg font-medium text-gray-800">Back to Homepage</span>
      </div>

      <motion.h2
        className="text-4xl font-bold text-center text-gray-800 mb-12 tracking-tight"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Your Payment History
      </motion.h2>

      {/* Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Total Products */}
        <motion.div
          className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold">Total Products</h3>
          <p className="text-3xl font-bold">{totalItems}</p>
        </motion.div>

        {/* Total Quantity */}
        <motion.div
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold">Total Quantity</h3>
          <p className="text-3xl font-bold">{totalQuantity}</p>
        </motion.div>

        {/* Total Price */}
        <motion.div
          className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold">Total Spent</h3>
          <p className="text-3xl font-bold">${totalPrice.toFixed(2)}</p>
        </motion.div>
      </div>

      {/* Detailed Order History */}
      <motion.div
        className="mt-12 space-y-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {orderItems.length > 0 ? (
          orderItems.map((item :any, index :any) => (
            <motion.div
              key={index}
              className="flex flex-col md:flex-row items-center justify-between bg-white rounded-lg shadow-input p-6 space-y-6 md:space-y-0 md:space-x-8 hover:bg-secondary/10 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Product Image */}
              <motion.div
                className="w-32 h-32 rounded-md overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  className="w-full h-full object-cover"
                  src={
                    item?.images?.[0]
                      ? `${backendURL}/productImages${item.images[0].split("productImages")[1]}`
                      : ""
                  }
                  alt={item.name}
                />
              </motion.div>

              {/* Product Info */}
              <div className="flex flex-col w-full space-y-4">
                <h4 className="text-xl font-medium text-gray-800">{item.name}</h4>
                <p className="text-lg text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-lg text-primary font-semibold">
                  Total: ${item.price * item.quantity}
                </p>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center text-gray-500">No purchase history found.</div>
        )}
      </motion.div>

      {/* Footer */}
    </motion.div>
     <Footer/>
    
    </>
  );
}

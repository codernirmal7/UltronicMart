import { RootState } from '@/redux';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { FaXmark } from 'react-icons/fa6';
import { useSelector } from 'react-redux';

type CartProps = {
  cartOpen: boolean;
  setCartOpen: (isOpen: boolean) => void;
};

const Cart: React.FC<CartProps> = ({ cartOpen, setCartOpen }) => {
  const cart = useSelector((state: RootState) => state.auth.userData?.message?.cart || []);
  const products = useSelector((state: RootState) => state.product.productData);

  // Find product details based on cart items
  const cartItems = cart.map((cartItem: any) => {
     return products.find((product) => product._id === cartItem.productId);
  })

  // Calculate subtotal
  const subtotal = cartItems.reduce((total: number, item: any) => total + (item?.price || 0) * (item?.quantity || 1), 0);

  return (
    <Transition.Root show={cartOpen} as={Fragment}>
      <Dialog className="relative z-50" onClose={setCartOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full md:max-w-md">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-white shadow-xl">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-4 sm:px-6">
                      <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500"
                        onClick={() => setCartOpen(false)}
                      >
                        <FaXmark className="h-6 w-6" />
                      </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto px-4 sm:px-6">
                      {cartItems.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                          {cartItems.map((product: any) => (
                            <li key={product?.productId} className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={`http://localhost:4000/productImages${
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
                                <p className="text-gray-500">{product?.color}</p>
                                <div className="mt-2 flex justify-between">
                                  <p className="text-gray-500">Qty: {product?.quantity}</p>
                                  <button
                                    className="text-primary hover:text-red-500"
                                    onClick={() => {
                                      /* Add remove logic */
                                    }}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-center text-gray-500">Your cart is empty.</p>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="border-t px-4 py-4 sm:px-6">
                      <div className="flex justify-between text-gray-900">
                        <p>Subtotal</p>
                        <p>${subtotal.toFixed(2)}</p>
                      </div>
                      <button
                        className="mt-6 w-full rounded-full bg-primary px-6 py-3 text-white hover:bg-dark-primary"
                        
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Cart;

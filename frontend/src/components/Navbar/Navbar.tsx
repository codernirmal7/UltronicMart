import { Dialog, Popover, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import {
  FaBars,
  FaCartArrowDown,
  FaMagnifyingGlass,
  FaRegCircleUser,
  FaXmark,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import UserInfo from "../User/UserInfoSmallModel";
import brandName from "@/constant/BrandName";
import SearchSmallModel from "../Search/SearchSmallModel";
import { FaShoppingCart } from "react-icons/fa";

const navigation = {
  pages: [
    { name: "Home", href: "/" },
    { name: "Laptops", href: "/laptops" },
    { name: "Television", href: "/television" },
    { name: "Phones", href: "/phones" },
  ],
};

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
];

export default function Navbar() {
  const [navbarOpen, setnavbarOpen] = useState(false);
  const [cartOpen, setcartOpen] = useState(false);

  const [isUserInfoVisible, setIsUserInfoVisible] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handelUserInfoVisible = () => {
    setIsUserInfoVisible((prev) => !prev);
  };
  const handelSearchOpen = () => {
    setIsSearchOpen((prev) => !prev);
  };


  return (
    <>
      <div className="">
        {/* Mobile menu */}
        <Transition.Root show={navbarOpen} as={Fragment}>
          <Dialog className="relative z-40 lg:hidden" onClose={setnavbarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                  <div className="flex px-4 pb-2 pt-5">
                    <button
                      type="button"
                      className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                      onClick={() => setnavbarOpen(false)}
                    >
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Close menu</span>
                      <FaXmark className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                    {navigation.pages.map((page) => (
                      <div key={page.name} className="flow-root">
                        <Link
                          to={page.href}
                          className="-m-2 block p-2 font-medium text-gray-500 hover:text-primary"
                        >
                          {page.name}
                        </Link>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6">
                    <a href="#" className="-m-2 flex items-center p-2">
                      <img
                        src="https://cdn.britannica.com/33/4833-004-828A9A84/Flag-United-States-of-America.jpg"
                        alt=""
                        className="block h-auto w-5 flex-shrink-0"
                      />
                      <span className="ml-3 block  font-medium text-gray-900">
                        USA
                      </span>
                    </a>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <header className="relative border-b border-gray-200">
        <p className="flex h-10 items-center justify-center bg-primary px-4  font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>
          <nav aria-label="Top" className="mx-auto max-w-[1300px] px-3">
            <div>
              <div className="flex h-16 items-center">
                <button
                  type="button"
                  className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                  onClick={() => setnavbarOpen(true)}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open menu</span>
                  <FaBars className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Logo */}
                <div className=" flex lg:ml-0">
                  <Link to="/">
                    <span className="text-xl md:text-2xl font-extrabold text-primary">
                      {brandName}
                    </span>
                  </Link>
                </div>

                {/* Flyout menus */}
                <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                  <div className="flex h-full space-x-8">
                    {navigation.pages.map((page) => (
                      <Link
                        key={page.name}
                        to={page.href}
                        className="flex items-center font-medium text-gray-500 hover:text-primary"
                      >
                        {page.name}
                      </Link>
                    ))}
                  </div>
                </Popover.Group>

                <div className="ml-auto flex items-center gap-2">
                  <div className="hidden lg:ml-8 lg:flex">
                    <a
                      href="#"
                      className="flex items-center text-gray-700 hover:text-gray-800"
                    >
                      <img
                        src="https://cdn.britannica.com/33/4833-004-828A9A84/Flag-United-States-of-America.jpg"
                        alt=""
                        className="block h-auto w-5 flex-shrink-0"
                      />
                      <span className="ml-3 block  font-medium">USA</span>
                    </a>
                  </div>
                  <div className="w-[1px] h-[1.5rem] bg-slate-300 hidden lg:flex"></div>

                  {/* Search */}
  <div className="dropdown dropdown-end lg:ml-6 relative z-10">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <FaMagnifyingGlass
                      className="h-6 w-6 fill-primary "
                      aria-hidden="true"
                      onClick={handelSearchOpen}
                    />
                  </div>

                  <SearchSmallModel isSearchOpen={isSearchOpen}/>
                
                </div>

                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="p-1"
                      onClick={() => setcartOpen(true)}
                    >
                      <div className="indicator relative w-[3.6rem] h-14 flex items-center ">
                        <span className="bg-accent absolute text-white mt-[6px] right-0 top-0 h-6 w-6 text-center rounded-full">
                          2
                        </span>
                        <div className="flex">
                          <a
                            className="p-2 text-gray-400 hover:text-gray-500 btn btn-ghost btn-circle"
                          >
                            <FaShoppingCart
                              className="h-6 w-6 fill-primary"
                              aria-hidden="true"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div onClick={handelUserInfoVisible}>
                    <FaRegCircleUser
                      size={32}
                      className=" cursor-pointer fill-primary"
                    />
                    <UserInfo isVisible={isUserInfoVisible} />
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <Transition.Root show={cartOpen} as={Fragment}>
          <Dialog className="relative z-10" onClose={setcartOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/50 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full ">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-full md:max-w-md">
                      <div className="w-full flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                          <div className="flex items-start justify-between">
                            <Dialog.Title className="text-lg font-medium text-gray-900">
                              Shopping cart
                            </Dialog.Title>
                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                onClick={() => setcartOpen(false)}
                              >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Close panel</span>
                                <FaXmark
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>

                          <div className="mt-8">
                            <div className="flow-root">
                              <ul
                                role="list"
                                className="-my-6 divide-y divide-gray-200"
                              >
                                {products.map((product) => (
                                  <li key={product.id} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <img
                                        src={product.imageSrc}
                                        alt={product.imageAlt}
                                        className="h-full w-full object-cover object-center"
                                      />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div className="flex justify-between  font-medium text-gray-900">
                                          <h3>
                                            <a href={product.href}>
                                              {product.name}
                                            </a>
                                          </h3>
                                          <p className="ml-4">
                                            {product.price}
                                          </p>
                                        </div>
                                        <p className="mt-1  text-gray-500">
                                          {product.color}
                                        </p>
                                      </div>
                                      <div className="flex flex-1 items-end justify-between ">
                                        <p className="text-gray-500">
                                          Qty {product.quantity}
                                        </p>

                                        <div className="flex">
                                          <button
                                            type="button"
                                            className="font-medium text-main hover:text-Darkmain"
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                          <div className="flex justify-between  font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>$262.00</p>
                          </div>
                          <p className="mt-0.5  text-white">
                            Shipping and taxes calculated at checkout.
                          </p>
                          <div className="mt-6">
                            <a
                              href="#"
                              className="flex bg-primary/75 hover:bg-primary transition-all items-center justify-center rounded-full border border-transparent bg-main px-6 py-3  font-medium text-white shadow-sm hover:bg-Darkmain"
                            >
                              Checkout
                            </a>
                          </div>
                        
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </>
  );
}

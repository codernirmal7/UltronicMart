import { Dialog, Popover, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import {
  FaBars,
  FaMagnifyingGlass,
  FaRegCircleUser,
  FaXmark,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import UserInfo from "../User/UserInfoSmallModel";
import brandName from "@/constant/BrandName";
import SearchSmallModel from "../Search/SearchSmallModel";
import { FaShoppingCart } from "react-icons/fa";
import Cart from "../Cart/Cart";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";

const navigation = {
  pages: [
    { name: "Home", href: "/" },
    { name: "Laptops", href: "/laptops" },
    { name: "Television", href: "/television" },
    { name: "Phones", href: "/phones" },
  ],
};


export default function Navbar() {
  const [navbarOpen, setnavbarOpen] = useState(false);
  const [cartOpen, setcartOpen] = useState(false);
  const cart = useSelector((state: RootState) => state.auth.userCartAndPaymentHistory?.message?.cart || []);



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

        <header className="fixed bg-white left-0 right-0 top-0 z-40  border-b border-gray-200 ">
        <p className="flex h-10 items-center justify-center bg-primary px-4  font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>
          <nav aria-label="Top" className="mx-auto max-w-[1300px] px-3 ">
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

                 
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="p-1"
                      onClick={() => setcartOpen(true)}
                    >
                      <div className="indicator relative w-[3.6rem] h-14 flex items-center ">
                        <span className="bg-accent absolute text-white mt-[6px] right-0 top-0 h-6 w-6 text-center rounded-full">
                          {cart.length}
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
       <Cart cartOpen={cartOpen} setCartOpen={setcartOpen}/>
      </div>
    </>
  );
}

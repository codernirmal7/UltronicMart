import Herosection from "@/components/HeroSection/Herosection";
import Navbar from "@/components/Navbar/Navbar";
import {  FaHeadphones, FaTruckFast } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { FaShieldAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux";
import { useEffect } from "react";
import { getAllProductsData } from "@/redux/slices/productSlice";
import { useSelector } from "react-redux";
import LaptopSlider from "@/components/ProductSlider/LaptopSlider";


const slides = [
  {
    id: 1,
    title: "MacBook Air",
    description:
      "The MacBook Air is a lightweight and sleek laptop developed by Apple Inc., renowned for its portability and efficiency. It features a high-resolution Retina display, a slim aluminum body, and long battery life.",
    image: "/herosectionslide1.png",
  },
  {
    id: 2,
    title: "Iphone",
    description:
      "The iPhone is a line of smartphones designed and marketed by Apple Inc. Known for their sleek design, advanced technology, and user-friendly interface, iPhones run on Apple's iOS operating system.",
    image: "/herosectionslide2.png",
  },
  {
    id: 3,
    title: "Television",
    description:
      "Television can be a great educational tool that helps people learn about different cultures, promotes tolerance, and helps people understand international issues.",
    image: "/herosectionslide3.png",
  },
];

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector((state: RootState) => state.product);
  //Extrate all properties from product
  const { loading, productData, error } = product;

  useEffect(() => {
    dispatch(getAllProductsData());
  }, []);

  return (
    <>
      <Navbar />
      <section id="home" className="hero-slider flex justify-center">
        <div className="w-full max-w-screen-xl py-7 px-3 ">
          <div className="bg-primary rounded-xl ">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={50}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 3000 }}
              pagination={{ clickable: true }}
            >
              {slides.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <Herosection
                    image={slide.image}
                    title={slide.title}
                    description={slide.description}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="w-full py-8 grid grid-cols-2 lg:grid-cols-3 xl:gap-16 xl:grid-cols-4 items-center gap-7">
            <div className="flex items-center max-[1024px]:justify-center gap-4">
              <FaHeadphones size={30} className="fill-primary" />
              <div>
                <span className="font-medium text-lg text-primary">
                  Responsive
                </span>
                <p className="text-gray-500">Customer service available 24/7</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FaShieldAlt size={30} className="fill-primary" />
              <div>
                <span className="font-medium text-lg text-primary">Secure</span>
                <p className="text-gray-500">Data full secure guarantee</p>
              </div>
            </div>

            <div className="flex items-center max-[1024px]:justify-center gap-4">
              <FaTruckFast size={30} className="fill-primary" />
              <div>
                <span className="font-medium text-lg text-primary">
                  Shipping
                </span>
                <p className="text-gray-500">Customer service available 24/7</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <svg
                className="fill-primary"
                height="30px"
                width="30px"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 492.153 492.153"
                xmlSpace="preserve"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g>
                    {" "}
                    <path d="M426.638,87.91c-42.247-42.247-98.418-65.514-158.166-65.514c-5.799,0-10.5,4.701-10.5,10.5v56.531 c0,5.799,4.701,10.5,10.5,10.5c80.587,0,146.148,65.561,146.148,146.147c0,80.587-65.561,146.148-146.148,146.148 c-73.915,0-135.549-54.985-144.913-127.088h36.91c0.008,0,0.013,0.001,0.02,0c5.799,0,10.5-4.701,10.5-10.5 c0-2.887-1.165-5.502-3.051-7.4l-75.345-84.401c-1.993-2.232-4.842-3.508-7.833-3.508c-0.017,0-0.034,0-0.05,0 c-3.009,0.015-5.867,1.319-7.85,3.583L2.6,247.719c-2.714,3.101-3.365,7.502-1.663,11.254c1.702,3.753,5.442,6.163,9.563,6.163 h35.11c4.553,54.02,28.36,104.134,67.69,142.033c41.883,40.359,96.99,62.587,155.171,62.587 c59.748,0,115.919-23.267,158.166-65.515c42.248-42.248,65.515-98.419,65.515-158.166 C492.153,186.328,468.886,130.157,426.638,87.91z M268.472,448.756c-109.242,0-198.191-85.45-202.501-194.535 c-0.223-5.633-4.854-10.085-10.492-10.085H33.65l51.186-58.457l52.185,58.457H112.06c-2.883,0-5.639,1.186-7.621,3.278 c-1.983,2.092-3.018,4.908-2.863,7.786c4.774,88.611,78.084,158.023,166.897,158.023c92.166,0,167.148-74.982,167.148-167.148 c0-88.639-69.355-161.384-156.648-166.821V43.665c106.9,5.479,192.181,94.173,192.181,202.41 C471.153,357.834,380.231,448.756,268.472,448.756z"></path>{" "}
                    <path d="M255.41,255.643v79.405h-25.332c-5.799,0-10.5,4.701-10.5,10.5s4.701,10.5,10.5,10.5h25.332v13.028 c0,5.799,4.701,10.5,10.5,10.5c5.799,0,10.5-4.701,10.5-10.5v-13.964c28.222-4.984,49.733-29.669,49.733-59.3 c0-29.63-21.512-54.314-49.733-59.299v-79.407l22.119-0.001c5.799,0,10.5-4.701,10.5-10.5c0-5.799-4.701-10.5-10.5-10.5 l-22.119,0.001v-13.03c0-5.799-4.701-10.5-10.5-10.5c-5.799,0-10.5,4.701-10.5,10.5v13.965c-28.224,4.985-49.736,29.67-49.736,59.3 C205.674,225.973,227.186,250.658,255.41,255.643z M305.143,295.813c0,17.998-12.184,33.193-28.733,37.797v-75.593 C292.959,262.62,305.143,277.816,305.143,295.813z M255.41,158.545v75.595c-16.551-4.604-28.736-19.8-28.736-37.799 C226.674,178.344,238.859,163.149,255.41,158.545z"></path>{" "}
                  </g>{" "}
                </g>
              </svg>
              <div>
                <span className="font-medium text-lg text-primary">Refund</span>
                <p className="text-gray-500">
                  Money back guarantee within 7 days
                </p>
              </div>
            </div>
          </div>
          {/* Product laptop preview */}
          <LaptopSlider error={error} loading={loading} productData={productData}/>
          
        </div>
      </section>
    </>
  );
}

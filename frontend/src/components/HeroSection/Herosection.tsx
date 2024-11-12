import React from "react";

type HeroSectionProps = {
  image: string;
  title: string;
  description: string;
};

const Herosection: React.FC<HeroSectionProps> = ({
  image,
  title,
  description,
}) => {
  return (
    <div
      className="w-full flex items-center p-4 justify-start  relative px-7 lg:px-12 py-10 herosectionbg rounded-2xl"
      style={{ backgroundImage: `url("${image}")` }}
    >
      <div className="flex flex-col gap-4 md:gap-4 relative z-10">
        <h1 className="text-3xl sm:text-4xl text-white max-w-xs font-bold">
          {title}
        </h1>
        <p className="max-w-md text-white hidden sm:block">{description}</p>
        <button className="flex bg-white select-none hover:shadow text-main w-32 items-center justify-center h-10 rounded-full p-1 transition-all hover:bg-gray-200">
          Shop now
        </button>
      </div>
    </div>
  );
};

export default Herosection;

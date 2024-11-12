import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

type SearchSmallModel = {
    isSearchOpen : boolean,

}

const SearchSmallModel : React.FC<SearchSmallModel> = ({isSearchOpen})=> {
  
  return (
    <div
      tabIndex={0}
      className={` fixed z-50 menu menu-sm dropdown-content mt-3 right-9 top-24 shadow bg-container-color  rounded-md p-3 max-w-md ${
         isSearchOpen ? "block" : "hidden"
      }`}

    >
      <div className="pt-2 relative mx-auto text-gray-600">
        <input
          className="border-2 border-gray-300 bg-white h-10 px-2 pr-16 rounded-lg  focus:outline-none"
          type="search"
          name="search"
          placeholder="Search products"
        />
        <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
          <FaMagnifyingGlass
            className="h-5 w-5 text-gray-400 hover:text-gray-500"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
}

export default SearchSmallModel
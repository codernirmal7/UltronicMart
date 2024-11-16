import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaXmark } from "react-icons/fa6";

const PhonesProductFilter = ({
  onFilterChange,
  navbarOpen,
  setnavbarOpen,
}: {
  onFilterChange: (filters: any) => void;
  setnavbarOpen: (value: boolean) => void;
  navbarOpen: boolean;
}) => {
  const defaultFilters = {
    brand: "",
    priceRange: [0, 2000],
    processor: "",
    ram: "",
    storage: "",
    screenSize: "",
  };

  const [filters, setFilters] = useState(defaultFilters);

  const handleInputChange = (key: string, value: any) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters); // Pass filters to parent component
  };

  const handleClearFilters = () => {
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };
  return (
    <div>
      {/* Mobile menu */}
      <Transition.Root show={navbarOpen} as={Fragment}>
        <Dialog
          className="relative z-40 min-[1085px]:hidden"
          onClose={setnavbarOpen}
        >
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
                  {/* Brand Filter */}
                  <div>
                    <label className="font-semibold">Brand</label>
                    <select
                      className="w-full border rounded p-2"
                      value={filters.brand}
                      onChange={(e) =>
                        handleInputChange("brand", e.target.value)
                      }
                    >
                      <option value="">All Brands</option>
                      <option value="apple">Apple</option>
                      <option value="samsung">Samsung</option>
                      <option value="xiaomi">Xiaomi</option>
                      <option value="asus">Asus</option>
                    </select>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <label className="font-semibold">Price Range</label>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={filters.priceRange[1]}
                      onChange={(e) =>
                        handleInputChange("priceRange", [
                          filters.priceRange[0],
                          Number(e.target.value),
                        ])
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm">
                      <span>${filters.priceRange[0]}</span>
                      <span>${filters.priceRange[1]}</span>
                    </div>
                  </div>

                  {/* Processor Filter */}
                  <div>
                    <label className="font-semibold">Processor</label>
                    <select
                      className="w-full border rounded p-2"
                      value={filters.processor}
                      onChange={(e) =>
                        handleInputChange("processor", e.target.value)
                      }
                    >
                      <option value="">All Processors</option>
                      <option value="apple">A-series</option>
                      <option value="snapdragon">Snapdragon series</option>
                    </select>
                  </div>

                  {/* RAM Filter */}
                  <div>
                    <label className="font-semibold">RAM</label>
                    <select
                      className="w-full border rounded p-2"
                      value={filters.ram}
                      onChange={(e) => handleInputChange("ram", e.target.value)}
                    >
                      <option value="">All RAM Sizes</option>
                      <option value="8gb">8GB</option>
                      <option value="12gb">12GB</option>
                      <option value="16gb">16GB</option>
                    </select>
                  </div>

                  {/* Storage Filter */}
                  <div>
                    <label className="font-semibold">Storage</label>
                    <select
                      className="w-full border rounded p-2"
                      value={filters.storage}
                      onChange={(e) =>
                        handleInputChange("storage", e.target.value)
                      }
                    >
                      <option value="">All Storage</option>
                      <option value="128gb">128GB SSD</option>
                      <option value="256gb">256GB SSD</option>
                      <option value="512gb">512GB</option>
                      <option value="1tb">1TB</option>
                    </select>
                  </div>

                  {/* Screen Size Filter */}
                  <div>
                    <label className="font-semibold">Screen Size</label>
                    <select
                      className="w-full border rounded p-2"
                      value={filters.screenSize}
                      onChange={(e) =>
                        handleInputChange("screenSize", e.target.value)
                      }
                    >
                      <option value="">All Sizes</option>
                      <option value="6">6"</option>
                      <option value="7">7"</option>
                    </select>
                  </div>

                  {/* clear all Filters */}
                  <button
                    className="mt-auto bg-primary/75 text-white rounded p-2 hover:bg-primary"
                    onClick={handleClearFilters}
                  >
                    Clear All Filters
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="w-full max-w-xs fixed bg-slate-100 min-h-[40rem] py-6 p-3 hidden min-[1085px]:flex flex-col gap-4">
        {/* Brand Filter */}
        <div>
          <label className="font-semibold">Brand</label>
          <select
            className="w-full border rounded p-2"
            value={filters.brand}
            onChange={(e) => handleInputChange("brand", e.target.value)}
          >
            <option value="">All Brands</option>
            <option value="apple">Apple</option>
            <option value="samsung">Samsung</option>
            <option value="xiaomi">Xiaomi</option>
            <option value="asus">Asus</option>
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="font-semibold">Price Range</label>
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={filters.priceRange[1]}
            onChange={(e) =>
              handleInputChange("priceRange", [
                filters.priceRange[0],
                Number(e.target.value),
              ])
            }
            className="w-full"
          />
          <div className="flex justify-between text-sm">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>

        {/* Processor Filter */}
        <div>
          <label className="font-semibold">Processor</label>
          <select
            className="w-full border rounded p-2"
            value={filters.processor}
            onChange={(e) => handleInputChange("processor", e.target.value)}
          >
            <option value="">All Processors</option>
            <option value="apple">A-series</option>
            <option value="snapdragon">Snapdragon series</option>
          </select>
        </div>

        {/* RAM Filter */}
        <div>
          <label className="font-semibold">RAM</label>
          <select
            className="w-full border rounded p-2"
            value={filters.ram}
            onChange={(e) => handleInputChange("ram", e.target.value)}
          >
            <option value="">All RAM Sizes</option>
            <option value="8gb">8GB</option>
            <option value="12gb">12GB</option>
            <option value="16gb">16GB</option>
          </select>
        </div>

        {/* Storage Filter */}
        <div>
          <label className="font-semibold">Storage</label>
          <select
            className="w-full border rounded p-2"
            value={filters.storage}
            onChange={(e) => handleInputChange("storage", e.target.value)}
          >
            <option value="">All Storage</option>
            <option value="128gb">128GB SSD</option>
            <option value="256gb">256GB SSD</option>
            <option value="512gb">512GB</option>
            <option value="1tb">1TB</option>
          </select>
        </div>

        {/* Screen Size Filter */}
        <div>
          <label className="font-semibold">Screen Size</label>
          <select
            className="w-full border rounded p-2"
            value={filters.screenSize}
            onChange={(e) => handleInputChange("screenSize", e.target.value)}
          >
            <option value="">All Sizes</option>
            <option value="6">6"</option>
            <option value="7">7"</option>
          </select>
        </div>

        {/* clear all Filters */}
        <button
          className="mt-auto bg-primary/75 text-white rounded p-2 hover:bg-primary"
          onClick={handleClearFilters}
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default PhonesProductFilter;

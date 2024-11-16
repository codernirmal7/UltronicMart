import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaXmark } from "react-icons/fa6";

const TelevisionProductFilter = ({
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
    screenSize: "",
    resolution: "",
    panelType: "",
    priceRange: [0, 3000],
  };

  const [filters, setFilters] = useState(defaultFilters);

  const handleFilterChange = (key: string, value: any) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
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
          onChange={(e) => handleFilterChange("brand", e.target.value)}
        >
          <option value="">All Brands</option>
          <option value="samsung">Samsung</option>
          <option value="lg">LG</option>
          <option value="sony">Sony</option>
          <option value="tcl">TCL</option>
        </select>
      </div>

      {/* Screen Size Filter */}
      <div>
        <label className="font-semibold">Screen Size</label>
        <select
          className="w-full border rounded p-2"
          value={filters.screenSize}
          onChange={(e) => handleFilterChange("screenSize", e.target.value)}
        >
          <option value="">All Sizes</option>
          <option value="32 inches">32"</option>
          <option value="43 inches">43"</option>
          <option value="55 inches">55"</option>
          <option value="65 inches">65"</option>
          <option value="75 inches">75"</option>
        </select>
      </div>

      {/* Resolution Filter */}
      <div>
        <label className="font-semibold">Resolution</label>
        <select
          className="w-full border rounded p-2"
          value={filters.resolution}
          onChange={(e) => handleFilterChange("resolution", e.target.value)}
        >
          <option value="">All Resolutions</option>
          <option value="hd">HD</option>
          <option value="fullhd">Full HD</option>
          <option value="4k">4K</option>
          <option value="8k">8K</option>
        </select>
      </div>

      {/* Panel Type Filter */}
      <div>
        <label className="font-semibold">Panel Type</label>
        <select
          className="w-full border rounded p-2"
          value={filters.panelType}
          onChange={(e) => handleFilterChange("panelType", e.target.value)}
        >
          <option value="">All Panel Types</option>
          <option value="led">LED</option>
          <option value="oled">OLED</option>
          <option value="qled">QLED</option>
          <option value="plasma">Plasma</option>
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
            handleFilterChange("priceRange", [
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

      {/* Clear All Filters Button */}
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
          onChange={(e) => handleFilterChange("brand", e.target.value)}
        >
          <option value="">All Brands</option>
          <option value="samsung">Samsung</option>
          <option value="lg">LG</option>
          <option value="sony">Sony</option>
          <option value="tcl">TCL</option>
        </select>
      </div>

      {/* Screen Size Filter */}
      <div>
        <label className="font-semibold">Screen Size</label>
        <select
          className="w-full border rounded p-2"
          value={filters.screenSize}
          onChange={(e) => handleFilterChange("screenSize", e.target.value)}
        >
          <option value="">All Sizes</option>
          <option value="32 inches">32"</option>
          <option value="43 inches">43"</option>
          <option value="55 inches">55"</option>
          <option value="65 inches">65"</option>
          <option value="75 inches">75"</option>
        </select>
      </div>

      {/* Resolution Filter */}
      <div>
        <label className="font-semibold">Resolution</label>
        <select
          className="w-full border rounded p-2"
          value={filters.resolution}
          onChange={(e) => handleFilterChange("resolution", e.target.value)}
        >
          <option value="">All Resolutions</option>
          <option value="hd">HD</option>
          <option value="fullhd">Full HD</option>
          <option value="4k">4K</option>
          <option value="8k">8K</option>
        </select>
      </div>

      {/* Panel Type Filter */}
      <div>
        <label className="font-semibold">Panel Type</label>
        <select
          className="w-full border rounded p-2"
          value={filters.panelType}
          onChange={(e) => handleFilterChange("panelType", e.target.value)}
        >
          <option value="">All Panel Types</option>
          <option value="led">LED</option>
          <option value="oled">OLED</option>
          <option value="qled">QLED</option>
          <option value="plasma">Plasma</option>
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
            handleFilterChange("priceRange", [
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

      {/* Clear All Filters Button */}
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

export default TelevisionProductFilter;

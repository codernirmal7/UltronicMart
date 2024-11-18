import clsx from "clsx";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa6";
import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";

type FaqItemProps = {
    item : any;
    index : number;
    isBgColor? : boolean,
    questionColor? : string
}

const FaqItem : React.FC <FaqItemProps> = ({ item, index, isBgColor , questionColor }) => {
  const [activeId, setActiveId] = useState(null);

  const active = activeId === item.id;


  const onOpen = () => {
    if (active) {
      setActiveId(null);
    } else {
      setActiveId(item.id);
    }
  };
  return (
    <div
      className={`relative z-2 mb-2 ${isBgColor ? "mb-7" : ""} p-2 rounded-3xl transition-colors duration-500 ${
        active && `${isBgColor ? "g7" : ""}`
      }`}
    >
      {active && (
        <div className={`absolute top-0 left-5 rounded-md w-[8rem] ${isBgColor ? "bg-primary" : ""} h-1 transition-all`}></div>
      )}
      <div
        className={`group relative flex cursor-pointer items-center justify-between gap-10 ${isBgColor ? "px-5" : ""}`}
        onClick={onOpen}
      >
        <div className="flex-1">
          <div className="small-compact mb-1.5 text-p3 max-lg:hidden text-primary">
            {index < 10 ? "0" : ""}
            {index}
          </div>
          <div
            className={clsx(
              ` ${questionColor} transition-colors font-medium duration-500 max-md:flex text-primary lg:text-xl max-md:items-center",
              active && "text-p1`
            )}
          >
            {item.question}
          </div>
        </div>

        <div
          className={`relative flex size-12 items-center justify-center rounded-full border-2 border-gray-300 shadow-400 transition-all duration-500 group-hover:border-slate-300",
            ${active && "before:bg-slate-300 after:rotate-0 after:bg-slate-700"}`}
        >
          <div className="g4 size-11/12 rounded-full shadow-300 flex justify-center items-center">
             <FaCaretDown className="fill-primary"/>
          </div>
        </div>
      </div>

      <SlideDown>
        {activeId === item.id && (
          <div className={`py-3.5 text-gray-700 max-w-lg w-full ${isBgColor ? "px-5" : ""}`}>{item.answer}</div>
        )}
      </SlideDown>
    </div>
  );
};
export default FaqItem;
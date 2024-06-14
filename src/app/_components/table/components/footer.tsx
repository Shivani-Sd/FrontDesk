/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect } from "react";
import Image from "next/image";

import ChevronUp from "@assets/chevron-up.svg";
import ChevronDownMini from "@assets/chevron-down-mini.svg";
import ChevronLeft from "@assets/chevron-left.svg";
import ChevronRight from "@assets/chevron-right.svg";

interface FooterProps {
  totalData: number;
  offset: number;
  limit: number;
  setOffset: Dispatch<SetStateAction<number>>;
  setLimit: Dispatch<SetStateAction<number>>;
}

const Footer: React.FC<FooterProps> = ({
  totalData,
  offset,
  limit,
  setOffset,
  setLimit,
}) => {
  const totalPages = Math.ceil(totalData / limit);
  const pageNumber = Math.ceil((offset + limit - 1) / limit);
  const pageButtonOffset = pageNumber <= 3 ? 1 : pageNumber - 2;

  // Functions to handle limit
  const incrementLimit = () => {
    setLimit((prev) => prev + 1);
  };

  const decrementLimit = () => {
    setLimit((prev) => prev - 1);
  };

  // Functions to handle offset
  const incrementOffset = () => {
    if (pageNumber !== totalPages) setOffset((prev) => prev + limit);
  };

  const decrementOffset = () => {
    if (pageNumber > 1) setOffset((prev) => prev - limit);
  };

  const handleOffset = (offset: number) => {
    setOffset(() => limit * (offset - 1) + 1);
  };

  useEffect(() => {
    // Move to next or previous table data using keyboard input
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          decrementOffset();
          break;
        case "ArrowRight":
          event.preventDefault();
          incrementOffset();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [offset, limit]);

  return (
    <div
      className="w-full flex justify-between flex-wrap px-4 py-3"
      role="navigation"
      aria-label="Pagination"
    >
      <div className="flex items-center gap-0.5">
        <div className="text-sm text-gray_100 font-normal">Displaying</div>
        <div
          className="flex items-center gap-1.5 rounded-md px-3 py-1 bg-sky_blue"
          role="status"
        >
          <div
            className="text-sm text-smokey_black font-inter leading-6 font-normal"
            aria-live="polite"
          >
            {limit}
          </div>
          <div className="w-[16px] flex flex-col items-center">
            <Image
              src={ChevronUp}
              alt="Increase Limit"
              onClick={incrementLimit}
              role="button"
              aria-label="Increase Limit"
            />
            <Image
              src={ChevronDownMini}
              alt="Decrease Limit"
              onClick={decrementLimit}
              role="button"
              aria-label="Decrease Limit"
            />
          </div>
        </div>
        <div className="text-sm text-gray_100 font-medium">
          out of <span className="text-pitch_black">{totalData}</span>
        </div>
      </div>
      <div className="flex items-center gap-0.5 pr-[70px]">
        <div className="flex items-center gap-2 px-2 py-1 rounded-md">
          <Image
            src={ChevronLeft}
            alt="Previous Page"
            onClick={decrementOffset}
            role="button"
            aria-label="Previous Page"
          />
          <div className="text-xs text-smokey_black font-medium leading-5">
            Previous
          </div>
        </div>
        {Array.from({ length: 3 }, (_, index) => pageButtonOffset + index).map(
          (page) => (
            <div
              className={`flex items-center gap-2.5 h-[32px] rounded-md px-3 py-1 font-medium text-xs leading-5 ${
                page === pageNumber ? "border border-light_border" : ""
              }`}
              key={page}
              onClick={() => handleOffset(page)}
              role="button"
              aria-label={`Page ${page}`}
            >
              {page}
            </div>
          )
        )}
        <div className="flex items-center gap-2 px-2 py-1 rounded-md">
          <div className="text-xs text-smokey_black font-medium leading-5">
            Next
          </div>
          <Image
            src={ChevronRight}
            alt="Next Page"
            onClick={incrementOffset}
            role="button"
            aria-label="Next Page"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;

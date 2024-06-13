import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

import { ChevronDownMini, ChevronLeft, ChevronRight, ChevronUp } from "@assets";

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
  const totalPages = Math.ceil(totalData / limit)
  const pageNumber = Math.ceil((offset + limit - 1) / limit);
  const pageButtonOffset = pageNumber <= 3 ? 1 : pageNumber - 2;

  const incrementLimit = () => {
    setLimit((prev) => prev + 1);
  };

  const decrementLimit = () => {
    setLimit((prev) => prev - 1);
  };

  const incrementOffset = () => {
    if (pageNumber !== totalPages) setOffset((prev) => prev + limit);
  };

  const decrementOffset = () => {
    if (pageNumber > 1) setOffset((prev) => prev - limit);
  };

  const handleOffset = (offset: number) => {
    setOffset(offset);
  };

  return (
    <div className="w-full flex justify-between flex-wrap px-4 py-3">
      <div className="flex items-center gap-0.5">
        <div className="text-sm text-gray_100 font-normal">Displaying</div>
        <div className="flex items-center gap-1.5 rounded-md px-3 py-1 bg-sky_blue">
          <div className="text-sm text-smokey_black font-inter leading-6 font-normal">
            {limit}
          </div>
          <div className="w-[16px] flex flex-col items-center">
            <Image src={ChevronUp} alt="Chevron Up" onClick={incrementLimit} />
            <Image
              src={ChevronDownMini}
              alt="Chevron Down"
              onClick={decrementLimit}
            />
          </div>
        </div>
        <div className="text-sm text-gray_100 font-medium">
          out of <span className="text-pitch_black">{totalData}</span>
        </div>
      </div>
      <div className="flex items-center gap-0.5 pr-[70px]">
        <div
          className="flex items-center gap-2 px-2 py-1 rounded-md"
          onClick={decrementOffset}
        >
          <Image src={ChevronLeft} alt="Chevron Left" />
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
            >
              {page}
            </div>
          )
        )}
        <div
          className="flex items-center gap-2 px-2 py-1 rounded-md"
          onClick={incrementOffset}
        >
          <div className="text-xs text-smokey_black font-medium leading-5">
            Next
          </div>
          <Image src={ChevronRight} alt="Chevron Right" />
        </div>
      </div>
    </div>
  );
};

export default Footer;

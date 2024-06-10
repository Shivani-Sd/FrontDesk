import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

import { ChevronDownMini, ChevronLeft, ChevronRight, ChevronUp } from "@assets";

interface FooterProps {
  offset: number;
  limit: number;
  setOffset: Dispatch<SetStateAction<number>>;
  setLimit: Dispatch<SetStateAction<number>>;
}

const Footer: React.FC<FooterProps> = ({
  offset,
  limit,
  setOffset,
  setLimit,
}) => {
  const pageButtonOffset = Math.max(1, offset - 2);

  const incrementLimit = () => {
    setLimit((prev) => prev + 1);
  };

  const decrementLimit = () => {
    setLimit((prev) => prev - 1);
  };

  const incrementOffset = () => {
    setOffset((prev) => prev + 1);
  };

  const decrementOffset = () => {
    setOffset((prev) => prev - 1);
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
          out of <span className="text-pitch_black">50</span>
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
                offset === page ? "border border-light_border" : ""
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

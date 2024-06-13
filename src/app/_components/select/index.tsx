import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { Selection } from "@assets";

interface SelectProps {
  options: string[];
  label: string;
  value: string;
  handleSelect: (value: any) => void;
}

const getSelectItem = (
  value: string,
  selectedItem: string,
  handleSelect: (value: string) => void
) => {
  const selected = selectedItem === value;

  return (
    <div
      className="flex gap-2 px-2 py-1.5 rounded-md"
      onClick={() => handleSelect(value)}
      key={value}
    >
      <div className="w-full font-normal text-sm text-smokey_black">
        {value}
      </div>
      {selected && <Image src={Selection} alt="Select" />}
    </div>
  );
};

const Select: React.FC<SelectProps> = ({
  options,
  label,
  value,
  handleSelect,
}) => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState<boolean>(false);

  const handleSelectValue = (value: string) => {
    handleSelect(value);
    setOpen(false);
  };

  useEffect(() => {
    const handleOpenMenu = (e: MouseEvent) => {
      if (
        menuRef &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      )
        setOpen(false);
      else if (
        anchorRef &&
        anchorRef.current &&
        anchorRef.current.contains(e.target as Node)
      )
        setOpen(true);
    };

    document.addEventListener("mousedown", handleOpenMenu);

    return () => document.removeEventListener("mousedown", handleOpenMenu);
  }, []);

  return (
    <div className="flex flex-col gap-1 relative">
      <div className="pb-0.5 text-xs leading-5 font-medium text-smokey_black">
        {label}
      </div>
      <div
        className={`border-2 ${
          open ? "rounded-lg border-gray_100" : "border-transparent"
        }`}
        ref={anchorRef}
      >
        <div className="w-full h-[36px] flex justify-between gap-2 px-3 py-2 rounded-md border border-dark_grey_border shadow-shadow_minimal">
          <div className={`font-normal text-sm text-smokey_black`}>{value}</div>
          <div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.5 6L8.5 10L12.5 6"
                stroke="#334155"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      {open && (
        <div
          className="w-full absolute max-h-[232px] overflow-y-auto p-1 bg-white rounded-md border border-dark_grey_border shadow-shadow_dark top-[66px] z-10"
          ref={menuRef}
        >
          {options.map((option) =>
            getSelectItem(option, value, handleSelectValue)
          )}
        </div>
      )}
    </div>
  );
};

export default Select;

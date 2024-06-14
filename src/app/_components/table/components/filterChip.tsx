import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

import { RootState } from "@store";
import { Waitlist } from "@types";
import {
  setFilteredWaitlist,
  resetFilteredWaitlist,
} from "@features/waitlist/waitlistSlice";
import { resetFilters } from "@features/filter/filterSlice";
import Cancel from "@assets/cancel.svg";

interface FilterChipProps {
  filterValue: Waitlist;
}

const FilterChip: React.FC<FilterChipProps> = ({ filterValue }) => {
  const dispatch = useDispatch();

  const filteredWaitlist = useSelector(
    (root: RootState) => root.waitlistSlice.filteredWaitlist
  );

  const handleCancel = () => {
    const newFilteredWaitlist = filteredWaitlist.filter(
      (item) => item.id !== filterValue.id
    );

    if (newFilteredWaitlist.length)
      dispatch(setFilteredWaitlist(newFilteredWaitlist));
    else {
      dispatch(resetFilters());
      dispatch(resetFilteredWaitlist());
    }
  };

  return (
    <div className="min-w-fit flex gap-1 items-center rounded-md px-2 py-1 bg-sky_blue">
      <div className="font-inter text-sm font-medium text-center text-gray_100">
        {filterValue.payer}
      </div>
      <div
        className="px-1.5 py-[7px] bg-gray_300"
        onClick={handleCancel}
        aria-label="Cancel filter"
      >
        <Image src={Cancel} alt="Cancel" />
      </div>
    </div>
  );
};

export default FilterChip;

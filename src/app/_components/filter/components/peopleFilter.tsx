/* eslint-disable react-hooks/exhaustive-deps */
import { FilterValues, Filters } from "@types";
import {
  MutableRefObject,
  useRef,
} from "react";
import { useSelector } from "react-redux";
import _ from "lodash";

import { RootState } from "@store";
import Search from "@components/search";

interface PeopleFilterProps {
  currentFilters: MutableRefObject<FilterValues>;
}

const chips = (
  <div className="rounded-[4px] px-2 py-0.5 bg-sky_blue text-[10px] leading-4 font-medium text-center text-smokey_black">
    Payer
  </div>
);

const PeopleFilter: React.FC<PeopleFilterProps> = ({ currentFilters }) => {
  const currentFilteredPeople = currentFilters.current[Filters.People];

  const waitlist = useSelector(
    (root: RootState) => root.waitlistSlice.waitlist
  );

  const allPeople = useRef<{ id: number; value: string }[]>(
    waitlist.map((item) => ({ id: item.id, value: item.payer }))
  );

  // Update current filters with selected values
  const updateCurrentFilters = (
    selectedPeople: {
      id: number;
      value: string;
    }[]
  ) => {
    const currentFiltersCopy = _.cloneDeep(currentFilters.current);

    currentFiltersCopy[Filters.People] = selectedPeople;
    currentFilters.current = currentFiltersCopy;
  };

  return (
    <div className="w-full max-h-[344px] flex flex-col gap-5 p-4 overflow-x-hidden overflow-y-auto">
      <Search
        placeholder="Search payer or attendee name"
        allItems={allPeople}
        currentFilteredItems={currentFilteredPeople}
        chips={chips}
        handleSelectItems={updateCurrentFilters}
      />
    </div>
  );
};

export default PeopleFilter;

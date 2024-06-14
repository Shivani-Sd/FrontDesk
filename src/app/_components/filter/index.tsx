/* eslint-disable react-hooks/exhaustive-deps */
import {
  Dispatch,
  SetStateAction,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

import { LayoutDashboard, Schedule, Users } from "@assets";
import {
  Filter as FilterType,
  FilterValues,
  Filters,
  ScheduledDateFilter as ScheduledDateFilterEnum,
  ServiceTagFilterAdditionalOptions,
} from "@types";
import { RootState } from "@store";
import { setFilteredWaitlist } from "@features/waitlist/waitlistSlice";
import {
  filterCustomScheduledDate,
  filterLastMonthSchedule,
  filterLastThirtyDaysScheduleDate,
  filterObjectsLastYear,
  filterObjectsPastTwoQuarters,
  filterObjectsThisYear,
  filterThisMonthScheduleDate,
  filterThisQuarterSchedule,
} from "@utils";
import { resetFilters, setFilters } from "@features/filter/filterSlice";
import ScheduledDateFilter from "./components/scheduledDateFilter";
import PeopleFilter from "./components/peopleFilter";
import OfferingsFilter from "./components/offeringsFilter";

interface FilterProps {
  setFilter: Dispatch<SetStateAction<boolean>>;
}

const filters: FilterType[] = [
  {
    name: Filters.Scheduled,
    icon: Schedule,
  },
  {
    name: Filters.People,
    icon: Users,
  },
  {
    name: Filters.Offerings,
    icon: LayoutDashboard,
  },
];

const getFilter = (
  filter: FilterType,
  selected: Filters,
  setSelected: Dispatch<SetStateAction<Filters>>
) => {
  const { name, icon } = filter;

  const handleClick = () => {
    setSelected(name);
  };

  return (
    <div
      className={`w-[214px] flex items-center gap-2 p-2 ${
        selected === name ? "rounded-md bg-light_border" : ""
      }`}
      onClick={handleClick}
    >
      <Image src={icon} alt={name} />
      <div className="text-sm font-medium text-smokey_black">{name}</div>
    </div>
  );
};

const Filter = forwardRef<HTMLDivElement, FilterProps>(({ setFilter }, ref) => {
  const dispatch = useDispatch();

  const waitlist = useSelector(
    (root: RootState) => root.waitlistSlice.waitlist
  );

  const filterValues = useSelector(
    (root: RootState) => root.filterSlice.filterValues
  );

  const currentFilters = useRef<FilterValues>(filterValues);

  const [selected, setSelected] = useState<Filters>(Filters.Scheduled);

  // Object literal mapping chosen date filter with corresponding functions
  const filterMethods = {
    [ScheduledDateFilterEnum.All]: () => waitlist,
    [ScheduledDateFilterEnum.Custom]: () =>
      filterCustomScheduledDate(
        currentFilters.current[Filters.Scheduled].startDate!,
        currentFilters.current[Filters.Scheduled].endDate!,
        waitlist
      ),
    [ScheduledDateFilterEnum.LastThirtyDays]: () =>
      filterLastThirtyDaysScheduleDate(waitlist),
    [ScheduledDateFilterEnum.ThisMonth]: () =>
      filterThisMonthScheduleDate(waitlist),
    [ScheduledDateFilterEnum.LastMonth]: () =>
      filterLastMonthSchedule(waitlist),
    [ScheduledDateFilterEnum.ThisQuarter]: () =>
      filterThisQuarterSchedule(waitlist),
    [ScheduledDateFilterEnum.PastQuarter]: () =>
      filterObjectsPastTwoQuarters(waitlist),
    [ScheduledDateFilterEnum.ThisYear]: () => filterObjectsThisYear(waitlist),
    [ScheduledDateFilterEnum.LastYear]: () => filterObjectsLastYear(waitlist),
  };

  const handleApply = () => {
    // Filter according to chosen scheduled date
    let newFilteredWaitlist =
      filterMethods[currentFilters.current[Filters.Scheduled].type]();

    const selectedPeople = currentFilters.current[Filters.People];
    const selectedServiceNames =
      currentFilters.current[Filters.Offerings].filteredValues;
    const selectedServiceType =
      currentFilters.current[Filters.Offerings].serviceType;
    const selectedServiceStatus =
      currentFilters.current[Filters.Offerings].serviceStatus;

    // Filter according to selected names
    if (selectedPeople.length) {
      const ids = selectedPeople.map((item) => item.id);

      newFilteredWaitlist = newFilteredWaitlist.filter((item) =>
        ids.includes(item.id)
      );
    }

    // Filter according to selected service names
    if (selectedServiceNames.length) {
      const ids = selectedServiceNames.map((item) => item.id);

      newFilteredWaitlist = newFilteredWaitlist.filter((item) =>
        ids.includes(item.id)
      );
    }
    // Filter according to selected service types
    if (
      selectedServiceType &&
      selectedServiceType !== ServiceTagFilterAdditionalOptions.ServiceType
    ) {
      newFilteredWaitlist = newFilteredWaitlist.filter(
        (item) => item.serviceType === selectedServiceType
      );
    }

    // Filter according to selected service status
    if (
      selectedServiceStatus &&
      selectedServiceStatus !== ServiceTagFilterAdditionalOptions.ServiceStatus
    ) {
      newFilteredWaitlist = newFilteredWaitlist.filter(
        (item) => item.serviceStatus === selectedServiceStatus
      );
    }

    // Update store with the new filter values and filtered data
    dispatch(setFilters(currentFilters.current));
    dispatch(setFilteredWaitlist(newFilteredWaitlist));
    setTimeout(() => {
      setFilter(false);
    }, 100);
  };

  // Reset filters
  const handleReset = () => {
    dispatch(resetFilters());
    dispatch(setFilteredWaitlist(waitlist));
    setTimeout(() => {
      setFilter(false);
    }, 100);
  };

  useEffect(() => {
    // Navigate through the filter options using keyboard input
    const handleKeyDown = (event: KeyboardEvent) => {
      const options = Object.values(Filters);
      const currentIndex = options.indexOf(selected);

      switch (event.key) {
        case "ArrowDown":
          if (currentIndex < options.length - 1) {
            setSelected(options[currentIndex + 1]);
          }
          break;
        case "ArrowUp":
          if (currentIndex > 0) {
            setSelected(options[currentIndex - 1]);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selected]);

  useEffect(() => {
    // Apply or reset filter based on keyboard input
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Enter":
          handleApply();
          break;
        case "r":
          handleReset();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className="flex flex-col w-[612px] h-[400px] absolute top-[43px] z-10 rounded-md bg-white shadow-shadow_intense"
      ref={ref}
      role="dialog"
      aria-labelledby="filter-dialog"
    >
      <div className="flex h-full">
        <div className="w-[230px] h-full rounded-tl-md p-2 border-r border-light_border">
          {filters.map((filter) => getFilter(filter, selected, setSelected))}
        </div>
        {selected === Filters.Scheduled ? (
          <ScheduledDateFilter currentFilters={currentFilters} />
        ) : selected === Filters.People ? (
          <PeopleFilter currentFilters={currentFilters} />
        ) : (
          <OfferingsFilter currentFilters={currentFilters} />
        )}
      </div>
      <div className="flex justify-end gap-6 w-[612px] px-4 py-2 border-t border-light_border">
        <div className="flex gap-4">
          <button
            className="h-[36px] flex items-center px-4 py-2 rounded-md bg-gray_400 shadow-shadow_minimal text-sm leading-6 text-jet_black font-medium button"
            onClick={handleReset}
            role="button"
            aria-label="Reset to Default"
          >
            Reset to Default
          </button>
          <button
            className="h-[36px] flex items-center px-4 py-2 rounded-md shadow-shadow_dark bg-pitch_black text-white button"
            onClick={handleApply}
            role="button"
            aria-label="Apply Changes"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
});

Filter.displayName = "Filter";

export default Filter;

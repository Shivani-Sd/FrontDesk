/* eslint-disable react-hooks/exhaustive-deps */
import { MutableRefObject, useState } from "react";
import _ from "lodash";

import {
  FilterValues,
  Filters,
  ScheduledDateFilter as ScheduledDateFilterEnum,
} from "@types";
import DatePicker from "@components/date-picker";
import Select from "@components/select";

interface ScheduledDateFilterProps {
  currentFilters: MutableRefObject<FilterValues>;
}

const ScheduledDateFilter: React.FC<ScheduledDateFilterProps> = ({
  currentFilters,
}) => {
  const filters = Object.values(ScheduledDateFilterEnum);
  const currentFilter = currentFilters.current[Filters.Scheduled];
  const currentFiltersCopy = _.cloneDeep(currentFilters.current);

  const [filter, setFilter] = useState<ScheduledDateFilterEnum>(
    currentFilter.type || filters[0]
  );

  // Update chosen filter
  const handleSelect = (filter: ScheduledDateFilterEnum) => {
    currentFiltersCopy[Filters.Scheduled].type = filter;
    currentFilters.current = currentFiltersCopy;
    setFilter(filter);
  };

  // Update current filters with selected start date
  const handleStartDateChange = (value: Date) => {
    currentFiltersCopy[Filters.Scheduled].startDate = value.toISOString();
    currentFilters.current = currentFiltersCopy;
  };

  // Update current filters with selected end date
  const handleEndDateChange = (value: Date) => {
    currentFiltersCopy[Filters.Scheduled].endDate = value.toISOString();
    currentFilters.current = currentFiltersCopy;
  };

  return (
    <div className="w-full flex flex-col gap-5 p-4">
      <Select
        options={filters}
        label={"Show orders for"}
        value={filter}
        handleSelect={handleSelect}
        aria-label="Filter orders by"
      />
      <div className="flex items-center gap-[19px]">
        <div className="w-[163px] max-h-[68px] flex flex-col gap-1 relative">
          <div
            className="font-medium text-xs leading-5 text-smokey_black pb-0.5"
            id="from-label"
          >
            From
          </div>
          <DatePicker
            initialValue={
              currentFilter.startDate ? new Date(currentFilter.startDate) : null
            }
            disabled={filter !== ScheduledDateFilterEnum.Custom}
            handleChange={handleStartDateChange}
            aria-labelledby="from-label"
          />
        </div>
        <div className="w-[163px] max-h-[68px] flex flex-col gap-1 relative">
          <div
            className="font-medium text-xs leading-5 text-smokey_black pb-0.5"
            id="to-label"
          >
            To
          </div>
          <DatePicker
            initialValue={
              currentFilter.endDate ? new Date(currentFilter.endDate) : null
            }
            disabled={filter !== ScheduledDateFilterEnum.Custom}
            handleChange={handleEndDateChange}
            aria-labelledby="to-label"
          />
        </div>
      </div>
    </div>
  );
};

export default ScheduledDateFilter;

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
  const currentFilter = currentFilters.current[Filters.Scheduled].type;
  const currentFiltersCopy = _.cloneDeep(currentFilters.current);

  const [filter, setFilter] = useState<ScheduledDateFilterEnum>(
    currentFilter || filters[0]
  );

  const handleSelect = (filter: ScheduledDateFilterEnum) => {
    currentFiltersCopy[Filters.Scheduled].type = filter;
    currentFilters.current = currentFiltersCopy;
    setFilter(filter);
  };

  const handleStartDateChange = (value: Date) => {
    currentFiltersCopy[Filters.Scheduled].startDate = value;
    currentFilters.current = currentFiltersCopy;
  };

  const handleEndDateChange = (value: Date) => {
    currentFiltersCopy[Filters.Scheduled].endDate = value;
    currentFilters.current = currentFiltersCopy;
  };

  return (
    <div className="w-full flex flex-col gap-5 p-4">
      <Select
        options={filters}
        label={"Show orders for"}
        value={filter}
        handleSelect={handleSelect}
      />
      <div className="flex items-center gap-[19px]">
        <div className="w-[163px] max-h-[68px] flex flex-col gap-1 relative">
          <div className="font-medium text-xs leading-5 text-smokey_black pb-0.5">
            From
          </div>
          <DatePicker
            initialValue={currentFilters.current[Filters.Scheduled].startDate}
            disabled={filter !== ScheduledDateFilterEnum.Custom}
            handleChange={handleStartDateChange}
          />
        </div>
        <div className="w-[163px] max-h-[68px] flex flex-col gap-1 relative">
          <div className="font-medium text-xs leading-5 text-smokey_black pb-0.5">
            To
          </div>
          <DatePicker
            initialValue={currentFilters.current[Filters.Scheduled].endDate}
            disabled={filter !== ScheduledDateFilterEnum.Custom}
            handleChange={handleEndDateChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ScheduledDateFilter;

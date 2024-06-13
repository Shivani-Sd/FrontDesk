import { MutableRefObject, useRef, useState } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";

import Search, { SearchItem } from "@components/search";
import Select from "@components/select";
import { RootState } from "@store";
import {
  FilterValues,
  Filters,
  ServiceStatus,
  ServiceStatusFilter,
  ServiceType,
  ServiceTypeFilter,
} from "@types";

interface OfferingsFilterProps {
  currentFilters: MutableRefObject<FilterValues>;
}

type SearchMethod = "name" | "tags";

const selectPlaceholder = "Select service type";

const statusColorMap = {
  [ServiceStatus.Private]: "#bf8000",
  [ServiceStatus.Public]: "#039855",
  [ServiceStatus.Draft]: "#3b82f6",
  [ServiceStatus.Disable]: "#475569",
};

const OfferingsFilter: React.FC<OfferingsFilterProps> = ({
  currentFilters,
}) => {
  const currentFilteredServices = currentFilters.current[Filters.Offerings];

  const waitlist = useSelector(
    (root: RootState) => root.waitlistSlice.waitlist
  );

  const allServices = useRef<{ id: number; value: string }[]>(
    waitlist.map((item) => ({ id: item.id, value: item.services }))
  );

  const [filterMethod, setFilterMethod] = useState<SearchMethod>("name");
  const [filterTags, setFilterTags] = useState<{
    serviceType: ServiceTypeFilter | string;
    serviceStatus: ServiceStatusFilter | string;
  }>({
    serviceType:
      currentFilters.current[Filters.Offerings].serviceType ||
      selectPlaceholder,
    serviceStatus:
      currentFilters.current[Filters.Offerings].serviceStatus ||
      selectPlaceholder,
  });

  const handleChangeFilterMethod = (method: SearchMethod) => {
    setFilterMethod(method);
  };

  const handleSelectServiceType = (selectedServiceType: ServiceTypeFilter) => {
    const currentFiltersCopy = _.cloneDeep(currentFilters.current);

    currentFiltersCopy[Filters.Offerings].serviceType = selectedServiceType;
    currentFilters.current = currentFiltersCopy;

    setFilterTags((prev) => ({ ...prev, serviceType: selectedServiceType }));
  };

  const handleSelectServiceStatus = (
    selectedServiceStatus: ServiceStatusFilter
  ) => {
    const currentFiltersCopy = _.cloneDeep(currentFilters.current);

    currentFiltersCopy[Filters.Offerings].serviceStatus = selectedServiceStatus;
    currentFilters.current = currentFiltersCopy;

    setFilterTags((prev) => ({
      ...prev,
      serviceStatus: selectedServiceStatus,
    }));
  };

  const updateCurrentFilters = (
    selectedServices: {
      id: number;
      value: string;
    }[]
  ) => {
    const currentFiltersCopy = _.cloneDeep(currentFilters.current);

    currentFiltersCopy[Filters.Offerings].filteredValues = selectedServices;
    currentFilters.current = currentFiltersCopy;
  };

  const getChips = (searchItem: SearchItem) => {
    const item = waitlist.find((item) => searchItem.id === item.id);

    return (
      <div className="w-max flex justify-end gap-2 items-center">
        <div className="rounded-[4px] px-2 py-0.5 bg-sky_blue text-[10px] leading-4 font-medium text-center text-smokey_black">
          {item?.serviceType}
        </div>
        <div
          className="rounded-[4px] px-2 py-0.5 bg-sky_blue text-[10px] leading-4 font-medium text-center"
          style={{
            color: statusColorMap[item?.serviceStatus || ServiceStatus.Private],
          }}
        >
          {item?.serviceStatus}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`w-full max-h-[344px] flex flex-col gap-5 p-4 ${
        filterMethod === "name"
          ? "overflow-x-hidden overflow-y-auto"
          : "overflow-visible"
      }`}
    >
      <div className="w-[340px] flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div
            className="w-[16px] h-[16px] relative rounded-full bg-white border border-light_border"
            onClick={() => handleChangeFilterMethod("name")}
          >
            {filterMethod === "name" && (
              <div className="w-[8px] h-[8px] top-[3px] left-[3px] absolute rounded bg-black"></div>
            )}
          </div>
          <div className="font-normal text-sm text-smokey_black">
            Search by name
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-[16px] h-[16px] relative rounded-full bg-white border border-light_border"
            onClick={() => handleChangeFilterMethod("tags")}
          >
            {filterMethod === "tags" && (
              <div className="w-[8px] h-[8px] top-[3px] left-[3px] absolute rounded bg-black"></div>
            )}
          </div>
          <div className="font-normal text-sm text-smokey_black">
            Search by tags
          </div>
        </div>
      </div>
      {filterMethod === "name" ? (
        <Search
          placeholder="Search service name"
          allItems={allServices}
          currentFilteredItems={currentFilteredServices.filteredValues}
          chips={getChips}
          handleSelectItems={updateCurrentFilters}
        />
      ) : (
        <>
          <Select
            options={["Show all service type", ...Object.values(ServiceType)]}
            label="Service type"
            value={filterTags.serviceType!}
            handleSelect={handleSelectServiceType}
          />
          <Select
            options={["Show all", ...Object.values(ServiceStatus)]}
            label="Status"
            value={filterTags.serviceStatus!}
            handleSelect={handleSelectServiceStatus}
          />
        </>
      )}
    </div>
  );
};

export default OfferingsFilter;

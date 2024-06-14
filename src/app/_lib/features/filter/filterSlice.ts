import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Filters, FilterValues, ScheduledDateFilter } from "@types";

interface FilterSlice {
  filterValues: FilterValues;
  filtered: boolean;
}

const initialState: FilterSlice = {
  filterValues: {
    [Filters.Scheduled]: {
      type: ScheduledDateFilter.All,
      startDate: null,
      endDate: null,
    },
    [Filters.People]: [],
    [Filters.Offerings]: {
      filteredValues: [],
      serviceType: null,
      serviceStatus: null,
    },
  },
  filtered: false,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilters: (_, action: PayloadAction<FilterValues>) => ({
      filterValues: action.payload,
      filtered: true,
    }),
    resetFilters: () => ({
      filterValues: initialState.filterValues,
      filtered: false,
    }),
  },
});

export const { setFilters, resetFilters } = filterSlice.actions;

export default filterSlice.reducer;

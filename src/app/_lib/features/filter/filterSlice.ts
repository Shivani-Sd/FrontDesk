import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Filters, FilterValues, ScheduledDateFilter } from "@types";

interface FilterSlice {
  filterValues: FilterValues;
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
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<FilterValues>) => ({
      ...state,
      filterValues: action.payload,
    }),
    resetFilters: (state) => ({
      ...state,
      filterValues: initialState.filterValues,
    }),
  },
});

export const { setFilters, resetFilters } = filterSlice.actions;

export default filterSlice.reducer;

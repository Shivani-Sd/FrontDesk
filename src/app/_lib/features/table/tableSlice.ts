import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TableHeader } from "@types";
import { tableHeaders } from "@constants";

interface Table {
  headers: TableHeader[];
}

const initialState: Table = {
  headers: tableHeaders,
};

export const tableSlice = createSlice({
  name: "waitlist",
  initialState,
  reducers: {
    setHeaders: (state, action: PayloadAction<TableHeader[]>) => ({
      ...state,
      headers: action.payload,
    }),
    resetHeaders: (state) => ({
      ...state,
      filteredHeaders: initialState.headers,
    }),
  },
});

export const { setHeaders, resetHeaders } = tableSlice.actions;

export default tableSlice.reducer;

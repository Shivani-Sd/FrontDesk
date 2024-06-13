import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TableHeader } from "@types";
import { tableHeaders } from "@constants";

interface TableSlice {
  headers: TableHeader[];
}

const initialState: TableSlice = {
  headers: tableHeaders,
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setHeaders: (state, action: PayloadAction<TableHeader[]>) => ({
      ...state,
      headers: action.payload,
    }),
    resetHeaders: () => initialState,
  },
});

export const { setHeaders, resetHeaders } = tableSlice.actions;

export default tableSlice.reducer;

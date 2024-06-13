import { configureStore } from "@reduxjs/toolkit";

import waitlistSlice from "@features/waitlist/waitlistSlice";
import tableSlice from "@features/table/tableSlice";
import filterSlice from "@features/filter/filterSlice";

export const makeStore = () => {
  return configureStore({
    reducer: { filterSlice, tableSlice, waitlistSlice },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

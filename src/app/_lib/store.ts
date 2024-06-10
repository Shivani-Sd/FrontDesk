import { configureStore } from "@reduxjs/toolkit";
import waitlistSlice from "./features/waitlist/waitlistSlice";

export const makeStore = () => {
  return configureStore({
    reducer: { waitlistSlice },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

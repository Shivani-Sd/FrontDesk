import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { waitlist } from "@constants";
import { Waitlist } from "@types";

interface WaitListSlice {
  waitlist: Waitlist[];
  filteredWaitlist: Waitlist[];
}

const initialState: WaitListSlice = {
  waitlist: waitlist,
  filteredWaitlist: waitlist,
};

export const waitlistSlice = createSlice({
  name: "waitlist",
  initialState,
  reducers: {
    setFilteredWaitlist: (state, action: PayloadAction<Waitlist[]>) => ({
      ...state,
      filteredWaitlist: action.payload,
    }),
  },
});

export const { setFilteredWaitlist } = waitlistSlice.actions;

export default waitlistSlice.reducer;

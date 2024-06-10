import { createSlice } from "@reduxjs/toolkit";

import { waitlists } from "@constants";
import { Waitlist } from "@types";

const initialState: Waitlist[] = waitlists;

export const waitlistSlice = createSlice({
  name: "waitlist",
  initialState,
  reducers: {},
});

export const {} = waitlistSlice.actions;

export default waitlistSlice.reducer;

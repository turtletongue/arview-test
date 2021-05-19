import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HomepageState {
  date: string;
}

const initialState: HomepageState = {
  date: new Date().toISOString(),
};

const homepageSlice = createSlice({
  name: "homepage",
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
  },
});

export const { setDate } = homepageSlice.actions;
export default homepageSlice.reducer;

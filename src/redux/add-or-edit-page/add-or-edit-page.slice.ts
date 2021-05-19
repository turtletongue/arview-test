import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventType } from "../../interfaces/EventType";

interface AddOrEditPageState {
  title: string;
  type: EventType;
  budget: number;
  address: string;
  time: string;
  other: string;
}

const initialState: AddOrEditPageState = {
  title: "",
  type: "Мероприятие",
  budget: 0,
  address: "",
  time: "",
  other: "",
};

const addOrEditPageSlice = createSlice({
  name: "add-or-edit-page",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setType: (state, action: PayloadAction<EventType>) => {
      state.type = action.payload;
    },
    setBudget: (state, action: PayloadAction<number>) => {
      state.budget = action.payload;
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setTime: (state, action: PayloadAction<string>) => {
      state.time = action.payload;
    },
    setOther: (state, action: PayloadAction<string>) => {
      state.other = action.payload;
    },
    clearAll: (state) => {
      state.title = "";
      state.address = "";
      state.budget = 0;
      state.other = "";
      state.time = "";
      state.type = "Мероприятие";
    },
  },
});

export const {
  setAddress,
  setBudget,
  setOther,
  setTime,
  setTitle,
  setType,
  clearAll,
} = addOrEditPageSlice.actions;
export default addOrEditPageSlice.reducer;

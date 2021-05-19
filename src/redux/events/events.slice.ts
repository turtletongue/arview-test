import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import EventInformation from "../../interfaces/EventInformation";

interface EventState {
  events: EventInformation[];
}

const initialState: EventState = {
  events: [],
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<EventInformation>) => {
      const existingEventIndex = state.events.findIndex(
        (event) => event.id === action.payload.id
      );
      if (existingEventIndex === -1) {
        state.events.push(action.payload);
      }
    },
    deleteEvent: (state, action: PayloadAction<number>) => {
      state.events = state.events.filter(
        (event) => event.id !== action.payload
      );
    },
    editEvent: (state, action: PayloadAction<EventInformation>) => {
      const existingEventIndex = state.events.findIndex(
        (event) => event.id === action.payload.id
      );
      if (existingEventIndex !== -1) {
        state.events[existingEventIndex] = action.payload;
      }
    },
  },
});

export const { addEvent, deleteEvent, editEvent } = eventsSlice.actions;
export default eventsSlice.reducer;

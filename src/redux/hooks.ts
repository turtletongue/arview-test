import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import EventInformation from "../interfaces/EventInformation";
import { EventType } from "../interfaces/EventType";
import {
  clearAll,
  setAddress,
  setBudget,
  setOther,
  setTime,
  setTitle,
  setType,
} from "./add-or-edit-page/add-or-edit-page.slice";
import { addEvent, deleteEvent, editEvent } from "./events/events.slice";
import { setDate } from "./homepage/homepage.slice";
import type { AppDispatch, RootState } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useHomepageData = () => {
  const dispatch = useAppDispatch();

  const date = useAppSelector((state) => state.homepage.date);

  const changeDate = (newDate: string) => {
    dispatch(setDate(newDate));
  };

  return {
    date,
    changeDate,
  };
};

export const useEvents = () => {
  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.events.events);

  const createEvent = (eventInformation: EventInformation) => {
    dispatch(addEvent(eventInformation));
  };

  const removeEvent = (id: number) => {
    dispatch(deleteEvent(id));
  };

  const editEventInformation = (newEventInformation: EventInformation) => {
    dispatch(editEvent(newEventInformation));
  };

  return {
    events,
    createEvent,
    removeEvent,
    editEventInformation,
  };
};

export const useAddOrEditPageData = () => {
  const dispatch = useDispatch();

  const title = useAppSelector((state) => state.addOrEditPage.title);
  const changeTitle = (newTitle: string) => {
    dispatch(setTitle(newTitle));
  };

  const type = useAppSelector((state) => state.addOrEditPage.type);
  const changeType = (newType: EventType) => {
    dispatch(setType(newType));
  };

  const budget = useAppSelector((state) => state.addOrEditPage.budget);
  const changeBudget = (newBudget: number) => {
    dispatch(setBudget(newBudget));
  };

  const address = useAppSelector((state) => state.addOrEditPage.address);
  const changeAddress = (newAddress: string) => {
    dispatch(setAddress(newAddress));
  };

  const time = useAppSelector((state) => state.addOrEditPage.time);
  const changeTime = (newTime: string) => {
    dispatch(setTime(newTime));
  };

  const other = useAppSelector((state) => state.addOrEditPage.other);
  const changeOther = (newOther: string) => {
    dispatch(setOther(newOther));
  };

  const clearAllInputs = () => {
    dispatch(clearAll());
  };

  return {
    address,
    changeAddress,
    budget,
    changeBudget,
    other,
    changeOther,
    time,
    changeTime,
    title,
    changeTitle,
    type,
    changeType,
    clearAllInputs,
  };
};

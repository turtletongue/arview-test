import { EventType } from "./EventType";

export default interface EventInformation {
  id: number;
  title: string;
  type: EventType;
  date: string;
  budget?: number;
  address?: string;
  time?: string;
  other?: string;
}

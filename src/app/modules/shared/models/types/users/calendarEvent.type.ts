export type calendarEvent = {
  id?: number;
  tableId: number;
  title: string;
  start: Date;
  end?: string;
  allDay: boolean;
  color?: string;
};

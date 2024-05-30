export type calendarEvent = {
  id?: number;
  tableId: number;
  title: string;
  description?: string,
  start: Date | null;
  end?: Date | null;
  allDay: boolean;
  color?: string;
};

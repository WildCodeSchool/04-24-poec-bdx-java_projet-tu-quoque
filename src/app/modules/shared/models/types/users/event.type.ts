export type Event = {
  id: number;
  tableId: number;
  title: string;
  start: string;
  end?: string;
  allDay: boolean;
  color?: string;
};

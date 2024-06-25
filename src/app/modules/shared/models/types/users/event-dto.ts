export type EventDTO = {
    id: number,
    tableId: number, 
    title: string,
    start: Date,
    end: Date,
    description: string,
    allDay: boolean,
    color: string
}
import { DrawingDTO } from "./drawing-dto";
import { EventDTO } from "./event-dto";
import { NoteDTO } from "./note-dto";

export type TableFullDTO = {
    id: number,
    name: string,
    avatar: string,
    userId: number, 
    drawingList: DrawingDTO[],
    eventList: EventDTO[],
    noteList: NoteDTO[],
}
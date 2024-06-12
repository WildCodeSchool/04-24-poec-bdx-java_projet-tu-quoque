import { ElementProperties } from "../../../../character-sheet/models/interfaces/element-properties";
import { CharacterFullDTO } from "./character-full-dto";
import { DrawingDTO } from "./drawing-dto";
import { EventDTO } from "./event-dto";
import { NoteDTO } from "./note-dto";

export type GameTableFullDTO = ElementProperties & {
    id: number,
    name: string,
    avatar: string,
    // userId: number, 
    drawingList: DrawingDTO[],
    eventList: EventDTO[],
    noteList: NoteDTO[],
    playerCharacterDTOList: CharacterFullDTO[]
}
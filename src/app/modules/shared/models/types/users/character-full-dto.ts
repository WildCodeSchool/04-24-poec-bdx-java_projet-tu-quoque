import { NoteDTO } from "./note-dto"
import { GameTableDTO } from "./table-dto"

export type CharacterFullDTO = {
    id: number,
    name: string,
    avatar: string,
    accepted: boolean,
    gameTable: GameTableDTO,
    characterSheetId: number,
    characterNoteList: NoteDTO[]
}
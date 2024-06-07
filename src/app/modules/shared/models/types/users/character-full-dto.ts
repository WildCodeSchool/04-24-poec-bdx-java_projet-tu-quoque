import { TableDTO } from "./table-dto"

export type CharacterFullDTO = {
    id: number,
    name: string,
    avatar: string,
    accepted: boolean,
    drawingList: TableDTO[],
    characterSheetId: number
}
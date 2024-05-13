import { StatAbbrKey } from "../enums/stats-abbr.enum"

export type SkillFromDb = {
    name: string,
    key: StatAbbrKey,
    innate: boolean,
    armorMalus: number,
    choice: boolean
}
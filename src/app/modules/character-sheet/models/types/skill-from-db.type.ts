import { Skills } from "../enums/skills.enum"
import { StatAbbrKey } from "../enums/stats-abbr.enum"

export type SkillFromDb = {
    name: Skills,
    key: StatAbbrKey,
    innate: boolean,
    armorMalus: number,
    choice: boolean
}
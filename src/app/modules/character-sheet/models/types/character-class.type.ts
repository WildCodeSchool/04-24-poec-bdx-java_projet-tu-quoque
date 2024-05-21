import { PossibleDice } from "../../../shared/models/enums/possible-dice.enum"
import { Skills } from "../enums/skills.enum"

export type CharacterClass = {
    name: string,
    DV: PossibleDice,
    classSkills: Skills[],
    baseSkillPoints: string,
    skillPointsPerLevel: string,
    weapons: string[],
    shields: string,
    armors: string[]
    special: any[]
}
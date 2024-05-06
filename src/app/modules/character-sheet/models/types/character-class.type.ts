import { PossibleDice } from "../../../shared/models/enums/possible-dice.enum"

export type CharacterClass = {
    name: string,
    DV: PossibleDice,
    classSkills: string[],
    baseSkillPoints: string,
    skillPointsPerLevel: string,
    weapons: string[],
    shields: string,
    armors: string[]
    special: any[]
}
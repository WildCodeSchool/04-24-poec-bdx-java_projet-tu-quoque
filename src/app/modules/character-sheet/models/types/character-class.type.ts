import { PossibleDice } from "../../../shared/models/enums/possible-dice.enum"
import { AttackBaseBonusType } from "../enums/attack-base-bonus-type.enum"
import { Skills } from "../enums/skills.enum"
import { SavingThrows } from "./saving-throws.type"

export type CharacterClass = {
    name: string,
    DV: PossibleDice,
    classSkills: Skills[],
    baseSkillPoints: string,
    skillPointsPerLevel: string,
    weapons: string[],
    shields: string,
    armors: string[],
    attackBaseBonus: AttackBaseBonusType,
    savingThrowsBonus: SavingThrows
    special: any[]
}
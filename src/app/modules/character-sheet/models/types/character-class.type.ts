import { PossibleDice } from "../../../shared/models/enums/possible-dice.enum"
import { AttackBaseBonusTypeKey } from "../enums/attack-base-bonus-type.enum"
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
    attackBaseBonus: AttackBaseBonusTypeKey,
    savingThrowsBonus: SavingThrows
    special: any[]
}
import { PossibleDiceKey } from "../../../shared/models/enums/possible-dice.enum"
import { BaseAttackBonusTypeKey } from "../enums/attack-base-bonus-type.enum"
import { Skills } from "../enums/skills.enum"
import { SavingThrows } from "./saving-throws.type"

export type CharacterClass = {
    name: string,
    DV: PossibleDiceKey,
    classSkills: Skills[],
    baseSkillPoints: string,
    skillPointsPerLevel: string,
    weapons: string[],
    shields: string,
    armors: string[],
    baseAttackBonus: BaseAttackBonusTypeKey,
    savingThrowsBonus: SavingThrows
    startingMoney: string,
    special: any[]
}
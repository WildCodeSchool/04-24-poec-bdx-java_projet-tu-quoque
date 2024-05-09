import { AgeModifierPerRace } from "./age-modifier-per-race.type"
import { BaseMeasurement } from "./base-measurement.type"
import { RaceLanguage } from "./race-language.type"
import { SkillModifier } from "./skill.type"
import { StatModifier } from "./stat-modifier.type"

export type Race = {
    name: string,
    statsModifiers: StatModifier[],
    sizeCategorie: string,
    skills: SkillModifier[],
    languages: RaceLanguage,
    adultAge: number,
    ageModifier: AgeModifierPerRace,
    baseHeight: BaseMeasurement,
    modHeight: string,
    baseWeight: BaseMeasurement,
    modWeight: string
}
import { BaseMeasurement } from "./base-measurement.type"
import { RaceLanguage } from "./race-language.type"
import { SkillModifier } from "./skill.type"
import { StatModifier } from "./stat-modifier.type"

export type Race = {
    name: string,
    statsModifiers: StatModifier[],
    skills: SkillModifier[],
    languages: RaceLanguage,
    adultAge: number,
    baseHeight: BaseMeasurement,
    modHeight: string,
    baseWeight: BaseMeasurement,
    modWeight: string
}
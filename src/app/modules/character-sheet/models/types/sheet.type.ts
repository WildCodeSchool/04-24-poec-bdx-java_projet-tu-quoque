import { FieldInfosAddByPlayer } from "../../shared/classes/skill-infos-add-by-player.class"
import { CharacterStats } from "../classes/character-stats.class"
import { Purse } from "../classes/purse-related/purse.class"
import { Weapon } from "../classes/weapon.class"

export type Sheet = {
    age: string,
    alignment: string,
    characterClass: string,
    characterName: string,
    characterRace: string,
    eyesColor: string,
    gender: string,
    god: string,
    hairColor: string,
    heightModifierRolled: string,
    level: string,
    playerName: string,
    purse?: Purse,
    skills: FieldInfosAddByPlayer[],
    skinColor: string,
    stats: CharacterStats
    weapons: Weapon[]
    weightModifierRolled: string
}

export type SheetKey = keyof Sheet;

export enum SheetKeyForString {
    age,
    alignment,
    characterClass,
    characterName,
    characterRace,
    eyesColor,
    gender,
    god,
    hairColor,
    heightModifierRolled,
    level,
    playerName,
    skinColor,
    weightModifierRolled
}

export type SheetKeyForStringKeys = keyof typeof SheetKeyForString;
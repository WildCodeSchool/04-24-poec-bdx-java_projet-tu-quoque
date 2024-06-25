import { SkillInfosAddByPlayer } from "../../../../shared/classes/skill-infos-add-by-player.class"
import { CharacterStats } from "../../../classes/character-stats.class"
import { Purse } from "../../../classes/purse-related/purse.class"
import { Weapon } from "../../../classes/weapon.class"
import { PurseDTO } from "../purse-dto.type"
import { SkillInfoModifiedByPlayerDTO } from "../skill-info-modified-by-player-dto.type"
import { StatisticsDTO } from "../statistics-dto.type"
import { WeaponsDTO } from "../weapons-dto.type"
import { WeaponDTOFromFront } from "./weapon-dto-from-front.type"


export type SheetDTOFromFrontToBack = {
    id: number,
    statisticsId: number,
    weaponsId: number,
    age: string | null,
    alignment: string | null,
    characterClass: string | null,
    characterName: string | null,
    characterRace: string | null,
    eyesColor: string | null,
    gender: string | null,
    god: string | null,
    hairColor: string | null,
    heightModifierRolled: string | null,
    level: string | null,
    playerName: string | null,
    purse: PurseDTO,
    skills: SkillInfosAddByPlayer[],
    skinColor: string | null,
    stats: StatisticsDTO,
    weapons: WeaponDTOFromFront[],
    weightModifierRolled: string | null
}

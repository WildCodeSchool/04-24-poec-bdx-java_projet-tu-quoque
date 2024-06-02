import { StatAbbr, StatAbbrKey } from "../enums/stats-abbr.enum";
import { StatisticDetails } from "./statistic-details.class"

export class CharacterStats {
    FOR: StatisticDetails = new StatisticDetails("FOR");
    DEX: StatisticDetails = new StatisticDetails("DEX");
    CON: StatisticDetails = new StatisticDetails("CON");
    INT: StatisticDetails = new StatisticDetails("INT");
    SAG: StatisticDetails = new StatisticDetails("SAG");
    CHA: StatisticDetails = new StatisticDetails("CHA");

    *[Symbol.iterator](): IterableIterator<StatisticDetails> {
        for (let key of Object.keys(StatAbbr)) {
            yield this[key as StatAbbrKey];
        }
    }

    resetMod(): void {
        for (let statistic of this) {
            statistic.applyModifier({ stat: statistic.abbr, mod: 0 })
        }
    }
}
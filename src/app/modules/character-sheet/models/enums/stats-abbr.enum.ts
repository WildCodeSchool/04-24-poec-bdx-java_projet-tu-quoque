export enum StatAbbr {
    FOR = "Force",
    DEX = "Dextérité",
    CON = "Constitution",
    INT = "Intelligence",
    SAG = "Sagesse",
    CHA = "Charisme"
}

export type StatAbbrKey = keyof typeof StatAbbr;
export type StatAbbrValue = typeof StatAbbr[StatAbbrKey];
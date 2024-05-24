export enum BaseAttackBonusType {
    "low" = 1 / 2,
    "medium" = 3 / 4,
    "high" = 1
}
export type BaseAttackBonusTypeKey = keyof typeof BaseAttackBonusType;
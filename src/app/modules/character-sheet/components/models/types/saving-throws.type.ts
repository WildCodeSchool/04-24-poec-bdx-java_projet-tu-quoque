import { SavingThrowTypeKey } from "../enums/saving-throws-type.enum"

export type SavingThrows = {
    reflexes: SavingThrowTypeKey,
    fortitude: SavingThrowTypeKey,
    will: SavingThrowTypeKey
}
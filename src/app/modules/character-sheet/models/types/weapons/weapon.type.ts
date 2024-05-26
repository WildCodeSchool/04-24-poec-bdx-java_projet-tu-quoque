import { Ammo } from "./ammo.type"
import { Damages } from "./damages.type"

export type WeaponDetails = {
  name: string,
  category: string,
  price: string,
  damages: Damages
  critic: string,
  rangeFactor: null | number,
  weight: number,
  type: string,
  munitions: null | Ammo
}
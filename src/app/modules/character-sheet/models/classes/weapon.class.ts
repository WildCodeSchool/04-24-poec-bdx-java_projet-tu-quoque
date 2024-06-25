import { WeaponDetails } from "../types/weapons/weapon.type";

export class Weapon {
    id: number;
    constructor(public weaponDetails: WeaponDetails, id: number = -1) {
        this.id = id;
    }
}
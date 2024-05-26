import { Injectable } from '@angular/core';
import { DbService } from '../../../shared/services/db-service/db.service';
import { map, switchMap } from 'rxjs';
import { CharacterSheetService } from './character-sheet.service';
import { CharacterClass } from '../../models/types/character-class.type';
import { WeaponDetails } from '../../models/types/weapons/weapon.type';

@Injectable({
  providedIn: 'root'
})
export class ClassWeaponsService {

  constructor(
    private dbService: DbService,
    private sheet: CharacterSheetService
  ) { }

  getWeapons$() {
    return this.dbService.getWeapons$();
  }

  getClassWeapons$() {
    return this.sheet.getClasseDetails$().pipe(
      map((classDetail: CharacterClass) => classDetail ? classDetail.weapons : []),
      switchMap((weaponsAllowed: string[]) => this.getWeapons$().pipe(
        map((weaponsList: WeaponDetails[]) => this.searchInWeaponsFromDb(weaponsAllowed, weaponsList)),
      )),
    )
  }

  searchInWeaponsFromDb(weaponNameList: string[], weaponListFromDb: WeaponDetails[]) {
    return weaponListFromDb.filter(
      (weapon: WeaponDetails) =>
        weaponNameList.includes(weapon.name) || weaponNameList.includes(weapon.category)
    );
  }
}

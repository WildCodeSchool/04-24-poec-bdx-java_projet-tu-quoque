import { Injectable } from '@angular/core';
import { DbService } from '../../../shared/services/db-service/db.service';
import { map, shareReplay, switchMap } from 'rxjs';
import { CharacterSheetService } from './character-sheet.service';
import { CharacterClass } from '../../models/types/character-class.type';
import { Weapon } from '../../models/types/weapons/weapon.type';

@Injectable({
  providedIn: 'root'
})
export class WeaponsService {

  constructor(
    private dbService: DbService,
    private sheet: CharacterSheetService
  ) { }

  getWeapons$() {
    return this.dbService.getWeapons$().pipe(
      shareReplay()
    );
  }

  getClassWeapons$() {
    return this.sheet.getClasseDetails$().pipe(
      map((classDetail: CharacterClass) => classDetail ? classDetail.weapons : []),
      switchMap((weaponsAllowed: string[]) => this.getWeapons$().pipe(
        map((weaponsList: Weapon[]) => this.searchInWeaponsFromDb(weaponsAllowed, weaponsList)),
      )),
    )
  }

  searchInWeaponsFromDb(weaponNameList: string[], weaponListFromDb: Weapon[]) {
    return weaponListFromDb.filter(
      (weapon: Weapon) =>
        weaponNameList.includes(weapon.name) || weaponNameList.includes(weapon.category)
    );
  }
}

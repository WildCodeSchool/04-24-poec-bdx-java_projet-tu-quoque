import { inject, Injectable } from '@angular/core';
import { CharacterSheetService } from '../character-sheet.service';
import { map, Observable, switchMap } from 'rxjs';
import { SizeCategoryEnumKey } from '../../../models/enums/sizeCategoryEnum.enum';
import { CharacterClass } from '../../../models/types/character-class.type';

@Injectable({
  providedIn: 'root'
})
export class MovementService {
  sheetService: CharacterSheetService = inject(CharacterSheetService);

  public getMovement$(): Observable<number> {
    return this.sheetService.setSizeCategory$().pipe(
      map((size: SizeCategoryEnumKey) => this.selectMovementBySizeCategory(size)),
      switchMap((movement: number) => this.sheetService.getClasseDetails$().pipe(
        map((classDetails: CharacterClass) => this.selectClassName(classDetails)),
        map((name: string) => name == "Barbare" && movement != 0 ? movement + 3 : movement)
      ))
    )
  }

  private selectMovementBySizeCategory(size: SizeCategoryEnumKey): number {
    switch (size) {
      case 'NA': return 0;
      case 'P': return 6;
      case 'M': return 9;
    }
  }

  private selectClassName(classDetails: CharacterClass): string {
    if (classDetails) return classDetails.name;
    else return "unknown";
  }
}

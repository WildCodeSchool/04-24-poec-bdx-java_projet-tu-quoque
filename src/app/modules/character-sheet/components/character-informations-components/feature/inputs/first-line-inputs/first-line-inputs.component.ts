import { Component, DestroyRef, inject } from '@angular/core';
import { InputField } from '../../../../../shared/classes/input-field.class';
import { AbstractListenerComponent } from '../../../../../shared/abstract-components/abstract-listener-component.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-first-line-inputs',
  templateUrl: './first-line-inputs.component.html',
  styleUrl: './first-line-inputs.component.scss'
})
export class FirstLineInputsComponent extends AbstractListenerComponent {

  fieldList!: InputField[]

  ngOnInit() {
    this.listener.sendInfos().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(data => {
      this.fieldList = [
        new InputField("characterName", "NOM DU PERSONNAGE", "size-470", data.characterName),
        new InputField("playerName", "JOUEUR", "size-470", data.playerName)
      ]
    });
  }
}

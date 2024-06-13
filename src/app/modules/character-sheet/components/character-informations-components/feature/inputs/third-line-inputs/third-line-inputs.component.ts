import { Component } from '@angular/core';
import { InputField } from '../../../../../shared/classes/input-field.class';
import { AbstractListenerComponent } from '../../../../../shared/abstract-components/abstract-listener-component.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-third-line-inputs',
  templateUrl: './third-line-inputs.component.html',
  styleUrl: './third-line-inputs.component.scss'
})
export class ThirdLineInputsComponent extends AbstractListenerComponent {

  fieldList!: InputField[];

  ngOnInit() {
    this.listener.sendInfos().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(sheet => {
      this.fieldList = [
        new InputField("eyesColor", "YEUX", "size-117", sheet.eyesColor),
        new InputField("hairColor", "CHEVEUX", "size-117", sheet.hairColor),
        new InputField("skinColor", "PEAU", "size-117", sheet.skinColor),
      ]
    });



  }
}

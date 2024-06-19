import { Component } from '@angular/core';
import { InputField } from '../../../../../shared/classes/input-field.class';
import { AbstractListenerComponent } from '../../../../../shared/abstract-components/abstract-listener-component.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-god-input',
  templateUrl: './god-input.component.html',
  styleUrl: './god-input.component.scss'
})
export class GodInputComponent extends AbstractListenerComponent {
  fieldList!: InputField[];

  ngOnInit() {
    this.listener.sendInfos().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(sheet => {
      this.fieldList = [new InputField("god", "DIVINITE", "size-196", sheet.god)];
    });
  }
}

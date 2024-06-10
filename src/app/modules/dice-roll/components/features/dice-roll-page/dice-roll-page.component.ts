import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import DiceBox from '@3d-dice/dice-box';
import DisplayResults from '@3d-dice/dice-ui';
import { DiceService } from '../../../../shared/services/dice-service/dice.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EventClickArg } from '@fullcalendar/core';
import { InfoPopupComponent } from '../../../../user/modules/table/modules/table-management/modules/table-calendar/components/info-popup/info-popup.component';
import { DiceRollScorePopupComponent } from '../../ui/dice-roll-score-popup/dice-roll-score-popup.component';
import { DiceRollRulesComponent } from '../../ui/dice-roll-rules/dice-roll-rules.component';
@Component({
  selector: 'app-dice-roll-page',
  templateUrl: './dice-roll-page.component.html',
  styleUrl: './dice-roll-page.component.scss',
  providers: [DialogService]
})
export class DiceRollPageComponent {
  diceBox: any;
  inputText: string = '';
  ref: DynamicDialogRef | undefined;
  dialogService = inject(DialogService);
  diceService = inject(DiceService)

  ngAfterViewInit(): void {
    const containerId = '#diceBoxContainer';
    this.diceBox = new DiceBox(containerId, {
      id: 'diceBox',
      assetPath: '/assets/dice-box/',
      theme: 'default',
      Offscreen: true,
      scale: 5,
    });
 
  this.diceBox.canvas.width = window.innerWidth;
  this.diceBox.canvas.height = window.innerHeight - 270;
  this.diceBox.init()
  }
  rollDice(): void {
    if (this.diceBox) {
      this.diceBox.roll(this.inputText.split(' ')).then((result: any) => this.showEvent(result))
    }
  }

  showEvent(result: any): void {
    const throwResult = this.diceService.getDicesThrowResult(result)

    this.ref = this.dialogService.open(DiceRollScorePopupComponent, {
      data: {
        info: throwResult,
      },
      header: "Résultat du lancé",
      width: '50vw',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
    });
  }

  showDiceThrowRules(): void {
    this.ref = this.dialogService.open(DiceRollRulesComponent, {
      header: "Utilisation",
      width: '50vw',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
    });
  }

}

import { Component, ElementRef, ViewChild } from '@angular/core';
import DiceBox from '@3d-dice/dice-box';

@Component({
  selector: 'app-dice-roll-page',
  templateUrl: './dice-roll-page.component.html',
  styleUrl: './dice-roll-page.component.scss',
})
export class DiceRollPageComponent {
  diceBox: any;
  inputText: string = '';

  @ViewChild('diceBoxContainer', { static: true })
  diceBoxContainer!: ElementRef<HTMLDivElement>;

  ngOnInit() {}

  ngAfterViewInit(): void {
    const containerId = '#diceBoxContainer';
    this.diceBox = new DiceBox(containerId, {
      id: 'diceBox',
      assetPath: '/assets/dice-box/',
      theme: 'default',
      Offscreen: true,
      scale: 5,
    });

    this.diceBox.canvas.width = '400';
    this.diceBox.canvas.height = '600';
    this.diceBox.init();
  }
  rollDice(): void {
    if (this.diceBox) {
      this.diceBox.roll(this.inputText.split(' '));
    }
  }
}

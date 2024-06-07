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
  this.diceBox.init();
  }
  rollDice(): void {
    if (this.diceBox) {
      this.diceBox.roll(this.inputText.split(' '));
    }
  }
}

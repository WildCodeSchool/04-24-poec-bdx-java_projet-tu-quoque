import { Component } from '@angular/core';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.scss'
})
export class ToolsComponent {
  addIcon: string = 'assets/icons/add.svg';
  closeIcon: string = 'assets/icons/close.svg';
  eraseIcon: string = 'assets/icons/erase.svg';
  minusIcon: string = 'assets/icons/minus.svg';

}

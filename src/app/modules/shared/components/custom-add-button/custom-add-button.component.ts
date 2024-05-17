import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-add-button',
  templateUrl: './custom-add-button.component.html',
  styleUrl: './custom-add-button.component.scss',
})
export class CustomAddButtonComponent {
  
  @Input()
  style!: string;
}

import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';

@Component({
  selector: 'app-input-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-error.component.html',
  styleUrl: './input-error.component.scss'
})
export class InputErrorComponent{

  @Input() 
  control!: FormControl;
}

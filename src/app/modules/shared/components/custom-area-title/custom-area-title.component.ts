import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-area-title',
  templateUrl: './custom-area-title.component.html',
  styleUrl: './custom-area-title.component.scss',
})
export class CustomAreaTitleComponent {
  
  @Input()
  title!: string;
}

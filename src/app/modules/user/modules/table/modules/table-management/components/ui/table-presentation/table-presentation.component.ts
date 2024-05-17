import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-presentation',
  templateUrl: './table-presentation.component.html',
  styleUrl: './table-presentation.component.scss',
})
export class TablePresentationComponent {
  
  @Input()
  table!: any;
}

import { Component, inject } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-info-popup',
  templateUrl: './info-popup.component.html',
  styleUrl: './info-popup.component.scss',
})
export class InfoPopupComponent {
  config = inject(DynamicDialogConfig);
  title!: any;
  eventStart!: any;
  eventEnd!: any;
  description!: any;

  ngOnInit() {
    const event = this.config.data.info.event;
    this.title = event.title;
    this.eventStart = event.start;
    this.eventEnd = event.end ? event.end : this.eventStart;
    this.description = event.extendedProps['description']
      ? event.extendedProps['description']
      : 'Aucune information communiquée';
  }
}

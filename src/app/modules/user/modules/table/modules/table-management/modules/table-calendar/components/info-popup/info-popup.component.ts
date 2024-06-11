import { Component, inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-info-popup',
  templateUrl: './info-popup.component.html',
  styleUrl: './info-popup.component.scss',
})
export class InfoPopupComponent {
  
  private config = inject(DynamicDialogConfig);
  ref = inject(DynamicDialogRef);
  public title!: any;
  public eventStart!: any;
  public eventEnd!: any;
  public description!: any;
  public event: any = this.config.data.info.event;

  ngOnInit(): void {
    const event = this.config.data.info.event;
    this.title = event.title;
    this.eventStart = event.start;
    this.eventEnd = event.end ? event.end : this.eventStart;
    this.description = event.extendedProps['description']
      ? event.extendedProps['description']
      : 'Aucune information communiquée';
  }

  deleteEvent(): void {
    this.ref.close(Number(this.event.id));
  }
}

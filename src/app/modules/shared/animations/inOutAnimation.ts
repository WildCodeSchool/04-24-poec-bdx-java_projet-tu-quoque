import { animate, style, transition, trigger } from '@angular/animations';

export const inOutAnimation = trigger('inOutAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.2s ease-out', style({ height: 300, opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('0.2s ease-in', style({ height: 0, opacity: 0 })),
  ]),
]);

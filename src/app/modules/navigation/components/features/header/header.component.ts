import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationService } from '../../../../shared/services/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title: string = "tu quoque"

  @Output()
  showSidebard: EventEmitter<boolean> = new EventEmitter();

  isHidden: boolean = false;

  constructor(private navService: NavigationService){}

  onClick() {
    this.isHidden = !this.isHidden
    this.showSidebard.emit(this.isHidden)

  }
}

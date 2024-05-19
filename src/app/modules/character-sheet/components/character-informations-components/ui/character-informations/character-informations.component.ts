import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractListenerComponent } from '../../../../shared/abstract-components/abstract-listener-component.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-character-informations',
  templateUrl: './character-informations.component.html',
  styleUrl: './character-informations.component.scss'
})
export class CharacterInformationsComponent extends AbstractListenerComponent implements OnInit {

  constructor(private destroyRef: DestroyRef) {
    super();
  }

  ngOnInit(): void {
    this.listener.sendInfos().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(data => console.log(data, "FROM CHARACTER_INFORMATIONS"));
  }
}

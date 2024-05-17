import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractListenerComponent } from '../../../../shared/abstract-components/asbtract-listener-component.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-character-informations',
  templateUrl: './character-informations.component.html',
  styleUrl: './character-informations.component.scss'
})
export class CharacterInformationsComponent extends AbstractListenerComponent implements OnInit {

  ngOnInit(): void {
    const destroyRef = inject(DestroyRef);
    this.listener.sendInfos().pipe(
      takeUntilDestroyed(destroyRef),
    ).subscribe(data => console.log(data, "FROM CHARACTER_INFORMATIONS"));
  }
}

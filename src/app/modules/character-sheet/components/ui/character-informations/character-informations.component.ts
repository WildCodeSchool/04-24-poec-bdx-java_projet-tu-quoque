import { Component, OnInit } from '@angular/core';
import { ListenPlayerActionService } from '../../../shared/services/listen-player-action.service';

@Component({
  selector: 'app-character-informations',
  templateUrl: './character-informations.component.html',
  styleUrl: './character-informations.component.scss'
})
export class CharacterInformationsComponent implements OnInit {
  constructor(private listener: ListenPlayerActionService) {

  }

  ngOnInit(): void {
    this.listener.sendInfos().subscribe(data => console.log(data, "FROM CHARACTER_INFORMATIONS"));
  }

}

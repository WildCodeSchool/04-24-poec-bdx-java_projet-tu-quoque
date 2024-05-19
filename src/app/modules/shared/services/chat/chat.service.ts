import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Chat } from '../../models/types/users/chat.type';
import { ApiRessourceService } from '../api-ressource/api-ressource.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService extends ApiRessourceService<Chat> {
  
  private readonly _BASE_URL: string = 'http://localhost:3000/chats';

  constructor(protected override _http: HttpClient) {
    super(_http);
  }

  override getRessourceUrl(): string {
    return this._BASE_URL;
  }

  getChatListByTable(tableId: number): Observable<Chat[]> {
    return this.getAll$().pipe(
      map((result: Chat[]) =>
        result.filter((chat: Chat) => Number(chat.tableId) === tableId)
      )
    );
  }

  getChatListByCharacter(characterId: number): Observable<Chat[]> {
    return this.getAll$().pipe(
      map((result: Chat[]) =>
        result.filter((chat: Chat) => Number(chat.characterId) === characterId)
      )
    );
  }
}

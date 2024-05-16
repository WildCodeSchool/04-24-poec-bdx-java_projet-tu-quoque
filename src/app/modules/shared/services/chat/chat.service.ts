import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Chat } from '../../models/types/users/chat.type';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private readonly _BASE_URL: string = "http://localhost:3000/chats"

  constructor(private _http: HttpClient) { }

  getChatList$(): Observable<Chat[]> {
    return this._http.get<Chat[]>(this._BASE_URL)
  }

  getChatListByTable(tableId: number): Observable<Chat[]> {
    return this.getChatList$()
      .pipe(
        map((result: Chat[]) => result.filter((chat: Chat) => Number(chat.table_id) === tableId))
      )
  }

  getChatListByCharacter(characterId: number): Observable<Chat[]> {
    return this.getChatList$()
      .pipe(
        map((result: Chat[]) => result.filter((chat: Chat) => Number(chat.character_id) === characterId))
      )
  }


}

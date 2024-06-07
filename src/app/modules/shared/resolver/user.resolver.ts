import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserInfos } from '../models/types/users/user-infos';
import { ConnectionService } from '../services/connection/connection.service';
import { Observable } from 'rxjs';

export const userResolver: ResolveFn<Observable<UserInfos | null>> = (route, state) => {
  const connectionService = inject(ConnectionService);
  return connectionService.personalInfo();
};
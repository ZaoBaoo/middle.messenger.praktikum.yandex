import { API } from './api.ts';
import type { PasswordChangeType, UserChangeType, UserStateType } from '../types.ts';

class UsersApi extends API {
  constructor() {
    super('/user');
  }

  async passwordChangeRequest(data: PasswordChangeType) {
    return this.http.put('/password', { data });
  }

  async avatarChangeRequest(data: FormData) {
    return this.http.put<UserStateType>('/profile/avatar', { data });
  }

  async userChangeRequest(data: UserChangeType) {
    return this.http.put('/profile', { data });
  }
}

export const usersApi = new UsersApi();

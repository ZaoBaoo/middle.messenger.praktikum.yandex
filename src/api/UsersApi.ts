import { API } from './api.ts';
import type { PasswordChangeType } from '../types.ts';

class UsersApi extends API {
  constructor() {
    super('/user');
  }

  async passwordChangeRequest(data: PasswordChangeType) {
    return this.http.put('/password', { data });
  }

  async avatarChangeRequest(data: FormData) {
    return this.http.put('/profile/avatar', { data });
  }

  // async signUp(data: SignUpType) {
  //   return this.http.post('/signup', { data });
  // }
  //
  // async signIn(data: SignInType) {
  //   return this.http.post('/signin', { data });
  // }
  //
  // async logOut() {
  //   return this.http.post('/logout');
  // }
  //
  // async getUser() {
  //   return this.http.get<UserType>('/user');
  // }
}

export const usersApi = new UsersApi();

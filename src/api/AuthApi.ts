import { API } from './api.ts';
import type { SignInType, SignUpType, UserType } from '../types.ts';

class AuthApi extends API {
  constructor() {
    super('/auth');
  }

  async signUp(data: SignUpType) {
    return this.http.post('/signup', { data });
  }

  async signIn(data: SignInType) {
    return this.http.post('/signin', { data });
  }

  async logOut() {
    return this.http.post('/logout');
  }

  async getUser() {
    return this.http.get<UserType>('/user');
  }
}

export const authApi = new AuthApi();

import { API } from './api.ts';
import type { SignInType } from '../types.ts';

export interface SignUpType {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface UserType {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
}

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

import { authApi } from '../api/AuthApi.ts';
import type { SignInType, SignUpType } from '../types.ts';

export class AuthController {
  static async fetchUser() {
    try {
      const user = await authApi.getUser();
      console.log(user);
    } catch (err) {
      throw err;
    }
  }

  static async signIn(data: SignInType) {
    try {
      await authApi.signIn(data);
    } catch (err) {
      console.log(err, 'signup get user');
    }
  }

  static async signUp(data: SignUpType) {
    try {
      await authApi.signUp(data);
    } catch (err) {
      console.log(err, 'signup get user');
    }
  }

  static async logOut() {
    try {
      await authApi.logOut();
    } catch (err) {
      console.log(err, 'logout get user');
    }
  }
}

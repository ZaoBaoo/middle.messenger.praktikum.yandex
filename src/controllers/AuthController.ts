import { authApi } from '../api/AuthApi.ts';
import type { SignInType, SignUpType } from '../types.ts';
import { router } from '../core/Router.ts';
import { Routes } from '../types.ts';
import store from '../core/Store.ts';

export class AuthController {
  static async fetchUser() {
    const user = await authApi.getUser();

    store.set('user', user);
  }

  static async signIn(data: SignInType) {
    try {
      await authApi.signIn(data);

      await this.fetchUser();

      router.go(Routes.Chatting);
    } catch (err) {
      console.log(err, 'signup get user');
    }
  }

  static async signUp(data: SignUpType) {
    try {
      await authApi.signUp(data);

      await this.fetchUser();

      router.go(Routes.Chatting);
    } catch (err) {
      console.log(err, 'signup get user');
    }
  }

  static async logOut() {
    try {
      await authApi.logOut();
      store.set('user', undefined);
      router.go(Routes.Login);
    } catch (err) {
      console.log(err, 'logout get user');
    }
  }
}

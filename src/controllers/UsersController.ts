import type { PasswordChangeType, UserChangeType } from '../types.ts';
import { usersApi } from '../api/UsersApi.ts';
import store from '../core/Store.ts';
import { router } from '../core/Router.ts';
import { ParseResponseType, Routes } from '../types.ts';
import { parseResponse } from '../utils/parseResponse.ts';
import { AuthController } from './AuthController.ts';

export class UsersController {
  static async passwordChange(data: PasswordChangeType) {
    try {
      await usersApi.passwordChangeRequest(data);

      store.set('errors.password', undefined);

      router.go(Routes.Profile);
    } catch (err) {
      store.set('errors.password', parseResponse(err as ParseResponseType));

      console.log('passwordChange', err);
    }
  }

  static async avatarChange(data: FormData) {
    try {
      const user = await usersApi.avatarChangeRequest(data);

      store.set('user.avatar', user?.avatar);
    } catch (err) {
      console.log('avatarChange', err);
    }
  }

  static async userChange(data: UserChangeType) {
    try {
      await usersApi.userChangeRequest(data);

      await AuthController.fetchUser();

      router.go(Routes.Profile);
    } catch (err) {
      console.log('userChange', err);
    }
  }
}

import type { PasswordChangeType } from '../types.ts';
import { usersApi } from '../api/UsersApi.ts';
import store from '../core/Store.ts';

export class UsersController {
  static async passwordChange(data: PasswordChangeType) {
    try {
      await usersApi.passwordChangeRequest(data);
    } catch (err) {
      console.log('passwordChange', err);
    }
  }

  static async avatarChange(data: FormData) {
    try {
      const user = await usersApi.avatarChangeRequest(data);

      store.set('user', user);
    } catch (err) {
      console.log('avatarChange', err);
    }
  }
}

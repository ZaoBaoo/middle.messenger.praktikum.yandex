import type { PasswordChangeType } from '../types.ts';
import { usersApi } from '../api/UsersApi.ts';

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
      await usersApi.avatarChangeRequest(data);
    } catch (err) {
      console.log('avatarChange', err);
    }
  }
}

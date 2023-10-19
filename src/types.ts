export enum INPUT_NAME {
  LOGIN = 'login',
  PASSWORD = 'password',
  PASSWORD_CONFIRM = 'password_confirm',
  PASSWORD_OLD = 'oldPassword',
  PASSWORD_NEW = 'newPassword',
  EMAIL = 'email',
  FIRST_NAME = 'first_name',
  SECOND_NAME = 'second_name',
  PHONE = 'phone',
}

export type FormDataResponseType = { [p: string]: FormDataEntryValue };

export interface WrapperAccountProps {
  type: string;
  label: string;
  name: string;
}

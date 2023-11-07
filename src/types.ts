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
  MESSAGE = 'message',
  DISPLAY_NAME = 'display_name',
}

export enum Routes {
  Main = '/',
  Login = '/login',
  Register = '/sign-up',
  Profile = '/profile',
  Chatting = '/chatting',
  ProfileInfoEdit = '/profile-info-edit',
  ProfilePasswordEdit = '/profile-password-edit',
  ErrorPage = '/404',
}

export type FormDataResponseType = { [p: string]: File | string };

export interface WrapperAccountProps {
  type: string;
  label: string;
  name: string;
}

export type Indexed<T = any> = {
  [key in string]: T;
};

export interface SignInType {
  login: string;
  password: string;
}

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

export interface StateType {
  user?: UserType;
}

export interface PasswordChangeType {
  oldPassword: string;
  newPassword: string;
}

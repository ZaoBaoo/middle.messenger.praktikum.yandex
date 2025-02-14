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
  POPUP_USER = 'popupUser',
  POPUP_CHAT = 'popupChat',
}

export enum Routes {
  Main = '/',
  Login = '/login',
  Register = '/sign-up',
  Profile = '/profile',
  Chatting = '/messenger',
  ProfileInfoEdit = '/settings',
  ProfilePasswordEdit = '/profile-password-edit',
  ErrorPage = '/404',
  ErrorPage505 = '/500',
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

export interface UserStateType {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
}

export interface ErrorStateType {
  password: string;
  login: string;
  signup: string;
}

export interface PopupStateType {
  chat: {
    isShow: boolean;
    type: 'add' | 'remove';
  };
}

export type AvatarUpdateType = FormData;

export interface StateType {
  user?: UserStateType;
  errors?: ErrorStateType;
  popup?: PopupStateType;
  chats?: ChatType[];
  currentChat?: [ChatType];
  webSocket?: WebSocket;
  messages?: MessageType[];
}

export interface MessageType {
  id: number;
  user_id: number;
  chat_id: number;
  type: string;
  time: string;
  content: string;
  is_read: boolean;
  file: null;
}

export interface PasswordChangeType {
  oldPassword: string;
  newPassword: string;
}

export interface UserChangeType {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface ParseResponseType {
  reason: string;
}

export interface ChatType {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  created_by: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    } | null;
    time: Date;
    content: string;
  };
}

export interface AddUsersToChatType {
  users: number[];
  chatId: number;
}

export interface DeleteUsersFromChat extends AddUsersToChatType {}

export interface ChatCreateType {
  title: string;
}

export interface ChatDeleteType {
  chatId: number;
}

export enum POPUP_TYPE {
  ADD_USER_TO_CHAT = 'addUserToChat',
  DELETE_USER_FROM_CHAT = 'deleteUserFromChat',
  CREATE_CHAT = 'createChat',
  DELETE_CHAT = 'deleteChat',
}

export interface GetTokenType {
  token: string;
}

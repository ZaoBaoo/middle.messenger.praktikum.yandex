import { API } from './api.ts';

class MessageApi extends API {
  constructor() {
    super('/chats');
  }
}

export const messageApi = new MessageApi();

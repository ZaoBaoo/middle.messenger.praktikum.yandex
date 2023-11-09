import { API } from './api.ts';
import type { ChatsType, ChatCreateType } from '../types.ts';

class ChatsApi extends API {
  constructor() {
    super('/chats');
  }

  async fetchingChatsRequest() {
    return this.http.get<ChatsType[]>('/');
  }

  async createChatRequest(data: ChatCreateType) {
    return this.http.post('/', { data });
  }
}

export const chatsApi = new ChatsApi();

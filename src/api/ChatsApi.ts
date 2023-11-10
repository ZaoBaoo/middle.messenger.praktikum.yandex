import { API } from './api.ts';
import type { ChatType, ChatCreateType, ChatDeleteType, AvatarUpdateType } from '../types.ts';

class ChatsApi extends API {
  constructor() {
    super('/chats');
  }

  async fetchingChatsRequest() {
    return this.http.get<ChatType[]>('/');
  }

  async createChatRequest(data: ChatCreateType) {
    return this.http.post('/', { data });
  }

  async deleteChatRequest(data: ChatDeleteType) {
    return this.http.delete('/', { data });
  }

  async updateAvatarChatRequest(data: AvatarUpdateType) {
    return this.http.put<ChatType>('/avatar', { data });
  }
}

export const chatsApi = new ChatsApi();

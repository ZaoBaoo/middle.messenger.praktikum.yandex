import { API } from './api.ts';
import type {
  ChatType,
  ChatCreateType,
  ChatDeleteType,
  AvatarUpdateType,
  AddUsersToChatType,
  ParseResponseType,
  DeleteUsersFromChat,
  GetTokenType,
} from '../types.ts';

class ChatsApi extends API {
  constructor() {
    super('/chats');
  }

  async fetchingChatsRequest() {
    return this.http.get<ChatType[]>('?limit=50');
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

  async addUsersToChatRequest(data: AddUsersToChatType) {
    return this.http.put<ParseResponseType>('/users', { data });
  }

  async deleteUsersFromChatRequest(data: DeleteUsersFromChat) {
    return this.http.delete<ParseResponseType>('/users', { data });
  }

  async getToken(idChat: number) {
    return this.http.post<GetTokenType>(`/token/${idChat}`);
  }
}

export const chatsApi = new ChatsApi();

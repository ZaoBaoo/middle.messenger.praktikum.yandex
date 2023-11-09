import { chatsApi } from '../api/ChatsApi.ts';
import { ChatCreateType } from '../types.ts';

export class ChatsControllers {
  static async fetchingChats() {
    try {
      const chats = await chatsApi.fetchingChatsRequest();

      console.log(chats);
    } catch (err) {
      console.log('passwordChange', err);
    }
  }

  static async createChat(data: ChatCreateType) {
    try {
      await chatsApi.createChatRequest(data);
    } catch (err) {
      console.log('passwordChange', err);
    }
  }
}

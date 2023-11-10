import { chatsApi } from '../api/ChatsApi.ts';
import { AvatarUpdateType, ChatCreateType, ChatDeleteType, ChatType } from '../types.ts';
import store from '../core/Store.ts';

export class ChatsControllers {
  static async fetchingChats() {
    try {
      const chats = await chatsApi.fetchingChatsRequest();

      store.set('chats', chats);
    } catch (err) {
      console.log('fetchingChats', err);
    }
  }

  static async createChat(data: ChatCreateType) {
    try {
      await chatsApi.createChatRequest(data);
    } catch (err) {
      console.log('createChat', err);
    }
  }

  static async deleteChat(data: ChatDeleteType) {
    try {
      await chatsApi.deleteChatRequest(data);
    } catch (err) {
      console.log('deleteChat', err);
    }
  }

  static async changeAvatarChat(data: AvatarUpdateType) {
    try {
      const updatedChat = await chatsApi.updateAvatarChatRequest(data);

      const { avatar, id } = updatedChat;

      const { chats, currentChat } = store.getState();

      store.set('currentChat', [{ ...currentChat, avatar }]);
    } catch (err) {
      console.log('changeAvatarChat', err);
    }
  }

  static currentChat(data: ChatType) {
    store.set('currentChat', data);
  }
}

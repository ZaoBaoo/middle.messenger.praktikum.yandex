import { chatsApi } from '../api/ChatsApi.ts';
import { AvatarUpdateType, ChatCreateType } from '../types.ts';
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

  static async deleteChat() {
    try {
      const { currentChat, chats } = store.getState();
      if (currentChat) {
        const { id } = currentChat[0];
        await chatsApi.deleteChatRequest({ chatId: id });
        const updatedChats = chats?.filter((chat) => chat.id !== id);
        store.set('chats', updatedChats);
        store.set('currentChat', undefined);
      }
    } catch (err) {
      console.log('deleteChat', err);
    }
  }

  static async changeAvatarChat(data: AvatarUpdateType) {
    try {
      const updatedChat = await chatsApi.updateAvatarChatRequest(data);

      const { avatar, id } = updatedChat;
      const { chats, currentChat } = store.getState();

      const updatedChats = chats?.map((chat) => (chat.id !== id ? chat : { ...chat, avatar }));

      if (updatedChats) store.set('chats', updatedChats);
      if (currentChat) store.set('currentChat', [{ ...currentChat[0], avatar }]);
    } catch (err) {
      console.log('changeAvatarChat', err);
    }
  }

  static currentChat(id: number) {
    const { chats } = store.getState();

    const targetChat = chats?.find((chat) => chat.id === id);
    store.set('currentChat', [targetChat]);
  }
}

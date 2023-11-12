import { chatsApi } from '../api/ChatsApi.ts';
import { AddUsersToChatType, AvatarUpdateType, ChatCreateType, DeleteUsersFromChat } from '../types.ts';
import store from '../core/Store.ts';
import { MessageController } from './MessageController.ts';

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
    const { chats, currentChat, webSocket } = store.getState();

    const targetChat = chats?.find((chat) => chat.id === id);

    if (!currentChat || currentChat[0].id !== targetChat?.id) {
      store.set('messages', undefined);
      store.set('currentChat', [targetChat]);
      if (webSocket) {
        webSocket.close();
        store.set('webSocket', undefined);
      }
      MessageController.OpenChatConnection(id);
    }
  }

  static async addUsersToChat(userId: number) {
    try {
      const { currentChat } = store.getState();

      if (currentChat) {
        const { id: chatId } = currentChat[0];

        const data: AddUsersToChatType = {
          users: [userId],
          chatId,
        };

        await chatsApi.addUsersToChatRequest(data);
      }
    } catch (err) {
      console.log('addUsersToChat', err);
    }
  }

  static async deleteUsersToChat(data: DeleteUsersFromChat) {
    try {
      await chatsApi.deleteUsersFromChatRequest(data);
    } catch (err) {
      console.log('deleteUsersToChat', err);
    }
  }
}

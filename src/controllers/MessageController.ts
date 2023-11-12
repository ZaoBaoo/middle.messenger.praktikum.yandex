import { chatsApi } from '../api/ChatsApi.ts';
import store from '../core/Store.ts';
import { MessageType } from '../types.ts';

export class MessageController {
  static async OpenChatConnection(chatId: number) {
    const { user } = store.getState();

    if (user) {
      const { id: userId } = user;
      const { token } = await chatsApi.getToken(chatId);

      const socket: WebSocket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);

      socket.addEventListener('open', () => {
        console.log('Соединение установлено');

        socket.send(
          JSON.stringify({
            content: '0',
            type: 'get old',
          }),
        );
      });

      socket.addEventListener('close', (event) => {
        if (event.wasClean) {
          console.log('Соединение закрыто чисто');
        } else {
          console.log('Обрыв соединения');
        }

        console.log(`Код: ${event.code} | Причина: ${event.reason}`);
      });

      socket.addEventListener('message', (event: MessageEvent) => {
        const data: MessageType | MessageType[] = JSON.parse(event.data);
        const { messages } = store.getState();

        const isDataMessageArray = Array.isArray(data);

        // Если данных о сообщениях в STORE нет
        if (!messages) {
          // Если data [сообщения] являются массивом
          if (isDataMessageArray) {
            store.set('messages', data);
          } else {
            store.set('messages', [data]);
          }
          return;
        }

        let updatedMessages;

        if (isDataMessageArray) {
          updatedMessages = [...messages, ...data];
          store.set('messages', updatedMessages);
        } else {
          updatedMessages = [...messages, data];
          store.set('messages', updatedMessages);
        }
      });

      socket.addEventListener('error', (event) => {
        console.log('Ошибка WS', event);
      });

      store.set('webSocket', socket);
    }
  }
}

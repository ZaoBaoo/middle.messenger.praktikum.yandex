import { chatsApi } from '../api/ChatsApi.ts';
import store from '../core/Store.ts';
import { MessageType } from '../types.ts';
import { messageModifier } from '../utils/messageModifier.ts';

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

        const interval = setInterval(() => {
          socket.send(JSON.stringify({ type: 'ping' }));
        }, 5000);

        socket.addEventListener('close', () => {
          clearInterval(interval);
        });
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
        const modifiedMessages = messageModifier(data, messages, userId);

        // Если данных о сообщениях в STORE нет
        store.set('messages', modifiedMessages);
      });

      socket.addEventListener('error', (event) => {
        console.log('Ошибка WS', event);
      });

      store.set('webSocket', socket);
    }
  }

  static async MoreMessages() {
    const { messages, webSocket } = store.getState();

    if (messages && webSocket) {
      const indexLastMessage = Math.max(...messages.map((message) => message.id));

      console.log(messages);

      webSocket.send(
        JSON.stringify({
          content: `${indexLastMessage}`,
          type: 'get old',
        }),
      );
    }
  }
}

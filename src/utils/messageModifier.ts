import { MessageType } from '../types.ts';
import { sortByDate } from './sortByDate.ts';
import { parseDate } from './parseDate.ts';

type MessageModifierType = (
  newMessages: MessageType | MessageType[],
  oldMessage: MessageType[] | undefined,
  userId: number,
) => MessageType[];

export const messageModifier: MessageModifierType = (newMessages, oldMessage, userId): MessageType[] => {
  // Если сообщение не является массивом, то оборачиваем его в массив
  if (!Array.isArray(newMessages)) newMessages = [newMessages];

  // Избавляемся от технических сообщений
  newMessages = newMessages.filter((message) => message.type === 'message');

  newMessages = newMessages.map((message) => {
    const { timeText, dateText } = parseDate(message.time);
    return {
      ...message,
      timeText,
      dateText,
    };
  });

  // Если в STORE есть сообщения,то объединяем старые с новыми
  if (oldMessage) newMessages = [...newMessages, ...oldMessage];

  // Сортируем по дате
  newMessages = sortByDate(newMessages);

  // Помечаем сообщения, которые написал пользователь
  newMessages = newMessages.map((message) => ({ ...message, isUserMessage: message.user_id === userId }));

  return newMessages;
};

import { MessageType } from '../types.ts';

const toDate = (str: string) => new Date(str).getTime();

export const sortByDate = (arr: MessageType[] = []): MessageType[] => {
  return arr.sort((a, b) => toDate(a.time) - toDate(b.time));
};

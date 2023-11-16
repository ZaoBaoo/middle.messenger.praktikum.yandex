import { ParseResponseType } from '../types.ts';

const dictionary: Record<string, string> = {
  'Password is incorrect': 'Неверный пароль',
};

export const parseResponse = (data: ParseResponseType): unknown => dictionary[data.reason] || 'Ошибка';

import { INPUT_NAME } from '../types.ts';

type ResultType = {
  isValid?: boolean;
  message?: string;
};

type RegExpMap = {
  [key in INPUT_NAME]: RegExp;
};

type ErrorMap = {
  [key in INPUT_NAME]: string;
};

export default class Validator {
  errors: ErrorMap = {
    [INPUT_NAME.LOGIN]: 'Некорректный логин',
    [INPUT_NAME.PASSWORD]: 'Некорректный пароль',
    [INPUT_NAME.PASSWORD_CONFIRM]: 'Некорректный пароль',
    [INPUT_NAME.EMAIL]: 'Неправильно введен e-mail',
    [INPUT_NAME.FIRST_NAME]: 'Имя некорректно',
    [INPUT_NAME.SECOND_NAME]: 'Фамилия некорректна',
    [INPUT_NAME.PHONE]: 'Телефон указан неверно',
  };

  regExp: RegExpMap = {
    [INPUT_NAME.LOGIN]:
      /^(?=.*[A-Za-z])(?!.*[\s!@#$%^&*()—_+=;:,./?\\|`~[\]{}])[A-Za-z0-9]{3,20}$/,
    [INPUT_NAME.PASSWORD]: /^(?=.*\d)(?=.*[A-Z]).{8,40}$/,
    [INPUT_NAME.PASSWORD_CONFIRM]: /^(?=.*\d)(?=.*[A-Z]).{8,40}$/,
    [INPUT_NAME.EMAIL]: /^[A-Za-z0-9_-]+@[A-Za-z]+\.[A-Za-z]+$/,
    [INPUT_NAME.FIRST_NAME]: /^[А-ЯЁA-Z][а-яёA-Za-z-]*$/,
    [INPUT_NAME.SECOND_NAME]: /^[А-ЯЁA-Z][а-яёA-Za-z-]*$/,
    [INPUT_NAME.PHONE]: /^\+?\d{10,15}$/,
  };

  isFieldValid(value: string, name: string): ResultType {
    if (!this.isTypeCorrect(name)) {
      throw Error('Используется несуществующий тип для валидации');
    }

    const result: ResultType = {};

    const targetRegExp = this.regExp[name];
    const isValid = targetRegExp.test(value);
    result.isValid = isValid;
    result.message = isValid ? '' : this.errors[name];
    return result;
  }

  isTypeCorrect(name: string): name is INPUT_NAME {
    return Object.values(INPUT_NAME).includes(name as INPUT_NAME);
  }
}

const validator = new Validator();

export { validator };

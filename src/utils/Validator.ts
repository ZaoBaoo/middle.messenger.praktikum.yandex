import { INPUT_NAME } from '../types.ts';

// type ResultType = [boolean?, string?];
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
  };

  regExp: RegExpMap = {
    [INPUT_NAME.LOGIN]:
      /^(?=.*[A-Za-z])(?!.*[\s!@#$%^&*()—_+=;:,.\/?\\|`~\[\]{}])[A-Za-z0-9]{3,20}$/,
    [INPUT_NAME.PASSWORD]: /^(?=.*\d)(?=.*[A-Z]).{8,40}$/,
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

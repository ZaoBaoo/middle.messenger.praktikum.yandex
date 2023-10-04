import './login.scss';
import Handlebars from 'handlebars';
import { tmpl } from './login.tmpl.ts';

// Components
import { Button } from '../../components/button';
import { Input } from '../../components/input/index.ts';
import { Link } from '../../components/link/index.ts';

export const Login = () => {
  const inputs = {
    inputLogin: Input({ type: 'text', label: 'Логин', name: 'login' }),
    inputPassword: Input({
      type: 'password',
      label: 'Пароль',
      name: 'password',
    }),
  };

  const combineProps = {
    ...inputs,
    button: Button({ text: 'Авторизоваться', type: 'submit' }),
    link: Link({ to: '/sign-in', text: 'Нет аккаунта?' }),
    title: 'Вход',
  };

  return Handlebars.compile(tmpl)(combineProps);
};

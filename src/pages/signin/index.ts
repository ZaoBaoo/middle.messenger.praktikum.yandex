import './sing-in.scss';
import Block from '../../core/Block.ts';

// Components
import { Input } from '../../components/input/index.ts';
import { Button } from '../../components/button/index.ts';
import { Link } from '../../components/link/index.ts';

const signInInputData = [
  { type: 'email', label: 'Почта', name: 'email' },
  { type: 'text', label: 'Логин', name: 'login' },
  { type: 'text', label: 'Имя', name: 'first_name' },
  { type: 'text', label: 'Фамилия', name: 'second_name' },
  { type: 'tel', label: 'Телефон', name: 'phone' },
  { type: 'password', label: 'Пароль', name: 'password' },
  { type: 'password', label: 'Пароль (ещё раз)', name: 'password_confirm' },
];

export class SignIn extends Block {
  constructor() {
    super('main', { title: 'Регистрация' });
  }

  init() {
    this.children.inputs = signInInputData.map((input) => new Input(input));
    this.children.button = new Button({
      type: 'button',
      text: 'Зарегистрироваться',
      events: { click: () => console.log('Зарегистрироваться') },
    });
    this.children.link = new Link({
      text: 'Войти',
      to: '/login',
    });
  }

  render() {
    return this.compile(
      `
        <section class="sign-in">
          <div class="sign-in__content">
            <div class="sign-in__block">
              <h1 class="sign-in__title">{{title}}</h1>
              <form class="sign-in__form">
                {{#each inputs}}
                    {{{this}}}
                {{/each}}
                <div class="sign-in__wrapper-button">
                  {{{button}}}
                </div>
              </form>
              <div class="sign-in__wrapper-link">
                {{{link}}}
              </div>
            </div>
          </div>
        </section>
      `,
      this.props,
    );
  }
}

// export const SignIn: SingInType = () => {
//   const inputs = {
//     inputEmail: Input({ type: 'email', label: 'Почта', name: 'email' }),
//     inputLogin: Input({ type: 'text', label: 'Логин', name: 'login' }),
//     inputFirstName: Input({ type: 'text', label: 'Имя', name: 'first_name' }),
//     inputLastName: Input({
//       type: 'text',
//       label: 'Фамилия',
//       name: 'second_name',
//     }),
//     inputPhone: Input({ type: 'tel', label: 'Телефон', name: 'phone' }),
//     inputPassword: Input({
//       type: 'password',
//       label: 'Пароль',
//       name: 'password',
//     }),
//     inputConfirmPassword: Input({
//       type: 'password',
//       label: 'Пароль',
//       name: 'password_confirm',
//     }),
//   };
//
//   const combineProps = {
//     ...inputs,
//     button: Button({ text: 'Зарегистрироваться', type: 'submit' }),
//     link: Link({ to: '/login', text: 'Войти' }),
//     title: 'Регистрация',
//   };
//
//   return Handlebars.compile(tmpl)(combineProps);
// };

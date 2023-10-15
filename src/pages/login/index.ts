import './login.scss';
import Block from '../../core/Block.ts';

// Components
import { Button } from '../../components/button/index.ts';
import { Input } from '../../components/input/index.ts';
import { Link } from '../../components/link/index.ts';

const signInInputData = [
  {
    type: 'text',
    label: 'Логин',
    name: 'login',
    events: {
      focusout: function () {
        console.log(this);
      },
    },
  },
  {
    type: 'password',
    label: 'Пароль',
    name: 'password',
    events: {
      focusout: () => {
        console.log(this);
      },
    },
  },
];

export class Login extends Block {
  constructor() {
    super('main', { title: 'Вход' });
  }

  init() {
    this.children.inputs = signInInputData.map((input) => {
      input.events.focusout = input.events.focusout.bind(this);
      return new Input(input);
    });
    this.children.button = new Button({
      type: 'button',
      text: 'Авторизоваться',
      events: { click: () => console.log('Авторизоваться') },
    });
    this.children.link = new Link({
      text: 'Нет аккаунта?',
      to: '/sign-in',
    });
  }

  render() {
    return this.compile(
      `
        <section class="login">
          <div class="login__content">
            <div class="login__block">
              <h1 class="login__title">{{title}}</h1>
              <form class="login__form">
                {{#each inputs}}
                  {{{this}}}
                {{/each}}
                {{{inputTest}}}
                <div class="login__wrapper-button">
                  {{{button}}}
                </div>
              </form>
              <div class="login__wrapper-link">
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

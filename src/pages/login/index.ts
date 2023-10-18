import './login.scss';
import Block from '../../core/Block.ts';
import { loginInputsData } from '../../data/login-inputs-data.ts';

// Components
import { Link } from '../../components/link/index.ts';
import { Form } from '../../components/form/index.ts';

export class Login extends Block {
  constructor() {
    super('main', { title: 'Вход' });
  }

  handlerAuth() {
    console.log('Запрос на api');
  }

  init() {
    this.children.link = new Link({
      text: 'Нет аккаунта?',
      to: '/sign-in',
    });
    this.children.form = new Form({
      dataInputsForRender: loginInputsData,
      buttonData: {
        type: 'submit',
        text: 'Авторизоваться',
      },
      submitCallback: this.handlerAuth,
    });
  }

  render() {
    return this.compile(
      `
        <section class="login">
          <div class="login__content">
            <div class="login__block">
              <h1 class="login__title">{{title}}</h1>
                {{{form}}}
              <div class="login__wrapper-link">
                {{{link}}}
              </div>
            </div>
          </div>
        </section>
    `,
    );
  }
}

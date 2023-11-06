import styles from './login.module.scss';
import Block from '../../core/Block.ts';
import { loginInputsData } from '../../data/login-inputs-data.ts';

// Components
import { Link } from '../../components/link/index.ts';
import { FormAccount } from '../../components/form-account/index.ts';

// Types
import { SignInType } from '../../types.ts';
import { AuthController } from '../../controllers/AuthController.ts';

export class Login extends Block {
  constructor() {
    super({ title: 'Вход' });
  }

  async handlerAuth(response: SignInType) {
    await AuthController.signIn(response);
  }

  init() {
    this.props.styles = styles;

    this.children.link = new Link({
      text: 'Нет аккаунта?',
      to: '/sign-in',
    });
    this.children.form = new FormAccount({
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
        <main class="{{styles.main}}">
          <section class="{{styles.login}}">
            <div class="{{styles.content}}">
              <div class="{{styles.block}}">
                <h1 class="{{styles.title}}">{{title}}</h1>
                  {{{form}}}
                <div class="{{styles.wrapperLink}}">
                  {{{link}}}
                </div>
              </div>
            </div>
          </section>
        </main>
      `,
    );
  }
}

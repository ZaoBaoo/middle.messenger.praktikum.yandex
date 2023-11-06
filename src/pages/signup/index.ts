import './sing-up.scss';
import Block from '../../core/Block.ts';
import { signInInputsData } from '../../data/sign-in-inputs-data.ts';

// Components
import { Link } from '../../components/link/index.ts';
import { FormAccount } from '../../components/form-account/index.ts';

// Types
import type { SignUpType } from '../../types.ts';
import { AuthController } from '../../controllers/AuthController.ts';

export class SignUp extends Block {
  constructor() {
    super({ title: 'Регистрация' });
  }

  async handlerSingIn(response: SignUpType) {
    await AuthController.signUp(response);
  }

  init() {
    this.children.link = new Link({
      text: 'Войти',
      to: '/login',
    });
    this.children.form = new FormAccount({
      dataInputsForRender: signInInputsData,
      buttonData: {
        type: 'submit',
        text: 'Зарегистрироваться',
      },
      submitCallback: this.handlerSingIn,
    });
  }

  render() {
    return this.compile(
      `
        <main>
          <section class="sign-in">
            <div class="sign-in__content">
              <div class="sign-in__block">
                <h1 class="sign-in__title">{{title}}</h1>
                {{{form}}}
                <div class="sign-in__wrapper-link">
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

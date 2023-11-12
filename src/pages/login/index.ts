import styles from './login.module.scss';
import Block from '../../core/Block.ts';
import { loginInputsData } from '../../data/login-inputs-data.ts';

// Components
import { Link } from '../../components/link/index.ts';
import { FormAccount } from '../../components/form-account/index.ts';

// Types
import { SignInType, StateType } from '../../types.ts';
import { AuthController } from '../../controllers/AuthController.ts';
import { withStore } from '../../core/Store.ts';

export class BaseLogin extends Block {
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
      to: '/sign-up',
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
                  <span class="{{styles.error}}">{{error}}</span>
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

const mapStateToProps = (state: StateType) => ({
  error: state.errors?.login,
});

export const Login = withStore(mapStateToProps)(BaseLogin);

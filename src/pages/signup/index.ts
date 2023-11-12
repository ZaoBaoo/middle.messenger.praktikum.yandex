import styles from './sing-up.module.scss';
import Block from '../../core/Block.ts';
import { signInInputsData } from '../../data/sign-in-inputs-data.ts';

// Components
import { Link } from '../../components/link/index.ts';
import { FormAccount } from '../../components/form-account/index.ts';

// Types
import type { SignUpType } from '../../types.ts';
import { AuthController } from '../../controllers/AuthController.ts';
import { StateType } from '../../types.ts';
import { withStore } from '../../core/Store.ts';

export class BaseSignUp extends Block {
  constructor() {
    super({ title: 'Регистрация' });
  }

  async handlerSingIn(response: SignUpType) {
    await AuthController.signUp(response);
  }

  init() {
    this.props.styles = styles;

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
          <section class="{{styles.signIn}}">
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
  error: state.errors?.signup,
});

export const SignUp = withStore(mapStateToProps)(BaseSignUp);

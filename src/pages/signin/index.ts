import './sing-in.scss';
import Block from '../../core/Block.ts';
import { signInInputsData } from '../../data/sign-in-inputs-data.ts';

// Components
import { Link } from '../../components/link/index.ts';
import { Form } from '../../components/form';

export class SignIn extends Block {
  constructor() {
    super('main', { title: 'Регистрация' });
  }

  init() {
    this.children.form = new Form({
      dataInputsForRender: signInInputsData,
      events: {
        submit: (e) => {
          e.preventDefault();
          console.log(e);
        },
      },
      buttonData: {
        type: 'click',
        text: 'Зарегистрироваться',
        events: {
          click: () => console.log('Зарегистрироваться'),
        },
      },
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
              {{{form}}}
              <div class="sign-in__wrapper-link">
                {{{link}}}
              </div>
            </div>
          </div>
        </section>
      `,
    );
  }
}

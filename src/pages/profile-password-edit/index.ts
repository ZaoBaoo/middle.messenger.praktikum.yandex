import styles from './profile-password-edit.module.scss';
import Block from '../../core/Block.ts';
import avatar from '../../images/placeholder-photo-icon.svg';
import arrow from '../../images/back-arrow-icon.svg';

// Components
import { FormProfile } from '../../components/form-profile/index.ts';
import { passwordEditInputs } from '../../data/password-edit-inputs.ts';
import { Link } from '../../components/link/index.ts';

// Types
import { profileInputsData } from '../../data/profile-inputs-data.ts';
import { InputWrapperProfile } from '../../components/input-wrapper-profile/index.ts';
import { FormAccount } from '../../components/form-account';
import { loginInputsData } from '../../data/login-inputs-data.ts';

export class ProfilePasswordEdit extends Block {
  constructor() {
    super('main', {});
  }

  handlerAuth() {
    console.log('Запрос в api [auth]');
  }

  init() {
    this.props.styles = styles;
    this.props.avatar = avatar;
    this.props.arrow = arrow;

    this.children.form = new FormProfile({
      dataInputsForRender: passwordEditInputs,
      buttonData: {
        type: 'submit',
        text: 'Авторизоваться',
      },
      // submitCallback: this.handlerAuth,
    });
  }

  render() {
    return this.compile(
      `
      <section class="{{styles.profile}}">
        <a class="{{styles.backLink}}" href="/">
          <div class="{{styles.back}}">
             <img class="{{styles.backIcon}}" src="{{arrow}}" alt="Вернуться назад">
          </div>
        </a>
        <div class="container">
          <div class="{{styles.content}}">
            <div class="{{styles.info}}">
              <img class="{{styles.photo}}" src="{{avatar}}" alt="Фото профиля">
              <p class="{{styles.name}}">Иван</p>
              {{{form}}}
          </div>
        </div>
      </section>
    `,
    );
  }
}

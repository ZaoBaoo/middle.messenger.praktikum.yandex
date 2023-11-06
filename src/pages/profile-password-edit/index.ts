import styles from './profile-password-edit.module.scss';
import Block from '../../core/Block.ts';
import avatar from '../../images/placeholder-photo-icon.svg';
import arrow from '../../images/back-arrow-icon.svg';
import { passwordEditInputs } from '../../data/password-edit-inputs.ts';

// Components
import { FormProfile } from '../../components/form-profile/index.ts';
import { Avatar } from '../../components/avatar/index.ts';

// Types
import { FormDataResponseType } from '../../types.ts';

export class ProfilePasswordEdit extends Block {
  constructor() {
    super({});
  }

  handlerChangesPassword(response: FormDataResponseType) {
    console.log(response);
  }

  init() {
    this.props.styles = styles;
    this.props.avatar = avatar;
    this.props.arrow = arrow;

    this.children.avatar = new Avatar({ src: avatar, isEdit: false });
    this.children.form = new FormProfile({
      dataInputsForRender: passwordEditInputs,
      buttonData: {
        type: 'submit',
        text: 'Сохранить',
      },
      submitCallback: this.handlerChangesPassword,
    });
  }

  render() {
    return this.compile(
      `
        <main>
          <section class="{{styles.profilePasswordEdit}}">
            <a class="{{styles.backLink}}" href="/">
              <div class="{{styles.back}}">
                 <img class="{{styles.backIcon}}" src="{{arrow}}" alt="Вернуться назад">
              </div>
            </a>
            <div class="container">
              <div class="{{styles.content}}">
                <div class="{{styles.info}}">
                  {{{avatar}}}
                  <p class="{{styles.name}}">Иван</p>
                  {{{form}}}
              </div>
            </div>
          </section>
        </main>
      `,
    );
  }
}

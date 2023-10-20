import styles from './profile-info-edit.module.scss';
import Block from '../../core/Block.ts';
import avatar from '../../images/placeholder-photo-icon.svg';
import arrow from '../../images/back-arrow-icon.svg';
import { profileInputsData } from '../../data/profile-inputs-data.ts';

// Components
import { FormProfile } from '../../components/form-profile/index.ts';
import { Avatar } from '../../components/avatar/index.ts';

// Types
import { FormDataResponseType } from '../../types.ts';

export class ProfileInfoEdit extends Block {
  constructor() {
    super('main', {});
  }

  handlerChangesInfoProfile(response: FormDataResponseType) {
    console.log(response);
  }

  init() {
    this.props.styles = styles;
    this.props.avatar = avatar;
    this.props.arrow = arrow;

    this.children.avatar = new Avatar({ src: avatar, isEdit: true });
    this.children.form = new FormProfile({
      dataInputsForRender: profileInputsData,
      buttonData: {
        type: 'submit',
        text: 'Сохранить',
      },
      submitCallback: this.handlerChangesInfoProfile,
    });
  }

  render() {
    return this.compile(
      `
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
    `,
    );
  }
}

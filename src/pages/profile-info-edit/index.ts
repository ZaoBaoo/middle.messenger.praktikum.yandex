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
import { UsersController } from '../../controllers/UsersController.ts';
import { AuthController } from '../../controllers/AuthController.ts';
import store from '../../core/Store.ts';

export class ProfileInfoEdit extends Block {
  constructor() {
    super({});
  }

  handlerChangesInfoProfile(response: FormDataResponseType) {
    console.log(response);
  }

  async handlerChangesAvatar(e: Event) {
    const input = e.target as HTMLInputElement;

    const formData = new FormData();

    if (input.files) {
      formData.append('avatar', input.files[0]);

      await UsersController.avatarChange(formData);
    }
  }

  init() {
    this.props.styles = styles;
    this.props.arrow = arrow;

    this.children.form = new FormProfile({
      dataInputsForRender: profileInputsData,
      buttonData: {
        type: 'submit',
        text: 'Сохранить',
      },
      submitCallback: this.handlerChangesInfoProfile,
    });
  }

  async componentDidMount() {
    const user = store.getState()!.user;

    const src = `https://ya-praktikum.tech/api/v2/resources${user.avatar}`;

    if (user) {
      this.children.avatar = new Avatar({ src, isEdit: true, events: { change: this.handlerChangesAvatar } });
    }
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

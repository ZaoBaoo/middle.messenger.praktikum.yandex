import styles from './profile-info-edit.module.scss';
import Block from '../../core/Block.ts';
// import avatar from '../../images/placeholder-photo-icon.svg';
import arrow from '../../images/back-arrow-icon.svg';
import { profileInputsData } from '../../data/profile-inputs-data.ts';

// Components
import { FormProfile } from '../../components/form-profile/index.ts';
import { Avatar } from '../../components/avatar/index.ts';

// Types
import { StateType, UserChangeType } from '../../types.ts';
import { UsersController } from '../../controllers/UsersController.ts';
import store, { withStore } from '../../core/Store.ts';

export class BaseProfileInfoEdit extends Block {
  constructor() {
    super({});
  }

  async handlerChangesInfoProfile(response: UserChangeType) {
    await UsersController.userChange(response);
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
  }

  // async componentDidMount() {
  //   await AuthController.fetchUser();
  // }

  componentDidUpdate() {
    const { user } = store.getState();

    if (user) {
      this.children.avatar = new Avatar({
        src: user?.avatar,
        isEdit: true,
        events: { change: this.handlerChangesAvatar },
        size: 'large',
      });

      const dataForRender = profileInputsData.map((inputData) => {
        const value = user[inputData.name];
        return { ...inputData, value };
      });

      this.children.form = new FormProfile({
        dataInputsForRender: dataForRender,
        buttonData: {
          type: 'submit',
          text: 'Сохранить',
        },
        submitCallback: this.handlerChangesInfoProfile,
      });
    }

    return true;
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

const mapStateToProps = (state: StateType) => ({
  user: {
    login: state.user?.login,
    phone: state.user?.phone,
    email: state.user?.email,
    avatar: state.user?.avatar,
    first_name: state.user?.first_name,
    second_name: state.user?.second_name,
    display_name: state.user?.display_name,
    id: state.user?.id,
  },
});

export const ProfileInfoEdit = withStore(mapStateToProps)(BaseProfileInfoEdit);

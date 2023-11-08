import styles from './profile-password-edit.module.scss';
import Block from '../../core/Block.ts';
import arrow from '../../images/back-arrow-icon.svg';
import { passwordEditInputs } from '../../data/password-edit-inputs.ts';

// Components
import { FormProfile } from '../../components/form-profile/index.ts';
import { Avatar } from '../../components/avatar/index.ts';

// Types
import type { PasswordChangeType } from '../../types.ts';

// Controller
import { UsersController } from '../../controllers/UsersController.ts';
import { StateType } from '../../types.ts';
import { withStore } from '../../core/Store.ts';
import { AuthController } from '../../controllers/AuthController.ts';

class BaseProfilePasswordEdit extends Block {
  constructor() {
    super({});
  }

  async handlerChangesPassword(response: PasswordChangeType) {
    await UsersController.passwordChange(response);
  }

  init() {
    this.props.styles = styles;
    this.props.arrow = arrow;

    this.children.form = new FormProfile({
      dataInputsForRender: passwordEditInputs,
      buttonData: {
        type: 'submit',
        text: 'Сохранить',
      },
      submitCallback: this.handlerChangesPassword,
    });
  }

  async componentDidMount() {
    await AuthController.fetchUser();
  }

  componentDidUpdate() {
    const { user } = this.props;

    if (user) {
      this.children.avatar = new Avatar({ src: user.avatar, isEdit: false });
      this.children.avatar.dispatchComponentDidMount();
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
    avatar: state.user?.avatar,
  },
});

export const ProfilePasswordEdit = withStore(mapStateToProps)(BaseProfilePasswordEdit);

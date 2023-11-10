import styles from './profile-password-edit.module.scss';
import Block from '../../core/Block.ts';
import arrow from '../../images/back-arrow-icon.svg';
import { passwordEditInputs } from '../../data/password-edit-inputs.ts';

// Components
import { FormProfile } from '../../components/form-profile/index.ts';
import { Avatar } from '../../components/avatar/index.ts';

// Store
import { withStore } from '../../core/Store.ts';

// Controller
import { UsersController } from '../../controllers/UsersController.ts';

// Types
import type { StateType, PasswordChangeType } from '../../types.ts';
import type { ProfilePasswordEditPropsType } from './types.ts';

class BaseProfilePasswordEdit extends Block {
  constructor(props: ProfilePasswordEditPropsType) {
    super(props);
  }

  async handlerChangesPassword(response: PasswordChangeType) {
    await UsersController.passwordChange(response);
  }

  init() {
    this.props.styles = styles;
    this.props.arrow = arrow;

    this.children.avatar = new Avatar({ src: this.props.avatar, isEdit: false, size: 'large' });
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

const mapStateToProps = (state: StateType) => ({
  avatar: state.user?.avatar,
});

export const ProfilePasswordEdit = withStore(mapStateToProps)(BaseProfilePasswordEdit);

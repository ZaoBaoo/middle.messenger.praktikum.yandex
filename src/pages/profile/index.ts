import styles from './profile.module.scss';
import Block from '../../core/Block.ts';
import { profileInputsData } from '../../data/profile-inputs-data.ts';
import { AuthController } from '../../controllers/AuthController.ts';

// Components
import { Link } from '../../components/link/index.ts';
import { Avatar } from '../../components/avatar/index.ts';
import { InputWrapperProfile } from '../../components/input-wrapper-profile/index.ts';
import { Button } from '../../components/button/index.ts';
import { LinkArrow } from '../../components/link-arrow/index.ts';

// Types
import { StateType, UserStateType } from '../../types.ts';

// Store
import { withStore } from '../../core/Store.ts';

class BaseProfile extends Block {
  constructor(props: UserStateType) {
    super(props);
  }

  init() {
    this.props.styles = styles;
    this.children.inputs = [];

    this.children.buttonLogOut = new Button({
      type: 'button',
      text: 'Выйти',
      events: { click: AuthController.logOut },
      view: 'logout',
    });
    this.children.linkEditInfo = new Link({
      to: '/settings',
      text: 'Изменить данные',
    });
    this.children.linkEditPassword = new Link({
      to: '/profile-password-edit',
      text: 'Изменить пароль',
    });
    const dataForRender = profileInputsData.map((inputData) => {
      const value = this.props.user[inputData.name];
      return { ...inputData, value };
    });
    this.children.avatar = new Avatar({ src: this.props.user.avatar, isEdit: false, size: 'large' });
    this.children.inputs = dataForRender.map((input) => new InputWrapperProfile({ ...input, disabled: true }));
    this.children.linkArrow = new LinkArrow({ to: '/messenger' });
  }

  render() {
    return this.compile(
      `
        <main>
          <section class="{{styles.profile}}">
            {{{linkArrow}}}
            <div class="container">
              <div class="{{styles.content}}">
                <div class="{{styles.info}}">
                  {{{avatar}}}
                  <p class="{{styles.name}}">Иван</p>
            
                  <div class="{{styles.rows}}">
                    {{#each inputs}}
                      {{{this}}}
                    {{/each}}
                  </div>
                  
                  <div class="{{styles.wrapperControl}}">
                    <div class="{{styles.wrapperLink}}">
                      {{{linkEditInfo}}}
                    </div>
                    <div class="{{styles.wrapperLink}}">
                      {{{linkEditPassword}}}
                    </div>
                    {{{buttonLogOut}}}
                   </div>
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
  user: state.user,
});

export const Profile = withStore(mapStateToProps)(BaseProfile);

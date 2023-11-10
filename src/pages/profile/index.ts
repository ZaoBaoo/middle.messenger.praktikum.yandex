import styles from './profile.module.scss';
import Block from '../../core/Block.ts';
// import avatar from '../../images/placeholder-photo-icon.svg';
import arrow from '../../images/back-arrow-icon.svg';
import { profileInputsData } from '../../data/profile-inputs-data.ts';
import { AuthController } from '../../controllers/AuthController.ts';

// Components
import { Link } from '../../components/link/index.ts';
import { Avatar } from '../../components/avatar/index.ts';
import { InputWrapperProfile } from '../../components/input-wrapper-profile/index.ts';
import { Button } from '../../components/button/index.ts';
import { StateType, UserStateType } from '../../types.ts';

// Store
import { withStore } from '../../core/Store.ts';

class BaseProfile extends Block {
  constructor(props: UserStateType) {
    super(props);
  }

  init() {
    this.props.styles = styles;
    this.props.arrow = arrow;
    this.children.inputs = [];

    this.children.buttonLogOut = new Button({
      type: 'button',
      text: 'Выйти',
      events: { click: AuthController.logOut },
      view: 'logout',
    });
    this.children.linkEditInfo = new Link({
      to: '/profile-info-edit',
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
  }

  // async componentDidMount() {
  //   await AuthController.fetchUser();
  // }

  // componentDidUpdate() {
  //   const { user } = this.props;
  //
  //   if (user) {
  //     const dataForRender = profileInputsData.map((inputData) => {
  //       const value = user[inputData.name];
  //
  //       return {
  //         ...inputData,
  //         value,
  //       };
  //     });
  //
  //     console.log(this.props);
  //
  //     this.children.avatar = new Avatar({ src: user.avatar, isEdit: false, size: 'large' });
  //     this.children.inputs = dataForRender.map((input) => new InputWrapperProfile({ ...input, disabled: true }));
  //     this.children.avatar.dispatchComponentDidMount();
  //     this.children.inputs.forEach((input) => input.dispatchComponentDidMount());
  //   }
  //
  //   return true;
  // }

  render() {
    return this.compile(
      `
        <main>
          <section class="{{styles.profile}}">
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

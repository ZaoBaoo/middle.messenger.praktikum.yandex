import styles from './profile.module.scss';
import Block from '../../core/Block.ts';
import avatar from '../../images/placeholder-photo-icon.svg';
import arrow from '../../images/back-arrow-icon.svg';
import { profileInputsData } from '../../data/profile-inputs-data.ts';

// Components
import { Link } from '../../components/link/index.ts';
import { Avatar } from '../../components/avatar/index.ts';
import { InputWrapperProfile } from '../../components/input-wrapper-profile/index.ts';

export class Profile extends Block {
  constructor() {
    super('main', {});
  }

  init() {
    this.props.styles = styles;
    this.props.avatar = avatar;
    this.props.arrow = arrow;

    this.children.avatar = new Avatar({ src: avatar, isEdit: false });
    this.children.inputs = profileInputsData.map(
      (input) => new InputWrapperProfile({ ...input, disabled: true }),
    );
    this.children.linkEditInfo = new Link({
      to: '/profile-info-edit',
      text: 'Изменить данные',
    });
    this.children.linkEditPassword = new Link({
      to: '/profile-password-edit',
      text: 'Изменить пароль',
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
                <button class="{{styles.button}}">Выйти</button>
               </div>
            </div>
          </div>
        </div>
      </section>
    `,
    );
  }
}

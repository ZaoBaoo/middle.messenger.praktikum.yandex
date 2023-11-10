import styles from './chat-settings.module.scss';
import Block from '../../core/Block.ts';
import store from '../../core/Store.ts';

export class ChatSettings extends Block {
  constructor() {
    super({});
  }

  handlerClick(e: Event) {
    const button = e.target as HTMLElement;

    const attribute = button.getAttribute('data-button');

    if (attribute === 'control') {
      if (this.props.isModalShow) {
        this.props.isModalShow = false;
      } else {
        this.props.isModalShow = true;
      }
      return;
    }

    if (attribute === 'addUser') {
      this.props.isModalShow = false;
      store.set('popup.chat', { isShow: true, type: 'addUser' });
    }

    if (attribute === 'removeUser') {
      this.props.isModalShow = false;
      store.set('popup.chat', { isShow: true, type: 'removeUser' });
    }

    if (attribute === 'removeChat') {
      this.props.isModalShow = false;
      store.set('popup.chat', { isShow: true, type: 'removeChat' });
    }
  }

  init() {
    this.props.styles = styles;
    this.props.events = {
      click: this.handlerClick.bind(this),
    };
    this.props.isModalShow = false;
  }

  render() {
    return this.compile(
      `
        <div class="{{styles.settingsWrapper}}">
          <button class="{{styles.button}}" data-button="control"></button>
          {{#if isModalShow}}
            <div class="{{styles.modal}}">
              <button class="{{styles.setting}} {{styles.settingAddUser}}" data-button="addUser">
                Добавить пользователя
              </button>
              <button class="{{styles.setting}} {{styles.settingRemoveUser}}" data-button="removeUser">
                Удалить пользователя
              </button> 
              <button class="{{styles.setting}} {{styles.settingRemoveChat}}" data-button="removeChat">
                Удалить чат
              </button> 
            </div>
          {{/if}}
        </div>
      `,
    );
  }
}

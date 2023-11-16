import styles from './chat-settings.module.scss';
import Block from '../../core/Block.ts';
import store from '../../core/Store.ts';
import { ChatsControllers } from '../../controllers/ChatsControllers.ts';
import { POPUP_TYPE } from '../../types.ts';

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

    if (attribute === POPUP_TYPE.ADD_USER_TO_CHAT) {
      this.props.isModalShow = false;
      store.set('popup.chat', { isShow: true, type: POPUP_TYPE.ADD_USER_TO_CHAT });
    }

    if (attribute === POPUP_TYPE.DELETE_USER_FROM_CHAT) {
      this.props.isModalShow = false;
      store.set('popup.chat', { isShow: true, type: POPUP_TYPE.DELETE_USER_FROM_CHAT });
    }

    if (attribute === POPUP_TYPE.DELETE_CHAT) {
      this.props.isModalShow = false;
      ChatsControllers.deleteChat();
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
              <button class="{{styles.setting}} {{styles.settingAddUser}}" data-button="addUserToChat">
                Добавить пользователя
              </button>
              <button class="{{styles.setting}} {{styles.settingRemoveUser}}" data-button="deleteUserFromChat">
                Удалить пользователя
              </button> 
              <button class="{{styles.setting}} {{styles.settingRemoveChat}}" data-button="deleteChat">
                Удалить чат
              </button> 
            </div>
          {{/if}}
        </div>
      `,
    );
  }
}

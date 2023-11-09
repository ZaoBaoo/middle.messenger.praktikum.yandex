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

    if (attribute === 'add') {
      this.props.isModalShow = false;
      store.set('popup.chat', { isShow: true, type: 'addUser' });
    }

    if (attribute === 'remove') {
      this.props.isModalShow = false;
      store.set('popup.chat', { isShow: true, type: 'removeUser' });
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
              <button class="{{styles.setting}} {{styles.setting_add}}" data-button="add">
                Добавить пользователя
              </button>
              <button class="{{styles.setting}} {{styles.setting_remove}}" data-button="remove">
                Удалить пользователя
              </button> 
            </div>
          {{/if}}
        </div>
      `,
    );
  }
}

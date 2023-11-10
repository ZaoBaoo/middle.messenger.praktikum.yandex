import styles from './popup-chat.module.scss';
import Block from '../../core/Block.ts';
import store from '../../core/Store.ts';
import { ChatSettingsType, PopupOptionsType } from './types.ts';
import { FormChat } from '../form-chat/index.ts';
import { ChatsControllers } from '../../controllers/ChatsControllers.ts';

export const popupOptions: PopupOptionsType = {
  addUser: {
    title: 'Добавить пользователя',
    textButton: 'Добавить',
    name: 'popupUser',
    label: 'Логин',
  },
  removeUser: {
    title: 'Удалить пользователя',
    textButton: 'Удалить',
    name: 'popupUser',
    label: 'Логин',
  },
  addChat: {
    title: 'Создать чат',
    textButton: 'Создать',
    name: 'popupChat',
    label: 'Название чата',
  },
  removeChat: {
    title: 'Удалить чат',
    textButton: 'Удалить',
    name: 'popupChat',
    label: 'Название чата',
  },
};

export class PopupChat extends Block {
  constructor(props: ChatSettingsType) {
    super(props);
  }

  handlerPopupClose(e: Event) {
    const target = e.target as HTMLElement;

    const isButtonClose = target.classList.contains(styles.close);
    const isOverlayClose = target.classList.contains(styles.overlay);

    if (isButtonClose || isOverlayClose) {
      store.set('popup.chat', undefined);
    }
  }

  async handlerSuccessfulAction(type: string, title: string) {
    console.log(type, title);

    switch (this.props.type) {
      case 'addChat':
        await ChatsControllers.createChat({ title });
        await ChatsControllers.fetchingChats();
        break;
      case 'removeChat':
        await ChatsControllers.deleteChat({ chatId: 33477 });
        await ChatsControllers.fetchingChats();
        break;
      default:
        break;
    }
  }

  init() {
    this.props.styles = styles;

    const { type } = this.props;
    const { title, textButton, name, label } = popupOptions[type];

    this.props.title = title;
    this.props.events = {
      click: this.handlerPopupClose,
    };
    this.children.form = new FormChat({
      textButton,
      name,
      label,
      type,
      callback: this.handlerSuccessfulAction.bind(this),
    });
  }

  render() {
    return this.compile(
      `
        <section class="{{styles.popup}}" id="popup">
          <div class="{{styles.overlay}}"></div>
            <div class="{{styles.content}}">
              <button class="{{styles.close}}"></button>
              <div class="{{styles.wrapper}}">
                <h3 class="{{styles.title}}">{{title}}</h3>
                {{{form}}}
              </div>
            </div>
        </section>
      `,
    );
  }
}

import styles from './popup-chat.module.scss';
import Block from '../../core/Block.ts';
import store from '../../core/Store.ts';
import { ChatSettingsType, PopupOptionsType } from './types.ts';
import { FormChat } from '../form-chat/index.ts';
import { ChatsControllers } from '../../controllers/ChatsControllers.ts';
import { POPUP_TYPE } from '../../types.ts';

export const popupOptions: PopupOptionsType = {
  [POPUP_TYPE.ADD_USER_TO_CHAT]: {
    title: 'Добавить пользователя',
    textButton: 'Добавить',
    name: 'popupUser',
    label: 'ID пользователя',
  },
  [POPUP_TYPE.DELETE_USER_FROM_CHAT]: {
    title: 'Удалить пользователя',
    textButton: 'Удалить',
    name: 'popupUser',
    label: 'ID пользователя',
  },
  [POPUP_TYPE.CREATE_CHAT]: {
    title: 'Создать чат',
    textButton: 'Создать',
    name: 'popupChat',
    label: 'Название чата',
  },
  [POPUP_TYPE.DELETE_CHAT]: {
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

  async handlerSuccessfulAction(value: string) {
    switch (this.props.type) {
      case POPUP_TYPE.CREATE_CHAT:
        await ChatsControllers.createChat({ title: value });
        await ChatsControllers.fetchingChats();
        break;
      case POPUP_TYPE.DELETE_CHAT:
        await ChatsControllers.deleteChat();
        await ChatsControllers.fetchingChats();
        break;
      case POPUP_TYPE.ADD_USER_TO_CHAT:
        await ChatsControllers.addUsersToChat(Number(value));
        break;
      case POPUP_TYPE.DELETE_USER_FROM_CHAT:
        await ChatsControllers.deleteUsersToChat(Number(value));
        break;
      default:
        break;
    }

    store.set('popup.chat', undefined);
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

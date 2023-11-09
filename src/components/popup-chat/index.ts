import styles from './popup-chat.module.scss';
import Block from '../../core/Block.ts';
import store from '../../core/Store.ts';
import { ChatSettingsType, PopupOptionsType } from './types.ts';
import { Button } from '../button/index.ts';
import { InputWrapperAccount } from '../input-wrapper-account/index.ts';
import { FormChat } from '../form-chat/index.ts';

export const popupOptions: PopupOptionsType = {
  addUser: {
    title: 'Добавить пользователя',
    textButton: 'Добавить',
    name: 'popupUserChat',
  },
  removeUser: {
    title: 'Удалить пользователя',
    textButton: 'Удалить',
    name: 'popupUserChat',
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

  init() {
    this.props.styles = styles;

    const { type } = this.props;
    const { title, textButton, name } = popupOptions[type];

    this.props.title = title;
    this.props.events = {
      click: this.handlerPopupClose,
    };
    this.children.form = new FormChat({ textButton, name });
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

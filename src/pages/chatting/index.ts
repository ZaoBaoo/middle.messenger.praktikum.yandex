import styles from './chatting.module.module.scss';
import Block from '../../core/Block.ts';

// Components
import { ChatsInner } from '../../components/chats-inner/index.ts';
import { PopupChat } from '../../components/popup-chat/index.ts';
import { Button } from '../../components/button/index.ts';
import { ChatsControllers } from '../../controllers/ChatsControllers.ts';

// Store
import store, { withStore } from '../../core/Store.ts';

// Type
import type { StateType } from '../../types.ts';
import { DialogWindow } from '../../components/dialog-window/index.ts';
import { POPUP_TYPE } from '../../types.ts';

export class BaseChatting extends Block {
  constructor() {
    super({});
  }

  handlerOpenPopup() {
    store.set('popup.chat', { isShow: true, type: POPUP_TYPE.CREATE_CHAT });
  }

  init() {
    this.props.styles = styles;

    this.children.buttonAddChat = new Button({
      type: 'button',
      text: 'Добавить чат',
      view: 'addChat',
      events: { click: this.handlerOpenPopup },
    });
    this.children.dialogWindow = new DialogWindow({});
  }

  async componentDidMount() {
    await ChatsControllers.fetchingChats();
  }

  componentDidUpdate() {
    const { popupData, chats } = this.props;

    if (popupData) {
      this.children.popup = new PopupChat({ type: popupData.type });
    }

    if (chats) {
      this.children.chatsInner = new ChatsInner({ chats });
    }

    return true;
  }

  render() {
    return this.compile(
      `
        <main>
          <section class="{{styles.chatting}}">
            <div class="{{styles.content}}">
              <aside class="{{styles.aside}}">
                <div class="{{styles.asideHeader}}">
                  <div class="{{styles.asideProfile}}">
                    {{{buttonAddChat}}}
                    <a href="/profile">
                      <p class="{{styles.asideProfileText}}">Профиль</p>
                    </a>
                  </div>
                  <input class="{{styles.search}}" type="text" placeholder="Поиск" />
                </div>
                {{{chatsInner}}}
              </aside>
              {{#if currentChat}}
                {{{dialogWindow}}}
              {{/if}}
            </div>
          </section>
          {{#if popupData.isShow}}
            {{{popup}}}
          {{/if}}
        </main>
      `,
    );
  }
}

const mapStateToProps = (state: StateType) => ({
  popupData: state.popup?.chat,
  chats: state.chats,
  currentChat: state.currentChat?.[0],
});

export const Chatting = withStore(mapStateToProps)(BaseChatting);

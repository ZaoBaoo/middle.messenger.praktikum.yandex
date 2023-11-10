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

export class BaseChatting extends Block {
  constructor(props) {
    super(props);
  }

  handlerOpenPopup() {
    store.set('popup.chat', { isShow: true, type: 'addChat' });
  }

  init() {
    this.props.styles = styles;

    this.children.buttonAddChat = new Button({
      type: 'button',
      text: 'Добавить чат',
      view: 'addChat',
      events: { click: this.handlerOpenPopup },
    });
  }

  async componentDidMount() {
    await ChatsControllers.fetchingChats();
  }

  componentDidUpdate() {
    const { popupData, chats, currentChat } = this.props;

    if (popupData) {
      this.children.popup = new PopupChat({ type: popupData.type });
    }

    if (chats) {
      this.children.chatsInner = new ChatsInner({ chats });
    }

    if (currentChat) {
      console.log('currentChat');
      this.children.dialogWindow = new DialogWindow({ currentChat });
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
              
              {{{dialogWindow}}}
       
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
  currentChat: state.currentChat,
});

export const Chatting = withStore(mapStateToProps)(BaseChatting);

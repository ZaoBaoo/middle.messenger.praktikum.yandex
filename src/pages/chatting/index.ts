import styles from './chatting.module.module.scss';
import Block from '../../core/Block.ts';
import avatar from '../../images/placeholder-photo-icon.svg';

// Components
import { InputControlDialog } from '../../components/input-control-dialog/index.ts';
import { ChatsInner } from '../../components/chats-inner/index.ts';
import { MessageInner } from '../../components/message-inner/index.ts';
import { ChatSettings } from '../../components/chat-settings/index.ts';
import { StateType } from '../../types.ts';
import { withStore } from '../../core/Store.ts';
import { PopupChat } from '../../components/popup-chat/index.ts';

export class BaseChatting extends Block {
  constructor() {
    super({});
  }

  init() {
    this.props.styles = styles;
    this.props.avatar = avatar;

    this.children.dialogControl = new InputControlDialog();
    this.children.chatsInner = new ChatsInner();
    this.children.messageInner = new MessageInner();
    this.children.chatSettings = new ChatSettings();
    // this.children.popup = new PopupChat();
  }

  componentDidUpdate() {
    const { popupData } = this.props;

    if (popupData) {
      this.children.popup = new PopupChat({ type: popupData.type });
    }

    return true;
  }

  render() {
    console.log('CHATTING', this.props);
    return this.compile(
      `
        <main>
          <section class="{{styles.chatting}}">
            <div class="{{styles.content}}">
              <aside class="{{styles.aside}}">
                <div class="{{styles.asideHeader}}">
                  <div class="{{styles.asideProfile}}">
                    <a href="/profile">
                      <p class="{{styles.asideProfileText}}">Профиль</p>
                    </a>
                  </div>
                  <input class="{{styles.search}}" type="text" placeholder="Поиск" />
                </div>
        
                {{{chatsInner}}}
              </aside>
        
              <div class="{{styles.dialogWindow}}">
                <div class="{{styles.dialogHeader}}">
                  <div class="{{styles.dialogUserInfo}}">
                    <img class="{{styles.dialogUserAvatar}}" src="{{avatar}}" alt="Аватар" />
                    <p class="{{styles.dialogUserName}}">Вадим</p>
                  </div>
                  {{{chatSettings}}}
                </div>
                {{{messageInner}}}
                {{{dialogControl}}}
              </div>
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
});

export const Chatting = withStore(mapStateToProps)(BaseChatting);

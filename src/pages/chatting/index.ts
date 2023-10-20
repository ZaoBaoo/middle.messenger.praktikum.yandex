import styles from './chatting.module.module.scss';
import Block from '../../core/Block.ts';
import avatar from '../../images/placeholder-photo-icon.svg';

// Components
import { InputControlDialog } from '../../components/input-control-dialog/index.ts';
import { ChatsInner } from '../../components/chats-inner/index.ts';
import { MessageInner } from '../../components/message-inner/index.ts';

export class Chatting extends Block {
  constructor() {
    super('main', {});
  }

  init() {
    this.props.styles = styles;
    this.props.avatar = avatar;

    this.children.dialogControl = new InputControlDialog();
    this.children.chatsInner = new ChatsInner();
    this.children.messageInner = new MessageInner();
  }

  render() {
    return this.compile(
      `
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
                <button class="{{styles.dialogMoreButton}}"></button>
              </div>
              {{{messageInner}}}
              {{{dialogControl}}}
            </div>
          </div>
        </section>
      `,
    );
  }
}

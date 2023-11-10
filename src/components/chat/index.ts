import styles from './chat.module.scss';
import Block from '../../core/Block.ts';

// Type
import { ChatsControllers } from '../../controllers/ChatsControllers.ts';
import { Avatar } from '../avatar/index.ts';
import { ChatPropsType } from './types.ts';

export class Chat extends Block {
  constructor(props: ChatPropsType) {
    super(props);
  }

  init() {
    this.props.styles = styles;
    this.props.events = {
      click: () => ChatsControllers.currentChat(this.props.chat),
    };
    this.children.avatar = new Avatar({ src: this.props.chat.avatar, isEdit: false, size: 'medium' });
  }

  render() {
    return this.compile(
      `
        <li class="{{styles.chat}}">
          {{{avatar}}}
          <div class="{{styles.chatPreview}}">
            <p class="{{styles.chatTitle}}">{{title}}</p>
            <p class="{{styles.chatMessage}}">{{message}}</p>
          </div>
          <div class="{{styles.chatInfo}}">
            <time class="{{styles.chatTime}}">{{time}}</time>
            <div class="{{styles.chatCountMessage}}">{{countMessage}}</div>
          </div>
        </li>
      `,
    );
  }
}

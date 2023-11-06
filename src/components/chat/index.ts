import styles from './chat.module.scss';
import Block from '../../core/Block.ts';

// Type
import type { PropsType } from './types.ts';

export class Chat extends Block {
  constructor(props: PropsType) {
    super(props);
  }

  init() {
    this.props.styles = styles;
  }

  render() {
    return this.compile(
      `
        <li class="{{styles.chat}}">
          <img
            class="{{styles.chatAvatar}}"
            src="{{srcImage}}"
            alt="Аватар"
            width="47"
            height="47"
          />
          <div class="{{styles.chatPreview}}">
            <p class="{{styles.chatName}}">{{name}}</p>
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

import styles from './message.module.scss';
import Block from '../../core/Block.ts';

// Types
import type { MessageType } from '../../types.ts';

export class Message extends Block {
  constructor(props: MessageType) {
    super(props);
  }

  init() {
    this.props.styles = styles;
    this.props.position = this.props.isUserMessage ? styles.messageUser : styles.messagesOthers;
    this.props.color = this.props.isUserMessage ? styles.blue : styles.gray;
  }

  render() {
    return this.compile(
      `
        <li class="{{styles.message}} {{position}}">
          <div class="{{styles.wrapper}}">
            {{content}}
            <span class="{{styles.time}} {{color}}" title="{{dateText}}">{{timeText}}</span>
          </div>
        </li>
      `,
    );
  }
}

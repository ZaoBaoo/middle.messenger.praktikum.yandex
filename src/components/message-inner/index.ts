import styles from './message-inner.module.scss';
import Block from '../../core/Block.ts';

// Components
import { Message } from '../message/index.ts';
import { MessageType, StateType } from '../../types.ts';
import { withStore } from '../../core/Store.ts';
import { MessageController } from '../../controllers/MessageController.ts';

export class BaseMessageInner extends Block {
  constructor() {
    super({});
  }

  init() {
    this.props.styles = styles;

    this.props.events = {
      scroll: (e: Event) => {
        const element = e.target as HTMLElement;
        if (element.scrollTop === 0) {
          MessageController.MoreMessages();
        }
      },
    };
  }

  componentDidUpdate() {
    const { messages } = this.props;

    if (messages) {
      this.children.messagesData = messages.map((message: MessageType) => new Message(message));

      setTimeout(() => {
        this.element!.scrollTop = this.element!.scrollHeight;
      }, 0);
    }

    return true;
  }

  render() {
    return this.compile(
      `
        <ul class="{{styles.messageInner}}">
          {{#each messagesData}}
            {{{this}}}
          {{/each}}
        </ul>
      `,
    );
  }
}

const mapStateToProps = (state: StateType) => ({
  messages: state.messages,
});

export const MessageInner = withStore(mapStateToProps)(BaseMessageInner);

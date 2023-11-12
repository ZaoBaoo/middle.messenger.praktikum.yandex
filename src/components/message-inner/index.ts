import styles from './message-inner.module.scss';
import Block from '../../core/Block.ts';
import { messagesData } from '../../data/messages-data.ts';

// Components
import { Message } from '../message/index.ts';
import { StateType } from '../../types.ts';
import { withStore } from '../../core/Store.ts';

export class BaseMessageInner extends Block {
  constructor() {
    super({});
  }

  init() {
    this.props.styles = styles;
    this.children.messages = messagesData.map((data) => new Message(data));

    const { user } = this.props;
    console.log('СООБЩЕНИЯ В КОМПОНЕНТЕ ДЛЯ ОТРИСОВКИ: ', user);
  }

  componentDidUpdate() {
    const { messages } = this.props;

    if (messages) {
      console.log('СООБЩЕНИЯ В КОМПОНЕНТЕ ДЛЯ ОТРИСОВКИ: ', messages);
    }

    return true;
  }

  render() {
    return this.compile(
      `
        <ul class="{{styles.messageInner}}">
          {{#each messages}}
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

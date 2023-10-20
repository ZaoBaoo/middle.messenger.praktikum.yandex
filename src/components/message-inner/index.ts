import styles from './message-inner.module.scss';
import Block from '../../core/Block.ts';
import { messagesData } from '../../data/messages-data.ts';

// Components
import { Message } from '../message/index.ts';

export class MessageInner extends Block {
  constructor() {
    super('ul', {});
  }

  init() {
    this.addClass(styles.messageInner);

    this.children.messages = messagesData.map((data) => new Message(data));
  }

  render() {
    return this.compile(
      `
        {{#each messages}}
          {{{this}}}
        {{/each}}
      `,
    );
  }
}

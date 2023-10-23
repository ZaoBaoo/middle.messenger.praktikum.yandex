import styles from './chats-inner.module.scss';
import Block from '../../core/Block.ts';
import { chatsData } from '../../data/chats-data.ts';

// Components
import { Chat } from '../chat/index.ts';

export class ChatsInner extends Block {
  constructor() {
    super('ul', {});
  }

  init() {
    this.addClass(styles.chats);

    this.children.chats = chatsData.map((data) => new Chat(data));
  }

  render() {
    return this.compile(
      `
        {{#each chats}}
          {{{this}}}
        {{/each}}
      `,
    );
  }
}

import styles from './chats-inner.module.scss';
import Block from '../../core/Block.ts';

// Components
import { Chat } from '../chat/index.ts';

// Store
import { ChatsInnerPropsType } from './types.ts';
import { ChatType } from '../../types.ts';

export class ChatsInner extends Block {
  constructor(props: ChatsInnerPropsType) {
    super(props);
  }

  init() {
    this.props.styles = styles;
    const { chats } = this.props;

    this.children.chats = chats.map((data: ChatType) => new Chat(data));
  }

  render() {
    return this.compile(
      `
        <ul class="{{styles.chats}}">
          {{#each chats}}
            {{{this}}}
          {{/each}}
        </ul>
      `,
    );
  }
}

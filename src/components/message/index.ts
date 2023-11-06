import styles from './message.module.scss';
import Block from '../../core/Block.ts';

// Types
import type { PropsType } from './types.ts';

export class Message extends Block {
  constructor(props: PropsType) {
    super(props);
  }

  init() {
    this.props.styles = styles;
  }

  render() {
    return this.compile(
      `
        <li class="{{styles.message}}">
          {{{content}}}
        </li>
      `,
    );
  }
}

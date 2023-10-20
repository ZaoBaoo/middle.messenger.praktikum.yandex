import styles from './message.module.scss';
import Block from '../../core/Block.ts';

// Types
import type { PropsType } from './types.ts';

export class Message extends Block {
  constructor(props: PropsType) {
    super('li', props);
  }

  init() {
    this.addClass(styles.message);
  }

  render() {
    return this.compile(
      `
        {{{content}}}
      `,
    );
  }
}

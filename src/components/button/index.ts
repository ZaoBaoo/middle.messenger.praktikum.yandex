import styles from './button.module.scss';
import Block from '../../core/Block.ts';

// Types
import { ButtonType } from './types.ts';

export class Button extends Block {
  constructor(props: ButtonType) {
    super('button', props);
  }

  init() {
    if (this.props.view === 'logout') {
      this.addClass(styles.buttonLogOut);
    } else {
      this.addClass(styles.button);
    }

    const element = this.element as HTMLInputElement;

    element!.type = this.props.type;
  }

  render() {
    return this.compile(`{{text}}`);
  }
}

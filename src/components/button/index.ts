import styles from './button.module.scss';
import Block from '../../core/Block.ts';

// Types
import { ButtonType } from './types.ts';

export class Button extends Block {
  constructor(props: ButtonType) {
    super(props);
  }

  // componentDidMount() {
  //   if (this.props.view === 'logout') {
  //     this.element?.classList.add(styles.buttonLogOut);
  //   } else {

  // }

  protected afterRender() {
    if (this.props.view === 'logout') {
      this.element?.classList.add(styles.buttonLogOut);
    } else {
      this.element?.classList.add(styles.button);
    }
  }

  render() {
    return this.compile(
      `
        <button>
          {{text}}
        </button>
      `,
    );
  }
}

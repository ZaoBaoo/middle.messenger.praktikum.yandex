import styles from './main.module.scss';
import Block from '../../core/Block.ts';

// Layouts
import { Navbar } from '../../layouts/navbar/index.ts';

export class Main extends Block {
  constructor() {
    super({});
  }

  init() {
    this.props.styles = styles;
    this.children.navbar = new Navbar();
  }

  render() {
    return this.compile(
      `
        <main class="{{styles.main}}">
          {{{ navbar }}}
        </main>
      `,
    );
  }
}

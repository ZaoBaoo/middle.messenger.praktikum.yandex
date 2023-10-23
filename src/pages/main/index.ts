import styles from './main.module.scss';
import Block from '../../core/Block.ts';

// Layouts
import { Navbar } from '../../layouts/navbar/index.ts';

export class Main extends Block {
  constructor() {
    super('main', {});
  }

  init() {
    this.addClass(styles.main);

    this.children.navbar = new Navbar();
  }

  render() {
    return this.compile(
      `
        {{{ navbar }}}
      `,
    );
  }
}

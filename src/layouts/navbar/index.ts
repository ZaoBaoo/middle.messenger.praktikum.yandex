import styles from './navbar.module.scss';
import { linksData } from '../../data/links-data.ts';

// Components
import { Link } from '../../components/link/index.ts';

import Block from '../../core/Block.ts';

export class Navbar extends Block {
  constructor() {
    super('nav', {});
  }

  init() {
    console.log(styles);
    this.addClass(styles.navbar);
    this.props.styles = styles;

    this.children.links = linksData.map((link) => new Link(link));
  }

  render() {
    return this.compile(
      `
        <ul class="{{styles.list}}">
          {{#each links}}
            <li>
                {{{ this }}}
            </li>
          {{/each}}
        </ul>
      `,
    );
  }
}

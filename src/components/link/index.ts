import styles from './link.module.scss';
import Block from '../../core/Block.ts';

// Types
import { LinkType } from './types.ts';

export class Link extends Block {
  constructor(props: LinkType) {
    super(props);
  }

  init() {
    this.props.styles = styles;
  }

  render() {
    return this.compile(
      `
        <a class="{{styles.link}}" href="{{to}}">
          {{text}}
        </a>
      `,
    );
  }
}

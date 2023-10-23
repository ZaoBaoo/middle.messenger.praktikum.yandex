import styles from './link.module.scss';
import Block from '../../core/Block.ts';

// Types
import { LinkType } from './types.ts';

export class Link extends Block {
  constructor(props: LinkType) {
    super('a', props);
  }

  init() {
    this.addClass(styles.link);

    const element = this.element as HTMLLinkElement;
    element!.href = this.props.to;
  }

  render() {
    return this.compile(
      `
        {{text}}
      `,
    );
  }
}
// export const Link: LinkType = (props) => Handlebars.compile(tmpl)(props);

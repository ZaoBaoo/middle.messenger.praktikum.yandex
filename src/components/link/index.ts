import './link.scss';
import Block from '../../core/Block.ts';

// Types
import { LinkType } from './types.ts';

export class Link extends Block {
  constructor(props: LinkType) {
    super('a', props);
  }

  init() {
    const element = this.element as HTMLLinkElement;

    element!.href = this.props.to;
    element!.className = 'link';
  }

  render() {
    return this.compile(
      `
        {{text}}
      `,
      this.props,
    );
  }
}
// export const Link: LinkType = (props) => Handlebars.compile(tmpl)(props);

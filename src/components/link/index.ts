import styles from './link.module.scss';
import Block from '../../core/Block.ts';

// Types
import { LinkType } from './types.ts';
import { router } from '../../core/Router.ts';

export class Link extends Block {
  constructor(props: LinkType) {
    super(props);
  }

  init() {
    this.props.styles = styles;

    const { type = 'common' } = this.props;

    let view;
    switch (type) {
      case 'common':
        view = styles.common;
        break;
      case 'profile':
        view = styles.profile;
        break;
      default:
        break;
    }

    this.props.view = view;

    this.props.events = {
      click: (event: Event) => {
        event.preventDefault();
        router.go(this.props.to);
      },
    };
  }

  render() {
    return this.compile(
      `
        <a class="{{view}}" href="{{to}}">{{text}}</a>
      `,
    );
  }
}

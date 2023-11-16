import styles from './link-arrow.module.scss';
import Block from '../../core/Block.ts';
import arrow from '../../images/back-arrow-icon.svg';

// Types
import type { LinkArrowType } from './types.ts';
import { router } from '../../core/Router.ts';

export class LinkArrow extends Block {
  constructor(props: LinkArrowType) {
    super(props);
  }

  init() {
    this.props.styles = styles;

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
        <a class="{{styles.backLink}}" href="{{to}}">
          <div class="{{styles.back}}">
             <img class="{{styles.backIcon}}" src="${arrow}" alt="Вернуться назад">
          </div>
        </a>
      `,
    );
  }
}

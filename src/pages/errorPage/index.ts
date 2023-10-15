import './errorPage.scss';
import Block from '../../core/Block.ts';

// Components
import { Link } from '../../components/link/index.ts';

// Types
import { ErrorPageType } from './types.ts';

export class ErrorPage extends Block {
  constructor(props: ErrorPageType) {
    super('main', props);
  }

  init() {
    this.children.link = new Link({
      text: this.props.redirectText,
      to: this.props.redirectTo,
    });
  }

  render() {
    return this.compile(
      `
        <section class="error-page">
          <div class="error-page__content">
            <h1 class="error-page__title">{{code}}</h1>
            <h2 class="error-page__subtitle">{{text}}</h2>
            {{{link}}}
          </div>
        </section>
      `,
      this.props,
    );
  }
}

import styles from './errorPage.module.scss';
import Block from '../../core/Block.ts';

// Components
import { Link } from '../../components/link/index.ts';

// Types
// import { ErrorPageType } from './types.ts';

// const def = {
//   code: '505',
//   text: 'Мы уже фиксим',
//   redirectTo: '/chatting',
//   redirectText: 'Назад к чатам',
// };

export class ErrorPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.props.styles = styles;

    this.children.link = new Link({
      text: this.props.redirectText,
      to: this.props.redirectTo,
    });
  }

  render() {
    return this.compile(
      `
        <main>
          <section class="{{styles.errorPage}}">
            <div class="{{styles.content}}">
              <h1 class="{{styles.title}}">{{code}}</h1>
              <h2 class="{{styles.subtitle}}">{{text}}</h2>
              {{{link}}}
            </div>
          </section>
        </main>
      `,
    );
  }
}

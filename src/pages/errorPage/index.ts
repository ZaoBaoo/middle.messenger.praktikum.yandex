import styles from './errorPage.module.scss';
import Block from '../../core/Block.ts';

// Components
import { Link } from '../../components/link/index.ts';

const typeErrorPages: Record<string, unknown> = {
  '/404': {
    code: '404',
    text: 'Страница не найдена',
    redirectTo: '/messenger',
    redirectText: 'Назад к чатам',
  },
  '/500': {
    code: '500',
    text: 'Мы уже фиксим',
    redirectTo: '/messenger',
    redirectText: 'Назад к чатам',
  },
};

export class ErrorPage extends Block {
  constructor() {
    super(typeErrorPages[window.location.pathname]);
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

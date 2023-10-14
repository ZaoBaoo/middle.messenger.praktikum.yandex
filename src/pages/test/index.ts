import './test.scss';

// Core
import Block from '../../core/Block.ts';
import { Button } from '../../components/button/index.ts';

const buttonsData = [
  {
    type: 'button',
    text: 'Кнопка через класс 666',
    events: { click: () => console.log(666) },
  },
  {
    type: 'button',
    text: 'Кнопка через класс 777',
    events: { click: () => console.log(777) },
  },
];

interface TestProps {
  title: string;
}

export class Test extends Block {
  constructor(props: TestProps) {
    super('h1', props);
  }

  init() {
    this.children.buttons = buttonsData.map((button) => new Button(button));
    this.children.button = new Button({
      type: 'button',
      text: 'Кнопка через класс 1',
      events: { click: () => console.log(1) },
    });
  }

  render() {
    return this.compile(
      `
        {{title}}
        {{{button}}}
        {{#each buttons}}
            {{{this}}}
        {{/each}}
    `,
      this.props,
    );
  }
}

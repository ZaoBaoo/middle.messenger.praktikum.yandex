import './input-form.scss';
import Block from '../../core/Block.ts';

// Type
import { FormDataInput } from '../../types.ts';

// Components
import { Input } from '../input/index.ts';

export class InputForm extends Block {
  constructor(props: FormDataInput) {
    super('div', props);
  }

  init() {
    const blur = (e: Event) => console.log(e.currentTarget);
    const propsCombine = { ...this.props, events: { blur } };
    this.children.input = new Input(propsCombine);

    this.addClass('form-input');
  }

  render() {
    return this.compile(
      `
        {{{input}}}
        <label class="form-input__label">{{label}}</label>
        <span class="form-input__error">Ошибка</span>
      `,
    );
  }
}

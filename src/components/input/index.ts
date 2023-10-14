import './input.scss';
import Block from '../../core/Block.ts';

// Types
import { InputType } from './types.ts';

export class Input extends Block {
  constructor(props: InputType) {
    super('div', props);
  }

  init() {
    const element = this.element as HTMLInputElement;

    element!.className = 'form-input';
  }

  render() {
    return this.compile(
      `
        <input class="form-input__input" type="{{type}}" required="required" name="{{name}}" placeholder=" ">
        <label>{{label}}</label>
      `,
      this.props,
    );
  }
}

// export const Input: InputType = (props) => Handlebars.compile(tmpl)(props);

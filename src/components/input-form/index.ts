import './input-form.scss';
import Block from '../../core/Block.ts';
import { validator } from '../../utils/Validator.ts';

// Type
import type { FormDataInputType } from '../../types.ts';

// Components
import { Input } from '../input/index.ts';
import { ErrorValidation } from '../error-validation/index.ts';

export class InputForm extends Block {
  constructor(props: FormDataInputType) {
    super('div', props);
  }

  init() {
    this.children.error = new ErrorValidation({ text: '' });

    const blur = (e: Event) => {
      if (!Array.isArray(this.children.error)) {
        const { value, name } = e.target! as HTMLInputElement;

        const isInputValid = validator.isFieldValid(value, name);

        this.children.error.setProps({ text: isInputValid.message });
      }
    };
    const propsCombine = { ...this.props, events: { blur } };
    this.children.input = new Input(propsCombine);

    this.addClass('form-input');
  }

  render() {
    return this.compile(
      `
        {{{input}}}
        <label class="form-input__label">{{label}}</label>
        {{{error}}}
      `,
    );
  }
}

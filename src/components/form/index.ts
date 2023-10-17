import './form.scss';
import Block from '../../core/Block.ts';

// Types
import type { FormType } from './types.ts';
import type { FormDataInput } from '../../types.ts';

// Components
import { InputForm } from '../input-form';
import { Button } from '../button';

export class Form extends Block {
  constructor(props: FormType) {
    super('form', props);
  }

  init() {
    this.children.inputs = this.props.dataInputsForRender.map(
      (input: FormDataInput) => new InputForm(input),
    );
    this.children.button = new Button(this.props.buttonData);
    this.addClass('form');
  }

  render() {
    return this.compile(
      `
        {{#each inputs}}
          {{{this}}}
        {{/each}}
        <div class="form__wrapper-button">
          {{{button}}}
        </div>
      `,
    );
  }
}

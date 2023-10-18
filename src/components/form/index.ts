import './form.scss';
import Block from '../../core/Block.ts';
import { validator } from '../../utils/Validator.ts';

// Types
import type { FormType } from './types.ts';
import type { FormDataInputType } from '../../types.ts';

// Components
import { InputForm } from '../input-form/index.ts';
import { Button } from '../button/index.ts';

export class Form extends Block {
  constructor(props: FormType) {
    super('form', props);
  }

  init() {
    this.addClass('form');

    this.children.button = new Button(this.props.buttonData);
    this.children.inputs = this.props.dataInputsForRender.map(
      (input: FormDataInputType) => new InputForm(input),
    );

    this.setProps({
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const elements = (e.target! as HTMLFormElement).elements;

          if (Array.isArray(this.children.inputs)) {
            const resultValidation = this.children.inputs.map((inputForm) => {
              const { name: currentInputName } = inputForm.getProps();

              const currentInputElement = elements[
                currentInputName
              ] as HTMLInputElement;

              const isInputValid = validator.isFieldValid(
                currentInputElement.value,
                currentInputElement.name,
              );

              if (
                !isInputValid.isValid &&
                !Array.isArray(inputForm.children.error)
              ) {
                inputForm.children.error.setProps({
                  text: isInputValid.message,
                });
              }

              return isInputValid.isValid;
            });

            const allFieldsCorrect = resultValidation.every(
              (value) => value === true,
            );

            if (allFieldsCorrect) {
              this.props.submitCallback();
            }
          }
        },
      },
    });
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

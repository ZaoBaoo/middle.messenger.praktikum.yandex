import styles from './form-profile.module.scss';
import Block from '../../core/Block.ts';
import { validator } from '../../utils/Validator.ts';

// Types
import type { FormProfileProps } from './types.ts';
import type { WrapperAccountProps } from '../../types.ts';

// Components
import { Button } from '../button/index.ts';
import { InputWrapperProfile } from '../input-wrapper-profile';

export class FormProfile extends Block {
  constructor(props: FormProfileProps) {
    super('form', props);
  }

  init() {
    this.addClass(styles.rows);
    this.props.styles = styles;

    this.children.button = new Button(this.props.buttonData);
    this.children.inputs = this.props.dataInputsForRender.map(
      (input: WrapperAccountProps) =>
        new InputWrapperProfile({ ...input, disabled: false }),
    );

    this.setProps({
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const form = e.target! as HTMLFormElement;

          if (Array.isArray(this.children.inputs)) {
            const resultValidation = this.children.inputs.map((inputForm) => {
              const { name: currentInputName } = inputForm.getProps();

              const currentInputElement = form.elements[
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
              const formData = new FormData(form);
              const formDataArray: [string, FormDataEntryValue][] = [];

              formData.forEach((value, key) =>
                formDataArray.push([key, value]),
              );

              const objectValues = Object.fromEntries(formDataArray);

              this.props.submitCallback(objectValues);
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
        <div class="{{styles.wrapperButton}}">
          {{{button}}}
        </div>
      `,
    );
  }
}

import styles from './form-chat.module.scss';
import Block from '../../core/Block.ts';
import { validator } from '../../utils/Validator.ts';

// Components
import { InputWrapperAccount } from '../input-wrapper-account/index.ts';
import { Button } from '../button/index.ts';
import { FormChatType } from './types.ts';

// Types
// import type { FormAccountProps } from './types.ts';
// import type { WrapperAccountProps } from '../../types.ts';

export class FormChat extends Block {
  constructor(props: FormChatType) {
    super(props);
  }

  handlerAddUser(props: unknown) {
    console.log('USER добавлен :', props);
  }

  init() {
    this.props.styles = styles;

    const { textButton, name } = this.props;

    this.children.inputs = [new InputWrapperAccount({ type: 'text', name, label: 'Логин' })];
    this.children.button = new Button({ type: 'button', text: textButton });
    this.children.button.dispatchComponentDidMount();
    if (Array.isArray(this.children.inputs)) {
      this.children.inputs.forEach((input) => input.dispatchComponentDidMount());
    }

    this.setProps({
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const form = e.target! as HTMLFormElement;

          if (Array.isArray(this.children.inputs)) {
            const resultValidation = this.children.inputs.map((inputForm) => {
              const { name: currentInputName } = inputForm.getProps();

              const currentInputElement = form.elements[currentInputName] as HTMLInputElement;

              const isInputValid = validator.isFieldValid(currentInputElement.value, currentInputElement.name);

              if (!isInputValid.isValid && !Array.isArray(inputForm.children.error)) {
                inputForm.children.error.setProps({
                  text: isInputValid.message,
                });
              }

              return isInputValid.isValid;
            });

            const allFieldsCorrect = resultValidation.every((value) => value === true);

            if (allFieldsCorrect) {
              const formData = new FormData(form);
              const formDataArray: [string, File | string][] = [];

              formData.forEach((value, key) => formDataArray.push([key, value]));

              const objectValues = Object.fromEntries(formDataArray);

              this.handlerAddUser(objectValues);

              // this.props.submitCallback(objectValues);
            }
          }
        },
      },
    });
  }

  componentDidMount() {}

  render() {
    return this.compile(
      `
        <form class="{{styles.form}}">
          {{{inputs}}}
          {{{button}}}
        </form>
      `,
    );
  }
}

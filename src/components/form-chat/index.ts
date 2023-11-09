import styles from './form-chat.module.scss';
import Block from '../../core/Block.ts';
import { validator } from '../../utils/Validator.ts';

// Components
import { InputWrapperAccount } from '../input-wrapper-account/index.ts';
import { Button } from '../button/index.ts';
import { FormChatType } from './types.ts';

export class FormChat extends Block {
  constructor(props: FormChatType) {
    super(props);
  }

  init() {
    this.props.styles = styles;

    const { textButton, name, label } = this.props;

    this.children.input = new InputWrapperAccount({ type: 'text', name, label });
    this.children.button = new Button({ type: 'button', text: textButton });
    this.children.button.dispatchComponentDidMount();
    this.children.input.dispatchComponentDidMount();

    this.setProps({
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const form = e.target! as HTMLFormElement;

          const { input } = this.children;

          if (!Array.isArray(input)) {
            const { name: currentInputName } = input.getProps();

            const currentInputElement = form.elements[currentInputName] as HTMLInputElement;

            const isInputValid = validator.isFieldValid(currentInputElement.value, currentInputElement.name);

            if (!isInputValid.isValid && !Array.isArray(input.children.error)) {
              input.children.error.setProps({
                text: isInputValid.message,
              });
            }

            if (isInputValid.isValid) {
              this.props.callback(this.props.type, currentInputElement.value);
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
          {{{input}}}
          {{{button}}}
        </form>
      `,
    );
  }
}

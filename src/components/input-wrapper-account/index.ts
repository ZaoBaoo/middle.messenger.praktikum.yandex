import styles from './input-wrapper-account.module.scss';
import Block from '../../core/Block.ts';
import { validator } from '../../utils/Validator.ts';

// Type
import type { WrapperAccountProps } from '../../types.ts';

// Components
import { Input } from '../input/index.ts';
import { ErrorValidation } from '../error-validation/index.ts';

export class InputWrapperAccount extends Block {
  constructor(props: WrapperAccountProps) {
    super('div', props);
  }

  init() {
    this.addClass(styles.formInputCommon);
    this.props.styles = styles;

    const blur = (e: Event) => {
      if (!Array.isArray(this.children.error)) {
        const { value, name } = e.target! as HTMLInputElement;

        const isInputValid = validator.isFieldValid(value, name);

        this.children.error.setProps({ text: isInputValid.message });
      }
    };
    this.children.error = new ErrorValidation({ text: '', type: 'left' });
    this.children.input = new Input({
      type: this.props.type,
      name: this.props.name,
      option: 'common',
      events: { blur },
      disabled: false,
    });
  }

  render() {
    return this.compile(
      `
        {{{input}}}
        <label class="{{styles.formInputLabelCommon}}">{{label}}</label>
        {{{error}}}
      `,
    );
  }
}

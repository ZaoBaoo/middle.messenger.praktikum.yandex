import styles from './input-wrapper-profile.module.scss';
import Block from '../../core/Block.ts';

// Types
import { PropsType } from './types.ts';
import { Input } from '../input/index.ts';
import { ErrorValidation } from '../error-validation/index.ts';
import { validator } from '../../utils/Validator.ts';

export class InputWrapperProfile extends Block {
  constructor(props: PropsType) {
    super(props);
  }

  init() {
    const blur = (e: Event) => {
      if (!Array.isArray(this.children.error)) {
        const { value, name } = e.target! as HTMLInputElement;

        const isInputValid = validator.isFieldValid(value, name);

        this.children.error.setProps({ text: isInputValid.message });
      }
    };

    this.props.styles = styles;
    this.children.input = new Input({
      type: this.props.type,
      name: this.props.name,
      option: 'profile',
      disabled: this.props.disabled,
      value: this.props.value,
      events: { blur },
    });
    this.children.error = new ErrorValidation({ text: '', type: 'right' });
  }

  render() {
    return this.compile(
      `
        <div class="{{styles.row}}">
          <p class="{{styles.rowLabel}}">{{label}}</p>
          {{{input}}}
          {{{error}}}
        </div>
      `,
    );
  }
}

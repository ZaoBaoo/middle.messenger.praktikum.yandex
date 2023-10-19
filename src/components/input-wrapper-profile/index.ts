import styles from './input-wrapper-profile.module.scss';
import Block from '../../core/Block.ts';

// Types
import { PropsType } from './types.ts';
import { Input } from '../input/index.ts';
import { ErrorValidation } from '../error-validation/index.ts';

export class InputWrapperProfile extends Block {
  constructor(props: PropsType) {
    super('div', props);
  }

  init() {
    this.addClass(styles.row);
    this.props.styles = styles;
    this.children.input = new Input({
      type: this.props.type,
      name: this.props.name,
      option: 'profile',
      disabled: this.props.disabled,
      value: this.props.value,
    });
    this.children.error = new ErrorValidation({ text: 'Говно', type: 'right' });
  }

  render() {
    return this.compile(
      `
        <p class="{{styles.rowLabel}}">{{label}}</p>
        {{{input}}}
        {{{error}}}
      `,
    );
  }
}

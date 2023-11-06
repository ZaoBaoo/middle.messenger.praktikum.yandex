import styles from './input.module.scss';
import Block from '../../core/Block.ts';

// Types
import { InputPropsType, OptionsType } from './types.ts';

export class Input extends Block {
  constructor(props: InputPropsType) {
    super(props);
  }

  componentDidMount() {
    const element = this.element! as HTMLInputElement;
    element.required = true;
    element.type = this.props.type;
    element.name = this.props.name;
    element.disabled = this.props.disabled;
    element.placeholder = ' ';

    if (this.props.value) {
      element!.value = this.props.value;
    }

    const options: OptionsType = {
      common: styles.inputCommon,
      profile: styles.inputProfile,
    };

    element.classList.add(options[this.props.option]);
  }

  render() {
    return this.compile(
      `
        <input>
      `,
    );
  }
}

import styles from './error-validation.module.scss';
import Block from '../../core/Block.ts';

// Type
import type { ErrorValidationType, OptionsType } from './types.ts';

export class ErrorValidation extends Block {
  constructor(props: ErrorValidationType) {
    super(props);
  }

  afterRender() {
    const options: OptionsType = {
      left: styles.errorValidationLeft,
      right: styles.errorValidationRight,
    };

    this.element!.classList.add(options[this.props.type]);
  }

  render() {
    return this.compile(
      `
        <span>
          {{{text}}}
        </span>
      `,
    );
  }
}

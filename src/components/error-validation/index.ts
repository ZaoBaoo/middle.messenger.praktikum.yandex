import './error-validation.scss';
import Block from '../../core/Block.ts';

// Type
import { ErrorValidationType } from './types.ts';

// Components

export class ErrorValidation extends Block {
  constructor(props: ErrorValidationType) {
    super('span', props);
  }

  init() {
    this.addClass('error-validation');
  }

  render() {
    return this.compile(
      `
        {{{text}}}
      `,
    );
  }
}

import './button.scss';
import Block from '../../core/Block.ts';

// Types
import { ButtonType } from './types.ts';

export class Button extends Block {
  constructor(props: ButtonType) {
    super('button', props);
  }

  init() {
    const element = this.element as HTMLInputElement;

    element!.type = this.props.type;
    this.addClass('button');
  }

  render() {
    return this.compile(`{{text}}`);
  }
}

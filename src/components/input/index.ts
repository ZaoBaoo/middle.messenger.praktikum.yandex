import './input.scss';
import Block from '../../core/Block.ts';

// Types
import { InputType } from './types.ts';

export class Input extends Block {
  constructor(props: InputType) {
    super('input', props);
  }

  init() {
    const element = this.element as HTMLInputElement;

    this.addClass('input');
    element!.required = true;
    element!.type = this.props.type;
    element!.name = this.props.name;
    element!.placeholder = ' ';
  }

  render() {
    return this.compile(``);
  }
}

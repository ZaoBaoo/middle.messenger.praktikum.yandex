import styles from './avatar.module.scss';
import Block from '../../core/Block.ts';

// Types
import type { AvatarProps } from './types.ts';

export class Avatar extends Block {
  constructor(props: AvatarProps) {
    super('label', props);
  }

  init() {
    this.props.styles = styles;
    this.addClass(styles.label);
    if (!this.props.isEdit) {
      this.addClass(styles.disabled);
    }

    const element = this.element as HTMLLabelElement;
    element.setAttribute('for', 'loadImage');
  }

  render() {
    return this.compile(
      `
        <img class="{{styles.photo}}" src="{{src}}" alt="Фото профиля">
        <input class="{{styles.input}}" id="loadImage" type="file" name="avatar">
      `,
    );
  }
}

import styles from './avatar.module.scss';
import Block from '../../core/Block.ts';

// Types
import type { AvatarProps } from './types.ts';

export class Avatar extends Block {
  constructor(props: AvatarProps) {
    super(props);
  }

  init() {
    this.props.styles = styles;
  }

  componentDidMount() {
    if (!this.props.isEdit) {
      this.element?.classList.add(styles.disabled);
    }

    const element = this.element as HTMLLabelElement;
    element.setAttribute('for', 'loadImage');
  }

  render() {
    return this.compile(
      `
        <label class="{{styles.label}}">
          <img class="{{styles.photo}}" src="{{src}}" alt="Фото профиля">
          <input class="{{styles.input}}" id="loadImage" type="file" name="avatar" accept="image/*">
        </label>
      `,
    );
  }
}

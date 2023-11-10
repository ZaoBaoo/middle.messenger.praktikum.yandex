import placeholder from '../../images/placeholder-photo-icon.svg';
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

    const { src } = this.props;

    this.props.src = src ? `https://ya-praktikum.tech/api/v2/resources${src}` : placeholder;

    switch (this.props.size) {
      case 'large':
        this.props.avatarSize = styles.avatarLarge;
        break;
      case 'medium':
        this.props.avatarSize = styles.avatarMedium;
        break;
      case 'small':
        this.props.avatarSize = styles.avatarSmall;
        break;
      default:
        break;
    }
  }

  componentDidMount() {
    if (!this.props.isEdit) {
      this.element?.classList.add(styles.disabled);
    }

    const element = this.element as HTMLLabelElement;
    element.setAttribute('for', 'loadImage');
  }

  // componentDidUpdate() {
  //   const { src } = this.props;
  //
  //   if (src) {
  //     this.props.src = src ? `https://ya-praktikum.tech/api/v2/resources${src}` : placeholder;
  //   }
  //
  //   return true;
  // }

  render() {
    return this.compile(
      `
        <label class="{{styles.label}}">
          <img class="{{avatarSize}}" src="{{src}}" alt="">
          <input class="{{styles.input}}" id="loadImage" type="file" name="avatar" accept="image/*">
        </label>
      `,
    );
  }
}

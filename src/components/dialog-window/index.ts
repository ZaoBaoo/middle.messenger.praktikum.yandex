import styles from './dialog-window.module.scss';
import Block from '../../core/Block.ts';
import { ChatSettings } from '../chat-settings/index.ts';
import { MessageInner } from '../message-inner/index.ts';
import { InputControlDialog } from '../input-control-dialog/index.ts';
import { Avatar } from '../avatar/index.ts';
import { DialogWindowPropsType } from './types.ts';
import { ChatsControllers } from '../../controllers/ChatsControllers.ts';
import { withStore } from '../../core/Store.ts';
import { StateType } from '../../types.ts';

export class BaseDialogWindow extends Block {
  constructor(props: DialogWindowPropsType) {
    super(props);
  }

  async handlerChangesAvatarChat(e: Event) {
    const input = e.target as HTMLInputElement;
    const { currentChat } = this.props;

    if (currentChat) {
      const formData = new FormData();

      if (input.files) {
        formData.append('avatar', input.files[0]);
        formData.append('chatId', currentChat.id);

        await ChatsControllers.changeAvatarChat(formData);
      }
    }
  }

  init() {
    this.props.styles = styles;

    this.children.chatSettings = new ChatSettings();
    this.children.messageInner = new MessageInner({});
    this.children.dialogControl = new InputControlDialog({});
  }

  componentDidUpdate() {
    const { currentChat } = this.props;

    this.children.avatar = new Avatar({
      src: currentChat?.avatar,
      isEdit: false,
      size: 'small',
      events: { change: this.handlerChangesAvatarChat.bind(this) },
    });

    return true;
  }

  render() {
    return this.compile(
      `
        <div class="{{styles.dialogWindow}}">
          <div class="{{styles.dialogHeader}}">
            <div class="{{styles.dialogUserInfo}}">
              {{{avatar}}}
              <p class="{{styles.dialogUserName}}">{{currentChat.title}}</p>
            </div>
            {{{chatSettings}}}
          </div>
          {{{messageInner}}}
          {{{dialogControl}}}
        </div>
      `,
    );
  }
}

const mapStateToProps = (state: StateType) => ({
  currentChat: state.currentChat?.[0],
});

export const DialogWindow = withStore(mapStateToProps)(BaseDialogWindow);

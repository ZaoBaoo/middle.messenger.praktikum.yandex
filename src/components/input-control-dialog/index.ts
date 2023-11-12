import styles from './input-control-dialog.module.scss';
import Block from '../../core/Block.ts';
import { validator } from '../../utils/Validator.ts';
import { StateType } from '../../types.ts';
import { withStore } from '../../core/Store.ts';

export class BaseInputControlDialog extends Block {
  constructor() {
    super({});
  }

  handlerSendMessage(message: string) {
    this.props.webSocket.send(
      JSON.stringify({
        content: message,
        type: 'message',
      }),
    );
  }

  init() {
    this.props.styles = styles;

    this.props.events = {
      submit: (e: Event) => {
        e.preventDefault();

        const form = e.target! as HTMLFormElement;
        const { value, name } = form.elements[1] as HTMLInputElement;
        const resultValidation = validator.isFieldValid(value, name);

        if (resultValidation.isValid) {
          this.handlerSendMessage(value);
          form.reset();
        }
      },
    };
  }

  render() {
    return this.compile(
      `
        <form class="{{styles.dialogControl}}">
          <label class="{{styles.dialogFile}}" for="fileLoad">
            <input id="fileLoad" type="file" />
          </label>
  
          <input class="{{styles.dialogInputText}}" type="text" placeholder="Сообщение" name="message" />
          <button class="{{styles.dialogSendMessage}}" type="submit"></button>
        </form>
      `,
    );
  }
}

const mapStateToProps = (state: StateType) => ({
  webSocket: state.webSocket,
});

export const InputControlDialog = withStore(mapStateToProps)(BaseInputControlDialog);

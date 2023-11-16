import type { ButtonType } from '../button/types.ts';
import type { WrapperAccountProps } from '../../types.ts';

export interface FormProfileProps<T> {
  dataInputsForRender: WrapperAccountProps[];
  buttonData: ButtonType;
  submitCallback: (response: T) => void;
}

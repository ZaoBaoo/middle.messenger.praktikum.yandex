import type { ButtonType } from '../button/types.ts';
import type { WrapperAccountProps } from '../../types.ts';

export interface FormAccountProps<T> {
  dataInputsForRender: WrapperAccountProps[];
  buttonData: ButtonType;
  submitCallback: (response: T) => void;
}

import type { ButtonType } from '../button/types.ts';
import type { SignInType, WrapperAccountProps } from '../../types.ts';

export interface FormAccountProps {
  dataInputsForRender: WrapperAccountProps[];
  buttonData: ButtonType;
  submitCallback: (response: SignInType) => void;
}

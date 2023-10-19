import type { ButtonType } from '../button/types.ts';
import type { WrapperAccountProps } from '../../types.ts';

export interface FormAccountProps {
  dataInputsForRender: WrapperAccountProps[];
  buttonData: ButtonType;
  submitCallback: () => void;
}

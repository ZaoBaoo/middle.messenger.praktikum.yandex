import type { ButtonType } from '../button/types.ts';
import type { FormDataResponseType, WrapperAccountProps } from '../../types.ts';

export interface FormAccountProps {
  dataInputsForRender: WrapperAccountProps[];
  buttonData: ButtonType;
  submitCallback: (response: FormDataResponseType) => void;
}

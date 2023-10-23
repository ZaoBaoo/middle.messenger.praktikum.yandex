import type { ButtonType } from '../button/types.ts';
import type { WrapperAccountProps, FormDataResponseType } from '../../types.ts';

export interface FormProfileProps {
  dataInputsForRender: WrapperAccountProps[];
  buttonData: ButtonType;
  submitCallback: (response: FormDataResponseType) => void;
}

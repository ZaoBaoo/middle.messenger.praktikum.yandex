import type { ButtonType } from '../button/types.ts';
import type { FormDataInputType } from '../../types.ts';

export interface FormType {
  dataInputsForRender: FormDataInputType[];
  buttonData: ButtonType;
  submitCallback: () => void;
}

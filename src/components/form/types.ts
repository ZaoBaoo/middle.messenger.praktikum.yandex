import type { ButtonType } from '../button/types.ts';
import type { FormDataInput } from '../../types.ts';

export interface FormType {
  dataInputsForRender: FormDataInput[];
  buttonData: ButtonType;
  events?: {
    submit?: (e: Event) => void;
  };
}

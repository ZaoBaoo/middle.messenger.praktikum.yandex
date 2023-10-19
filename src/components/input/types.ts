export interface InputPropsType {
  type: string;
  name: string;
  option: string;
  disabled: boolean;
  value?: string;
  events?: {
    blur?: (e: Event) => void;
  };
}

export type OptionsType = Record<string, string>;

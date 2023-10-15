export interface InputType {
  type: string;
  label: string;
  name: string;
  events: {
    focusout: () => void;
  };
}

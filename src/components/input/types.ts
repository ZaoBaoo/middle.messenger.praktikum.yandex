export interface InputType {
  type: string;
  name: string;
  events: {
    blur: () => void;
  };
}

export interface ButtonType {
  text: string;
  type: string;
  events: {
    click: () => void;
  };
}

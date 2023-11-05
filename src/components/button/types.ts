export interface ButtonType {
  text: string;
  type: string;
  view?: string;
  events?: {
    click?: () => void;
  };
}

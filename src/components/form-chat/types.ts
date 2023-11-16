export interface FormChatType {
  textButton: string;
  name: string;
  label: string;
  type: string;
  callback: (type: string, title: string) => void;
}

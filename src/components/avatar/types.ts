export interface AvatarProps {
  src: string;
  isEdit: boolean;
  events?: {
    change?: (e: Event) => void;
  };
}

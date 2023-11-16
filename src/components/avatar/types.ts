export interface AvatarProps {
  src: string;
  isEdit: boolean;
  size: 'large' | 'medium' | 'small';
  events?: {
    change?: (e: Event) => void;
  };
}

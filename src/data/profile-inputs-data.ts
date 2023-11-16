interface ProfileInputType {
  type: string;
  label: string;
  value: string;
  name: 'email' | 'login' | 'first_name' | 'second_name' | 'display_name' | 'phone';
}

type ProfileInputsType = ProfileInputType[];

export const profileInputsData: ProfileInputsType = [
  { type: 'email', label: 'Почта', name: 'email', value: '1' },
  { type: 'text', label: 'Логин', name: 'login', value: '2' },
  { type: 'text', label: 'Имя', name: 'first_name', value: '3' },
  { type: 'text', label: 'Фамилия', name: 'second_name', value: '4' },
  { type: 'text', label: 'Имя в чате', name: 'display_name', value: '5' },
  { type: 'tel', label: 'Телефон', name: 'phone', value: '6' },
];

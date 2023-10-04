import './profile.scss';
import Handlebars from 'handlebars';
import { tmpl } from './profile.tmpl.ts';
import avatar from '../../images/placeholder-photo-icon.svg';
import arrow from '../../images/back-arrow-icon.svg';

// Components
import { Link } from '../../components/link/index.ts';

// Types
import { ProfileType } from './types.ts';

export const Profile: ProfileType = () => {
  const additionalProps = {
    linkEditInfo: Link({ to: '/profile-info-edit', text: 'Изменить данные' }),
    linkEditPassword: Link({
      to: '/profile-password-edit',
      text: 'Изменить пароль',
    }),
    email: 'pochta@yandex.ru',
    login: 'ivanivanov',
    firstName: 'Иван',
    secondName: 'Иванов',
    chatName: 'Иван',
    phone: '+7 (909) 967 30 30',
    avatar,
    arrow,
  };

  return Handlebars.compile(tmpl)(additionalProps);
};

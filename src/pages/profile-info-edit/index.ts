import './profile-info-edit.scss';
import Handlebars from 'handlebars';
import { tmpl } from './profile-info-edit.tmpl.ts';
import avatar from '../../images/placeholder-photo-icon.svg';
import arrow from '../../images/back-arrow-icon.svg';

// Components
import { Button } from '../../components/button/index.ts';

// Types
import { ProfileInfoEditType } from './types.ts';

export const ProfileInfoEdit: ProfileInfoEditType = () => {
  const additionalProps = {
    button: Button({ type: 'submit', text: 'Сохранить' }),
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

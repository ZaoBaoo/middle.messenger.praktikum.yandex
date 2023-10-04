import './profile-password-edit.scss';
import Handlebars from 'handlebars';
import { tmpl } from './profile-password-edit.tmpl.ts';
import avatar from '../../images/placeholder-photo-icon.svg';
import arrow from '../../images/back-arrow-icon.svg';

// Components
import { Button } from '../../components/button/index.ts';

// Types
import { ProfilePasswordEditType } from './types.ts';

export const ProfilePasswordEdit: ProfilePasswordEditType = () => {
  const additionalProps = {
    button: Button({ type: 'submit', text: 'Сохранить' }),
    oldPassword: '123456789',
    newPassword: '123456789qwe',
    confirmPassword: '123456789qwe',
    avatar,
    arrow,
  };

  return Handlebars.compile(tmpl)(additionalProps);
};

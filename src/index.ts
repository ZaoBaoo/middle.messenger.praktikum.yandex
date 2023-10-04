import './styles/index.scss';

// Pages
import { Main } from './pages/main/index.ts';
import { Login } from './pages/login/index.ts';
import { Profile } from './pages/profile/index.ts';
import { SignIn } from './pages/signin/index.ts';
import { ErrorPage } from './pages/errorPage/index.ts';
import { ProfileInfoEdit } from './pages/profile-info-edit/index.ts';
import { ProfilePasswordEdit } from './pages/profile-password-edit/index.ts';
import { Chatting } from './pages/chatting/index.ts';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#root');

  if (!root) return;

  const definitionRoute = () => {
    const route = window.location.pathname;

    switch (route) {
      case '/':
        root.innerHTML = Main();
        break;

      case '/login':
        root.innerHTML = Login();
        break;

      case '/sign-in':
        root.innerHTML = SignIn();
        break;

      case '/profile':
        root.innerHTML = Profile();
        break;

      case '/chatting':
        root.innerHTML = Chatting();
        break;

      case '/profile-info-edit':
        root.innerHTML = ProfileInfoEdit();
        break;

      case '/profile-password-edit':
        root.innerHTML = ProfilePasswordEdit();
        break;

      default:
        // В зависимости от ошибки, передаем в шаблон код и текст
        root.innerHTML = ErrorPage({
          code: '505',
          text: 'Мы уже фиксим',
          redirectTo: '/chatting',
          redirectText: 'Назад к чатам',
        });
        break;
    }
  };

  definitionRoute();
});

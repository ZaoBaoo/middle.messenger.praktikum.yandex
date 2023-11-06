import './styles/index.scss';
import { router } from './core/Router.ts';

// Pages
import { Main } from './pages/main/index.ts';
import { Login } from './pages/login/index.ts';
import { SignIn } from './pages/signin/index.ts';
import { Profile } from './pages/profile/index.ts';
import { Chatting } from './pages/chatting/index.ts';
import { ProfileInfoEdit } from './pages/profile-info-edit/index.ts';
import { ProfilePasswordEdit } from './pages/profile-password-edit/index.ts';
import { ErrorPage } from './pages/errorPage/index.ts';

enum Routes {
  Main = '/',
  Login = '/login',
  Register = '/sign-in',
  Profile = '/profile',
  Chatting = '/chatting',
  ProfileInfoEdit = '/profile-info-edit',
  ProfilePasswordEdit = '/profile-password-edit',
  ErrorPage = '/404',
}

document.addEventListener('DOMContentLoaded', () => {
  router
    .use(Routes.Main, Main)
    .use(Routes.Login, Login)
    .use(Routes.Register, SignIn)
    .use(Routes.Profile, Profile)
    .use(Routes.Chatting, Chatting)
    .use(Routes.ProfileInfoEdit, ProfileInfoEdit)
    .use(Routes.ProfilePasswordEdit, ProfilePasswordEdit)
    .use(Routes.ErrorPage, ErrorPage);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Main:
    case Routes.Login:
    case Routes.Register:
      isProtectedRoute = false;
      break;
    default:
  }

  try {
    // await AuthController.fetchUser();

    router.start();

    // if (!isProtectedRoute) {
    //   router.go(Routes.Profile);
    // }
  } catch (err) {
    console.log(err, 'Here');
    router.start();

    if (isProtectedRoute) {
      router.go(Routes.Main);
    }
  }

  // const root = document.querySelector('#root');
  //
  // if (!root) return;
  //
  // const definitionRoute = () => {
  //   const route = window.location.pathname;
  //
  //   let block;
  //
  //   switch (route) {
  //     case '/':
  //       block = new Main();
  //       break;
  //
  //     case '/login':
  //       block = new Login();
  //       break;
  //
  //     case '/sign-in':
  //       block = new SignIn();
  //       break;
  //
  //     case '/profile':
  //       block = new Profile();
  //       break;
  //
  //     case '/chatting':
  //       block = new Chatting();
  //       break;
  //
  //     case '/profile-info-edit':
  //       block = new ProfileInfoEdit();
  //       break;
  //
  //     case '/profile-password-edit':
  //       block = new ProfilePasswordEdit();
  //       break;
  //
  //     default:
  //       // В зависимости от ошибки, передаем в шаблон код и текст
  //       block = new ErrorPage({
  //         code: '505',
  //         text: 'Мы уже фиксим',
  //         redirectTo: '/chatting',
  //         redirectText: 'Назад к чатам',
  //       });
  //       break;
  //   }
  //
  //   if (!block) root.append('НЕТ РОУТА');
  //
  //   root.append(block?.getContent()!);
  //   block?.dispatchComponentDidMount();
  // };
  //
  // definitionRoute();
});

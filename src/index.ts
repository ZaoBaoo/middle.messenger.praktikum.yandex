import './styles/index.scss';
import { router } from './core/Router.ts';

// Controller
import { AuthController } from './controllers/AuthController.ts';

// Pages
import { Main } from './pages/main/index.ts';
import { Login } from './pages/login/index.ts';
import { SignUp } from './pages/signup/index.ts';
import { Profile } from './pages/profile/index.ts';
import { Chatting } from './pages/chatting/index.ts';
import { ProfileInfoEdit } from './pages/profile-info-edit/index.ts';
import { ProfilePasswordEdit } from './pages/profile-password-edit/index.ts';
import { ErrorPage } from './pages/errorPage/index.ts';

enum Routes {
  Main = '/',
  Login = '/login',
  Register = '/sign-up',
  Profile = '/profile',
  Chatting = '/chatting',
  ProfileInfoEdit = '/profile-info-edit',
  ProfilePasswordEdit = '/profile-password-edit',
  ErrorPage = '/404',
}

document.addEventListener('DOMContentLoaded', async () => {
  router
    .use(Routes.Main, Main)
    .use(Routes.Login, Login)
    .use(Routes.Register, SignUp)
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
    // await AuthController.logOut();
    await AuthController.fetchUser();

    router.start();

    if (!isProtectedRoute) {
      router.go(Routes.Profile);
    }
  } catch (err) {
    console.log(err, 'Here');
    router.start();

    if (isProtectedRoute) {
      router.go(Routes.Main);
    }
  }
});

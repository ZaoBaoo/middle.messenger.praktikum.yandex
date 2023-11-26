import { expect } from 'chai';
import { router } from './Router.ts';
import { Routes } from '../types.ts';
import { Main } from '../pages/main/index.ts';
import { Login } from '../pages/login/index.ts';
import { SignUp } from '../pages/signup/index.ts';

describe('Router class', () => {
  const BASE_HTML = '<!DOCTYPE html><html><body><div id="root"></div></body></html>';

  document.open();
  document.write(BASE_HTML);
  document.close();

  router.use(Routes.Main, Main).use(Routes.Login, Login).use(Routes.Register, SignUp);
  router.start();

  it('Should register routes', () => {
    expect(router.getRoutes()).to.have.lengthOf(3);
  });

  it('Method .go() should take new path', () => {
    router.go(Routes.Login);

    expect(window.location.pathname).to.eq(Routes.Login);
  });

  it('Should render component', () => {
    const title = document.querySelector('h1');

    expect(title?.textContent).to.eq('Вход');
  });

  it('Method .back() should take new path', () => {
    expect(window.location.pathname).to.eq('/login');
    router.back();
    window.addEventListener('popstate', () => {
      expect(window.location.pathname).to.eq('/');
    });
  });
});

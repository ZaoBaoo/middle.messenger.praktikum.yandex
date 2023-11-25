import { expect } from 'chai';
import { Link } from './index.ts';

describe('Link component', () => {
  const linkComponent = new Link({
    text: 'Главная',
    type: 'common',
    to: '/profile',
  });

  linkComponent.dispatchComponentDidMount();

  const linkHtml = linkComponent.element as HTMLLinkElement;

  it('Should contain textContent property', () => {
    expect(linkHtml.textContent).to.eq('Главная');
  });

  it('Should contain href property', () => {
    expect(linkHtml.href).to.eq('/profile');
  });
});

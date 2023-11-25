// import { expect } from 'chai';
import { Input } from './index.ts';
import { expect } from 'chai';

describe('Input component', () => {
  const inputComponent = new Input({
    name: 'user_email',
    type: 'email',
    option: 'common',
    disabled: true,
    value: 'Иван Иванов',
  });

  inputComponent.dispatchComponentDidMount();

  const inputHtml = inputComponent.element as HTMLInputElement;

  it('Should contain name property', () => {
    expect(inputHtml.name).to.eq('user_email');
  });

  it('Should contain type property', () => {
    expect(inputHtml.type).to.eq('email');
  });

  it('Should contain disabled true', () => {
    expect(inputHtml.disabled).to.eq(true);
  });

  it('Should contain value property', () => {
    expect(inputHtml.value).to.eq('Иван Иванов');
  });
});

import { expect } from 'chai';
import sinon from 'sinon';
import { Button } from './index.ts';

describe('Button component', () => {
  it('should be clickable', () => {
    const callback = sinon.stub();

    const button = new Button({
      text: 'кнопка',
      type: 'button',
      events: {
        click: callback,
      },
    });

    const element = button.element as HTMLButtonElement;

    element.click();

    expect(callback.calledOnce).to.eq(true);
  });
});

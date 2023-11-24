import { expect } from 'chai';
import { set } from './set.ts';

describe.only('set function', () => {
  it('Should return object argument if passed object is not an real object', () => {
    const object = null;
    const path = 'a.b';
    const value = 1;

    expect(set(object, path, value)).to.eq(object);
  });

  it('Should throw an error if path param is not a string', () => {
    const object = {};
    const path = 0;
    const value = 1;

    // @ts-ignore
    const fn = () => set(object, path, value);

    expect(fn).to.throw(Error);
  });
});

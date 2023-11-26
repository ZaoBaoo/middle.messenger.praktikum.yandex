import { expect } from 'chai';
import { set } from './set.ts';

describe('set function', () => {
  it('Should return an object parameter if the passed object is not an object', () => {
    const obj = null;

    expect(set(obj, '', '1')).to.equal(obj);
  });

  it('Should throw an error if the path is not a string', () => {
    const path = null;
    const obj = {};

    // @ts-expect-error
    const fn = () => set(obj, path, 1);

    expect(fn).to.throw(Error);
  });

  it('Should perform several property operations correctly', () => {
    const obj = {};
    set(obj, 'order.title', 'Book');
    set(obj, 'order.price', 100);
    set(obj, 'order.currency', 'USD');
    expect(obj).to.deep.equal({ order: { title: 'Book', price: 100, currency: 'USD' } });
  });

  it('Should set value by path', () => {
    const obj = { a: 123, b: { a: 345 } };
    const path = 'b.a';
    const value = 123;

    const result = set(obj, path, value);

    expect(result).to.have.nested.property(path).that.equals(value);
  });

  it('Should mutate original object', () => {
    const obj = { a: 123, b: { a: 345 } };
    const path = 'b.a';
    const value = 123;

    const result = set(obj, path, value);

    expect(result).to.equal(obj);
  });
});

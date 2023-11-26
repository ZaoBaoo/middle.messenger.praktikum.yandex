import sinon, { SinonFakeXMLHttpRequestStatic, SinonFakeXMLHttpRequest } from 'sinon';
import { expect } from 'chai';
import { HTTPTransport } from './HTTPTransport.ts';
import { BASE_API_URL } from '../../utils/constants.ts';

describe('HTTPTransport test', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;
  const requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-expect-error: To test the case
    global.XMLHttpRequest = xhr;

    xhr.onCreate = (req) => {
      requests.push(req);
    };

    instance = new HTTPTransport('');
  });

  afterEach(() => {
    requests.length = 0;
    xhr.restore();
  });

  describe('Checking functionality of request methods', () => {
    it('Method get() should be called with GET method', () => {
      instance.get('/');

      const [request] = requests;

      expect(request.method).to.eq('GET');
    });

    it('Method post() should be called with POST method', () => {
      instance.post('/');

      const [request] = requests;

      expect(request.method).to.eq('POST');
    });

    it('Method put() should be called with PUT method', () => {
      instance.put('/', {});

      const [request] = requests;

      expect(request.method).to.eq('PUT');
    });

    it('Method delete() should be called with DELETE method', () => {
      instance.delete('/', {});

      const [request] = requests;

      expect(request.method).to.eq('DELETE');
    });
  });

  describe('Checking correct path of methods', () => {
    it('Method get() should contain correct path', () => {
      const path = '/user';

      instance.get(path);

      const [request] = requests;

      expect(request.url).to.eq(BASE_API_URL + path);
    });

    it('Method post() should contain correct path', () => {
      const path = '/user';

      instance.post(path);

      const [request] = requests;

      expect(request.url).to.eq(BASE_API_URL + path);
    });

    it('Method put() should contain correct path', () => {
      const path = '/user';

      instance.put(path, {});

      const [request] = requests;

      expect(request.url).to.eq(BASE_API_URL + path);
    });

    it('Method delete() should contain correct path', () => {
      const path = '/user';

      instance.delete(path, {});

      const [request] = requests;

      expect(request.url).to.eq(BASE_API_URL + path);
    });
  });

  describe('Checking data for requests', () => {
    it('Validation of data in post() method', () => {
      const url = '/auth/signup';

      const data = {
        login: 'ivanov',
        password: '123456Aaa',
      };

      instance.post(`${url}`, { data });

      const [request] = requests;

      expect(request.requestBody).to.equal(JSON.stringify(data));
    });

    it('Validation of data in put() method', () => {
      const path = '/';
      const data = { title: 'Страница' };

      instance.put(path, { data });

      const [request] = requests;

      expect(request.requestBody).to.eq(JSON.stringify(data));
    });

    it('Validation of data in delete() method', () => {
      const path = '/';
      const data = { title: 'Страница' };

      instance.delete(path, { data });

      const [request] = requests;

      expect(request.requestBody).to.eq(JSON.stringify(data));
    });
  });
});

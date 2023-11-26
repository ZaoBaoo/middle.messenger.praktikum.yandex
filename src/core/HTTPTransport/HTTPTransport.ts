import { BASE_API_URL } from '../../utils/constants.ts';

const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

interface Options {
  data?: unknown;
  headers?: object;
}

interface OptionsWithMethod extends Options {
  method: string;
}

export class HTTPTransport {
  static API_URL = BASE_API_URL;

  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  public get<Response>(path = '/'): Promise<Response> {
    return this._request<Response>(this.endpoint + path);
  }

  public post<Response = void>(path: string, options?: Options): Promise<Response> {
    return this._request<Response>(this.endpoint + path, { ...options, method: METHOD.POST });
  }

  public put<Response = void>(path: string, options: Options): Promise<Response> {
    return this._request<Response>(this.endpoint + path, { ...options, method: METHOD.PUT });
  }

  public delete<Response = void>(path: string, options: Options): Promise<Response> {
    return this._request<Response>(this.endpoint + path, { ...options, method: METHOD.DELETE });
  }

  private _request<Response>(
    url: string,
    options: OptionsWithMethod = { method: METHOD.GET },
    timeout = 5000,
  ): Promise<Response> {
    const { method, data = {}, headers = {} } = options;

    const headersArrow = Object.entries(headers);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.timeout = timeout;

      xhr.ontimeout = () => {
        throw new Error('Timeout');
      };

      headersArrow.forEach(([key, value]) => xhr.setRequestHeader(key, value));
      if (!(data instanceof FormData)) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data instanceof FormData ? data : JSON.stringify(data));
      }
    });
  }
}

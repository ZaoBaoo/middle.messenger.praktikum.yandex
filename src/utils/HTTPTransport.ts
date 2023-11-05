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
  static API_URL = 'https://ya-praktikum.tech/api/v2';

  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  public get<Response>(url: string, options?: Options): Promise<Response> {
    return this._request<Response>(url, { ...options, method: METHOD.GET });
  }

  public post<Response = void>(url: string, options?: Options): Promise<Response> {
    return this._request<Response>(url, { ...options, method: METHOD.POST });
  }

  public put<Response = void>(url: string, options: Options): Promise<Response> {
    return this._request<Response>(url, { ...options, method: METHOD.PUT });
  }

  public delete<Response = void>(url: string, options: Options): Promise<Response> {
    return this._request<Response>(url, { ...options, method: METHOD.DELETE });
  }

  private _request<Response>(url: string, options: OptionsWithMethod, timeout = 5000): Promise<Response> {
    const { method, data = {}, headers = {} } = options;

    const headersArrow = Object.entries(headers);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.timeout = timeout;

      xhr.ontimeout = () => {
        throw new Error('Timeout');
      };

      headersArrow.forEach(([key, value]) => xhr.setRequestHeader(key, value));

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}

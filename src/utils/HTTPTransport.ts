const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

type DataType = Record<string, unknown>;

interface Options {
  data?: DataType;
  headers?: object;
}

interface OptionsWithMethod extends Options {
  method: string;
}

const queryStringify = (data: DataType) =>
  Object.entries(data)
    .map(([key, value]) => {
      value = typeof value === 'object' ? value!.toString() : value;
      return `${key}=${value}`;
    })
    .join('&');

export class HTTPTransport {
  get(url: string, options?: Options): Promise<XMLHttpRequest> {
    const urlWithQueryParams = queryStringify(options?.data || {});

    url = `${url}?${urlWithQueryParams}`;

    return this.request(url, { ...options, method: METHOD.GET });
  }

  post(url: string, options: Options): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.POST });
  }

  put(url: string, options: Options): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.PUT });
  }

  delete(url: string, options: Options): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.DELETE });
  }

  request(
    url: string,
    options: OptionsWithMethod,
    timeout = 5000,
  ): Promise<XMLHttpRequest> {
    const { method, data = {}, headers = {} } = options;

    const headersArrow = Object.entries(headers);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onload = () => {
        resolve(xhr);
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

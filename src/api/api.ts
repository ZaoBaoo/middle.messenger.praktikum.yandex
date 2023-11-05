import { HTTPTransport } from '../utils/HTTPTransport.ts';

export abstract class API {
  protected http: HTTPTransport;

  protected constructor(path: string) {
    this.http = new HTTPTransport(path);
  }
}

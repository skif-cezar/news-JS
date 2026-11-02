import { LoaderOptions, RequestParams, ResponseCallback, Endpoint } from '../../types';

class Loader {
  private baseLink: string;
  public options: Readonly<LoaderOptions>;

  constructor(baseLink: string, options: LoaderOptions) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp<T = unknown>(
    { endpoint, options = {} }: RequestParams,

    callback: ResponseCallback<T> = () => {
      console.error('No callback for GET response');
    }
  ): void {
    this.load('GET', endpoint, callback, options);
  }

  errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  makeUrl(options: object, endpoint: Endpoint): string {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  load<T = unknown>(
    method: string,
    endpoint: Endpoint,
    callback: ResponseCallback<T>,
    options: object = {}
  ): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data: T) => callback(data))
      .catch((err: Error) => console.error(err));
  }
}

export default Loader;

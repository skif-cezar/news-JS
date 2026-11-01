export interface LoaderOptions {
  [key: string]: string;
}

export enum Endpoint {
  EVERYTHING = 'everything',
  SOURCES = 'sources',
}

export interface RequestParams {
  endpoint: Endpoint;
  options?: object;
}

export type ResponseCallback<T = unknown> = (data: T) => void;

export interface ISource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface ISourcesResponse {
  status: string;
  sources: ISource[];
}

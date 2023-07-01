import { Request } from 'express';

export class UrlUtils {
  static getUrl(request: Request, apiUrl: string, apiPrefix: string): string {
    const path = this.getPath(request, apiPrefix);
    const endpoint = apiUrl + path;

    const url = UrlUtils.getUrlQueryParams(endpoint, request);

    return url;
  }

  static getUrlQueryParams(originalUrl: string, request: Request): string {
    const queryParams = request.query;

    if (!queryParams) return originalUrl;

    const url = new URL(originalUrl);
    const searchParams = new URLSearchParams(url.search);

    for (const [key, value] of Object.entries(request.query)) {
      if (Array.isArray(value)) {
        const val = value as string[];

        val.forEach((item) => searchParams.append(key, item));
      } else {
        searchParams.set(key, value as string);
      }
    }

    url.search = searchParams.toString();

    return url.toString();
  }

  static getPath(request: Request, apiPrefix: string) {
    const [, path] = request.path.split('/' + apiPrefix);

    return path;
  }
}

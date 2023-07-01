import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class RedirectService {
  constructor(private readonly httpService: HttpService) {}

  async redirect(request: Request, url: string) {
    try {
      const bodyContentLength = Buffer.byteLength(JSON.stringify(request.body));
      const user = JSON.stringify(request['user']);

      const response = await firstValueFrom(
        this.httpService.request({
          method: request.method,
          url,
          data: request.body,
          headers: {
            ...request.headers,
            'Content-Length': bodyContentLength,
            user,
          },
        }),
      );

      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;

      let parsedMsg = message;
      try {
        parsedMsg = JSON.parse(message);
      } catch (err) {}

      throw new HttpException(parsedMsg, status);
    }
  }
}

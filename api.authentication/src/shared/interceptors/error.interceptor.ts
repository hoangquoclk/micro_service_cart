import {
  CallHandler,
  ExecutionContext,
  HttpException,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';

import { DateFormat } from '@shared/utils/date-format.shared';
import { AppError } from '@shared/errors/app.error';

export class ErrorInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((error) => {
        const date = DateFormat.formatDate(new Date());

        if (error instanceof AppError || error instanceof HttpException) {
          console.error(`[${date}] - [Exception]: ${error.message}`);

          return throwError(() => error);
        }

        console.error(`[${date}] - [Internal Server Error]: ${error.message}`);

        return throwError(
          () => new InternalServerErrorException('Internal server error'),
        );
      }),
    );
  }
}

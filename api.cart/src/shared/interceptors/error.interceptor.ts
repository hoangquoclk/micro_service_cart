import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
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

        if (error instanceof HttpException) {
          console.error(`[${date}] - [HttpException]: ${error.message}`);

          return throwError(
            () =>
              new HttpException(
                JSON.stringify(error.getResponse()),
                error.getStatus(),
              ),
          );
        }

        if (error instanceof AppError) {
          console.error(`[${date}] - [AppError]: ${error.message}`);

          return throwError(
            () =>
              new HttpException(
                JSON.stringify(error.message),
                error.statusCode,
              ),
          );
        }

        console.error(`[${date}] - [Internal Server Error]: ${error.message}`);

        return throwError(
          () =>
            new HttpException(
              'Internal Server Error',
              HttpStatus.INTERNAL_SERVER_ERROR,
            ),
        );
      }),
    );
  }
}

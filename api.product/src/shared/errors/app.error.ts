import { HttpStatus } from '@nestjs/common';

export class AppError extends Error {
  public readonly message: string;
  public readonly statusCode: HttpStatus;

  constructor(statusCode: HttpStatus, message = '') {
    super(message);

    if (!message) {
      message = HttpStatus[statusCode];
    }

    this.message = message;
    this.statusCode = statusCode;
  }
}

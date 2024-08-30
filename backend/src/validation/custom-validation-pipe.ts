import { ValidationPipe, ValidationError, BadRequestException } from '@nestjs/common';

export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map(error => {
          const constraints = Object.values(error.constraints);
          return constraints.join(', ');
        });
        return new BadRequestException({
          statusCode: 400,
          timestamp: new Date().toISOString(),
          message: messages,
        });
      },
    });
  }
}
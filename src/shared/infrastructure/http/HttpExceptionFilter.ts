import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface ValidationResponse {
  message: string[];
  error: string;
  statusCode: number;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status = exception.getStatus();
    const errorMessage = exception.message;
    const details = exception.getResponse() as ValidationResponse;

    response.status(status).json({
      statusCode: status,
      httpMethod: request.method,
      message: errorMessage,
      details: Array.isArray(details?.message) ? details.message : [],
      path: request.url,
      timeStamp: new Date().toISOString(),
    });
  }
}

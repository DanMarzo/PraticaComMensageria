import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class TracingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: Error | any) => void) {
    const { transactionid } = req.headers;
    if (!transactionid) {
      return res.status(400).json({
        status: 400,
        message: 'The transaction Id header is required',
      });
    }
    req.headers.serviceid = uuidV4();
    next();
  }
}

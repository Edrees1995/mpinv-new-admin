import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const session = req.session as any;

    // Set user info in res.locals so templates can access it
    if (session?.userId) {
      res.locals.user = {
        id: session.userId,
        email: session.userEmail,
        name: session.userName,
      };
    }

    // Skip auth check for login/logout routes and API routes
    const url = req.originalUrl || req.url;
    if (url.startsWith('/auth') || url.startsWith('/api/')) {
      return next();
    }

    // Check if user is logged in
    if (!session?.userId) {
      return res.redirect('/auth/login');
    }

    next();
  }
}

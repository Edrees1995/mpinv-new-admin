import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Body,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  loginPage(@Req() req, @Res() res) {
    const request = req as Request;
    const response = res as Response;

    // Already logged in? Go to dashboard
    if ((request.session as any)?.userId) {
      return response.redirect('/');
    }
    return response.render('auth/login', {
      layout: false,
      error: null,
    });
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Req() req,
    @Res() res,
  ) {
    const request = req as Request;
    const response = res as Response;
    const { email, password } = body;

    if (!email || !password) {
      return response.render('auth/login', {
        layout: false,
        error: 'Email and password are required.',
        email,
      });
    }

    const user = await this.authService.validateUser(email, password);

    if (!user) {
      return response.render('auth/login', {
        layout: false,
        error: 'Invalid email or password.',
        email,
      });
    }

    // Set session
    const session = request.session as any;
    session.userId = user.id;
    session.userEmail = user.email;
    session.userName = `${user.first_name || ''} ${user.last_name || ''}`.trim();

    // Update last login time
    await this.authService.updateLastLogin(user.id);

    return response.redirect('/');
  }

  @Get('logout')
  logout(@Req() req, @Res() res) {
    const request = req as Request;
    const response = res as Response;

    request.session.destroy(() => {
      response.redirect('/auth/login');
    });
  }
}

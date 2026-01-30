import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Render,
  Res,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import { AdminUsersService } from './admin-users.service';

@Controller('users')
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Get()
  @Render('users/admin-list')
  async list() {
    const users = await this.adminUsersService.findAll();
    return { title: 'Admin Users', users };
  }

  @Get('create')
  @Render('users/admin-create')
  createForm() {
    return { title: 'Add Admin User' };
  }

  @Get(':id')
  @Render('users/admin-view')
  async view(@Param('id', ParseIntPipe) id: number) {
    const user = await this.adminUsersService.findOne(id);
    return { title: `${user.first_name} ${user.last_name}`, user };
  }

  @Get(':id/edit')
  @Render('users/admin-edit')
  async editForm(@Param('id', ParseIntPipe) id: number) {
    const user = await this.adminUsersService.findOne(id);
    return { title: `Edit: ${user.first_name} ${user.last_name}`, user };
  }

  @Post()
  async create(@Body() body: any, @Res() res) {
    const response = res as Response;
    try {
      const data: Partial<any> = {
        first_name: body.first_name,
        last_name: body.last_name || '',
        email: body.email,
        password: body.password,
        status: body.status || 'active',
        timezone: body.timezone || '',
      };
      const user = await this.adminUsersService.create(data);
      return response.redirect(`/users/${user.id}`);
    } catch (error) {
      return response.redirect(
        '/users/create?error=' + encodeURIComponent(error.message),
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
    @Res() res,
  ) {
    const response = res as Response;
    try {
      const data: any = {};
      if (body.first_name !== undefined) data.first_name = body.first_name;
      if (body.last_name !== undefined) data.last_name = body.last_name;
      if (body.email !== undefined) data.email = body.email;
      if (body.password !== undefined) data.password = body.password;
      if (body.status !== undefined) data.status = body.status;
      if (body.timezone !== undefined) data.timezone = body.timezone;

      await this.adminUsersService.update(id, data);
      return response.redirect(`/users/${id}`);
    } catch (error) {
      return response.redirect(
        `/users/${id}/edit?error=` + encodeURIComponent(error.message),
      );
    }
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Res() res,
  ) {
    const response = res as Response;
    try {
      await this.adminUsersService.remove(id);
      if (response.req.headers['hx-request']) {
        return response.status(HttpStatus.OK).send('');
      }
      return response.redirect('/users');
    } catch (error) {
      if (response.req.headers['hx-request']) {
        return response.status(HttpStatus.BAD_REQUEST).send(error.message);
      }
      return response.redirect(
        '/users?error=' + encodeURIComponent(error.message),
      );
    }
  }
}

import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Render,
  Res,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import { ListingUsersService } from './listing-users.service';

@Controller('listing-users')
export class ListingUsersController {
  constructor(
    private readonly listingUsersService: ListingUsersService,
  ) {}

  @Get()
  @Render('users/listing-list')
  async list(
    @Query('page') page?: string,
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('trashed') trashed?: string,
  ) {
    const currentPage = parseInt(page || '1', 10);
    const showTrashed = trashed === '1';
    const result = await this.listingUsersService.findAll(
      currentPage,
      20,
      search,
      status,
      showTrashed,
    );

    const totalPages = result.totalPages;
    const pages: Array<
      { number: number; active: boolean } | { ellipsis: true }
    > = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 2 && i <= currentPage + 2)
      ) {
        pages.push({ number: i, active: i === currentPage });
      } else if (
        pages.length > 0 &&
        !('ellipsis' in pages[pages.length - 1])
      ) {
        pages.push({ ellipsis: true });
      }
    }

    return {
      title: 'Listing Users',
      users: result.data,
      pagination: {
        page: currentPage,
        totalPages,
        total: result.total,
        pages,
        hasNext: currentPage < totalPages,
        hasPrev: currentPage > 1,
        prevPage: currentPage - 1,
        nextPage: currentPage + 1,
      },
      filters: {
        search: search || '',
        status: status || '',
        trashed: trashed || '',
      },
    };
  }

  @Get(':id')
  @Render('users/listing-view')
  async view(@Param('id', ParseIntPipe) id: number) {
    const user = await this.listingUsersService.findOne(id);
    return {
      title: `${user.first_name || ''} ${user.last_name || ''}`.trim(),
      user,
    };
  }

  @Get(':id/edit')
  @Render('users/listing-edit')
  async editForm(@Param('id', ParseIntPipe) id: number) {
    const user = await this.listingUsersService.findOne(id);
    return {
      title: `Edit: ${user.first_name || ''} ${user.last_name || ''}`.trim(),
      user,
    };
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
      if (body.phone !== undefined) data.phone = body.phone;
      if (body.mobile !== undefined) data.mobile = body.mobile;
      if (body.address !== undefined) data.address = body.address;
      if (body.city !== undefined) data.city = body.city;
      if (body.state !== undefined) data.state = body.state;
      if (body.designation !== undefined) data.designation = body.designation;
      if (body.brn_number !== undefined) data.brn_number = body.brn_number;
      if (body.langauges_known !== undefined)
        data.langauges_known = body.langauges_known;
      if (body.status !== undefined) data.status = body.status;
      if (body.slug !== undefined) data.slug = body.slug;

      await this.listingUsersService.update(id, data);
      return response.redirect(`/listing-users/${id}`);
    } catch (error) {
      return response.redirect(
        `/listing-users/${id}/edit?error=` +
          encodeURIComponent(error.message),
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
      await this.listingUsersService.remove(id);
      if (response.req.headers['hx-request']) {
        return response.status(HttpStatus.OK).send('');
      }
      return response.redirect('/listing-users');
    } catch (error) {
      if (response.req.headers['hx-request']) {
        return response.status(HttpStatus.BAD_REQUEST).send(error.message);
      }
      return response.redirect(
        '/listing-users?error=' + encodeURIComponent(error.message),
      );
    }
  }
}

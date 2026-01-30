import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Query,
  Render,
  Res,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  @Render('contacts/list')
  async list(
    @Query('page') page?: string,
    @Query('search') search?: string,
    @Query('type') contactType?: string,
    @Query('status') readStatus?: string,
  ) {
    const currentPage = parseInt(page || '1', 10);
    const result = await this.contactsService.findAll(
      currentPage,
      20,
      search,
      contactType,
      readStatus,
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
      title: 'Contact Inquiries',
      contacts: result.data,
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
        type: contactType || '',
        status: readStatus || '',
      },
    };
  }

  @Get(':id')
  @Render('contacts/view')
  async view(@Param('id', ParseIntPipe) id: number) {
    const contact = await this.contactsService.findOne(id);
    // Auto-mark as read when viewed
    if (!contact.is_read) {
      await this.contactsService.markAsRead(id);
      contact.is_read = '1';
    }
    return { title: `Inquiry from ${contact.name}`, contact };
  }

  @Post(':id/mark-read')
  async markRead(
    @Param('id', ParseIntPipe) id: number,
    @Res() res,
  ) {
    const response = res as Response;
    await this.contactsService.markAsRead(id);
    if (response.req.headers['hx-request']) {
      return response.status(HttpStatus.OK).send('');
    }
    return response.redirect(`/contacts/${id}`);
  }

  @Post(':id/mark-unread')
  async markUnread(
    @Param('id', ParseIntPipe) id: number,
    @Res() res,
  ) {
    const response = res as Response;
    await this.contactsService.markAsUnread(id);
    if (response.req.headers['hx-request']) {
      return response.status(HttpStatus.OK).send('');
    }
    return response.redirect(`/contacts/${id}`);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Res() res,
  ) {
    const response = res as Response;
    try {
      await this.contactsService.remove(id);
      if (response.req.headers['hx-request']) {
        return response.status(HttpStatus.OK).send('');
      }
      return response.redirect('/contacts');
    } catch (error) {
      if (response.req.headers['hx-request']) {
        return response.status(HttpStatus.BAD_REQUEST).send(error.message);
      }
      return response.redirect(
        '/contacts?error=' + encodeURIComponent(error.message),
      );
    }
  }
}

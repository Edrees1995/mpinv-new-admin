import {
  Controller,
  Get,
  Post,
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
import { FaqsService } from './faqs.service';

@Controller('faqs')
export class FaqsController {
  constructor(private readonly faqsService: FaqsService) {}

  @Get()
  @Render('faqs/list')
  async list(
    @Query('page') page?: string,
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    const currentPage = parseInt(page || '1', 10);
    const result = await this.faqsService.findAll(
      currentPage,
      20,
      search,
      status,
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
      title: 'FAQs',
      faqs: result.data,
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
      filters: { search: search || '', status: status || '' },
    };
  }

  @Get('create')
  @Render('faqs/create')
  createForm() {
    return { title: 'Create FAQ' };
  }

  @Get(':id')
  @Render('faqs/view')
  async view(@Param('id', ParseIntPipe) id: number) {
    const faq = await this.faqsService.findOne(id);
    return { title: faq.title, faq };
  }

  @Get(':id/edit')
  @Render('faqs/edit')
  async editForm(@Param('id', ParseIntPipe) id: number) {
    const faq = await this.faqsService.findOne(id);
    return { title: `Edit: ${faq.title}`, faq };
  }

  @Post()
  async create(@Body() body: any, @Res() res) {
    const response = res as Response;
    try {
      const data = {
        title: body.title,
        slug: body.slug || '',
        content: body.content || '',
        status: body.status || 'published',
        priority: body.priority ? parseInt(body.priority, 10) : 0,
        page_title: body.page_title || '',
        meta_title: body.meta_title || '',
        meta_description: body.meta_description || '',
        meta_keywords: body.meta_keywords || '',
      };

      const faq = await this.faqsService.create(data);
      return response.redirect(`/faqs/${faq.id}`);
    } catch (error) {
      return response.redirect(
        '/faqs/create?error=' + encodeURIComponent(error.message),
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
      if (body.title !== undefined) data.title = body.title;
      if (body.slug !== undefined) data.slug = body.slug;
      if (body.content !== undefined) data.content = body.content;
      if (body.status !== undefined) data.status = body.status;
      if (body.priority !== undefined)
        data.priority = parseInt(body.priority, 10);
      if (body.page_title !== undefined) data.page_title = body.page_title;
      if (body.meta_title !== undefined) data.meta_title = body.meta_title;
      if (body.meta_description !== undefined)
        data.meta_description = body.meta_description;
      if (body.meta_keywords !== undefined)
        data.meta_keywords = body.meta_keywords;

      await this.faqsService.update(id, data);
      return response.redirect(`/faqs/${id}`);
    } catch (error) {
      return response.redirect(
        `/faqs/${id}/edit?error=` + encodeURIComponent(error.message),
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
      await this.faqsService.remove(id);
      if (response.req.headers['hx-request']) {
        return response.status(HttpStatus.OK).send('');
      }
      return response.redirect('/faqs');
    } catch (error) {
      if (response.req.headers['hx-request']) {
        return response.status(HttpStatus.BAD_REQUEST).send(error.message);
      }
      return response.redirect(
        '/faqs?error=' + encodeURIComponent(error.message),
      );
    }
  }
}

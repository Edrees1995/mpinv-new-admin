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
} from '@nestjs/common';
import type { Response } from 'express';
import { ArticlesService } from './articles.service';

function escapeHtml(text: string | null | undefined): string {
  if (!text) return '';
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char]);
}

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  @Render('articles/list')
  async list(
    @Query('page') page?: string,
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('type') type?: string,
  ) {
    const currentPage = parseInt(page || '1', 10);
    const result = await this.articlesService.findAll(
      currentPage,
      20,
      search,
      status,
      type,
    );

    const totalPages = result.totalPages;
    const pages: Array<{ number: number; active: boolean } | { ellipsis: true }> = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
        pages.push({ number: i, active: i === currentPage });
      } else if (pages.length > 0 && !('ellipsis' in pages[pages.length - 1])) {
        pages.push({ ellipsis: true });
      }
    }

    return {
      title: 'Articles',
      articles: result.data,
      pagination: {
        page: currentPage,
        totalPages,
        total: result.total,
        hasPrev: currentPage > 1,
        hasNext: currentPage < totalPages,
        prevPage: currentPage - 1,
        nextPage: currentPage + 1,
        pages,
      },
      filters: { search, status, type },
    };
  }

  @Get('create')
  @Render('articles/create')
  async createForm() {
    return { title: 'Create Article' };
  }

  @Get(':id')
  @Render('articles/view')
  async view(@Param('id', ParseIntPipe) id: number) {
    const article = await this.articlesService.findOne(id);
    return { title: article.title, article };
  }

  @Get(':id/edit')
  @Render('articles/edit')
  async editForm(@Param('id', ParseIntPipe) id: number) {
    const article = await this.articlesService.findOne(id);
    return { title: `Edit: ${article.title}`, article };
  }

  @Post()
  async create(@Body() body: any, @Res() res) {
    const response = res as Response;
    const data = {
      title: body.title,
      subtitle: body.subtitle || '',
      slug: body.slug || '',
      content: body.content || '',
      status: body.status || 'published',
      page_title: body.page_title || '',
      meta_title: body.meta_title || '',
      meta_description: body.meta_description || '',
      meta_keywords: body.meta_keywords || '',
      reading_time: body.reading_time || null,
      youtube_url: body.youtube_url || null,
      type: body.type || null,
    };

    const article = await this.articlesService.create(data);
    return response.redirect(`/articles/${article.id}`);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
    @Res() res,
  ) {
    const response = res as Response;
    const data: any = {};

    if (body.title !== undefined) data.title = body.title;
    if (body.subtitle !== undefined) data.subtitle = body.subtitle;
    if (body.slug !== undefined) data.slug = body.slug;
    if (body.content !== undefined) data.content = body.content;
    if (body.status !== undefined) data.status = body.status;
    if (body.page_title !== undefined) data.page_title = body.page_title;
    if (body.meta_title !== undefined) data.meta_title = body.meta_title;
    if (body.meta_description !== undefined) data.meta_description = body.meta_description;
    if (body.meta_keywords !== undefined) data.meta_keywords = body.meta_keywords;
    if (body.reading_time !== undefined) data.reading_time = body.reading_time;
    if (body.youtube_url !== undefined) data.youtube_url = body.youtube_url;
    if (body.type !== undefined) data.type = body.type;

    await this.articlesService.update(id, data);
    return response.redirect(`/articles/${id}`);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Res() res,
  ) {
    const response = res as Response;
    await this.articlesService.remove(id);
    response.setHeader('HX-Redirect', '/articles');
    return response.status(200).send('');
  }
}

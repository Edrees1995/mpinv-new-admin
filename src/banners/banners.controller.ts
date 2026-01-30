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
import { BannersService } from './banners.service';
import type { CreateBannerDto, UpdateBannerDto } from './banners.service';

@Controller('banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Get()
  @Render('banners/list')
  async list(
    @Query('page') page?: string,
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('ad_type') adType?: string,
  ) {
    const pageNum = parseInt(page || '1', 10);
    const limit = 10;

    const result = await this.bannersService.findAll(
      pageNum,
      limit,
      search,
      status,
      adType,
    );

    const pages: Array<
      { number: number; active: boolean } | { ellipsis: true }
    > = [];
    const totalPg = result.totalPages;
    const current = result.page;
    for (let i = 1; i <= totalPg; i++) {
      if (
        i === 1 ||
        i === totalPg ||
        (i >= current - 2 && i <= current + 2)
      ) {
        pages.push({ number: i, active: i === current });
      } else if (
        pages.length > 0 &&
        !('ellipsis' in pages[pages.length - 1])
      ) {
        pages.push({ ellipsis: true });
      }
    }

    return {
      title: 'Banners',
      banners: result.data,
      pagination: {
        page: result.page,
        totalPages: result.totalPages,
        total: result.total,
        pages,
        hasNext: result.page < result.totalPages,
        hasPrev: result.page > 1,
        prevPage: result.page - 1,
        nextPage: result.page + 1,
      },
      filters: {
        search: search || '',
        status: status || '',
        ad_type: adType || '',
      },
    };
  }

  @Get('create')
  @Render('banners/create')
  createForm() {
    return { title: 'Create Banner' };
  }

  @Get(':id')
  @Render('banners/view')
  async view(@Param('id', ParseIntPipe) id: number) {
    const banner = await this.bannersService.findOne(id);
    return { title: `Banner #${banner.id}`, banner };
  }

  @Get(':id/edit')
  @Render('banners/edit')
  async editForm(@Param('id', ParseIntPipe) id: number) {
    const banner = await this.bannersService.findOne(id);
    return { title: `Edit Banner #${banner.id}`, banner };
  }

  @Post()
  async create(@Body() body: any, @Res() res) {
    const response = res as Response;
    try {
      const dto: CreateBannerDto = {
        position_id: body.position_id ? parseInt(body.position_id, 10) : 0,
        image: body.image || '',
        status: body.status || 'A',
        priority: body.priority ? parseInt(body.priority, 10) : 0,
        link: body.link || '',
        ad_type: body.ad_type || 'adImage',
        script: body.script || '',
      };
      const banner = await this.bannersService.create(dto);
      return response.redirect(`/banners/${banner.id}`);
    } catch (error) {
      return response.redirect(
        '/banners/create?error=' + encodeURIComponent(error.message),
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
      const dto: UpdateBannerDto = {};
      if (body.position_id !== undefined)
        dto.position_id = parseInt(body.position_id, 10);
      if (body.image !== undefined) dto.image = body.image;
      if (body.status !== undefined) dto.status = body.status;
      if (body.priority !== undefined)
        dto.priority = parseInt(body.priority, 10);
      if (body.link !== undefined) dto.link = body.link;
      if (body.ad_type !== undefined) dto.ad_type = body.ad_type;
      if (body.script !== undefined) dto.script = body.script;

      await this.bannersService.update(id, dto);
      return response.redirect(`/banners/${id}`);
    } catch (error) {
      return response.redirect(
        `/banners/${id}/edit?error=` + encodeURIComponent(error.message),
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
      await this.bannersService.remove(id);
      if (response.req.headers['hx-request']) {
        return response.status(HttpStatus.OK).send('');
      }
      return response.redirect('/banners');
    } catch (error) {
      if (response.req.headers['hx-request']) {
        return response.status(HttpStatus.BAD_REQUEST).send(error.message);
      }
      return response.redirect(
        '/banners?error=' + encodeURIComponent(error.message),
      );
    }
  }
}

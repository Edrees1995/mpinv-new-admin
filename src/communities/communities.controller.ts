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
  Redirect,
  Res,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import { CommunitiesService } from './communities.service';
import type { CreateCommunityDto, UpdateCommunityDto } from './communities.service';

@Controller('communities')
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Get()
  @Render('communities/list')
  async list(
    @Query('page') page?: string,
    @Query('search') search?: string,
  ) {
    const pageNum = parseInt(page || '1', 10);
    const limit = 10;

    const result = await this.communitiesService.findAll(pageNum, limit, search);

    // Generate truncated pagination array
    const pages: Array<{ number: number; active: boolean; ellipsis?: boolean }> = [];
    const totalPg = result.totalPages;
    const current = result.page;
    if (totalPg <= 7) {
      for (let i = 1; i <= totalPg; i++) {
        pages.push({ number: i, active: i === current });
      }
    } else {
      pages.push({ number: 1, active: current === 1 });
      if (current > 3) pages.push({ number: 0, active: false, ellipsis: true });
      const start = Math.max(2, current - 1);
      const end = Math.min(totalPg - 1, current + 1);
      for (let i = start; i <= end; i++) {
        pages.push({ number: i, active: i === current });
      }
      if (current < totalPg - 2) pages.push({ number: 0, active: false, ellipsis: true });
      pages.push({ number: totalPg, active: current === totalPg });
    }

    return {
      title: 'Communities',
      communities: result.data,
      pagination: {
        page: result.page,
        totalPages: result.totalPages,
        total: result.total,
        limit: result.limit,
        pages,
        hasNext: result.page < result.totalPages,
        hasPrev: result.page > 1,
        prevPage: result.page - 1,
        nextPage: result.page + 1,
      },
      search: search || '',
    };
  }

  @Get('create')
  @Render('communities/create')
  createForm() {
    return {
      title: 'Create Community',
    };
  }

  @Post()
  async create(
    @Body() createDto: CreateCommunityDto,
    @Res() res: Response,
  ) {
    try {
      await this.communitiesService.create(createDto);
      return res.redirect('/communities?success=Community created successfully');
    } catch (error) {
      return res.redirect('/communities/create?error=' + encodeURIComponent(error.message));
    }
  }

  @Get(':id')
  @Render('communities/view')
  async view(@Param('id', ParseIntPipe) id: number) {
    const community = await this.communitiesService.findOne(id);
    const subCommunities = await this.communitiesService.getSubCommunities(id);

    return {
      title: community.name,
      community,
      subCommunities,
    };
  }

  @Get(':id/edit')
  @Render('communities/edit')
  async editForm(@Param('id', ParseIntPipe) id: number) {
    const community = await this.communitiesService.findOne(id);

    return {
      title: `Edit ${community.name}`,
      community,
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateCommunityDto,
    @Res() res: Response,
  ) {
    try {
      await this.communitiesService.update(id, updateDto);
      return res.redirect(`/communities/${id}?success=Community updated successfully`);
    } catch (error) {
      return res.redirect(`/communities/${id}/edit?error=` + encodeURIComponent(error.message));
    }
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    try {
      await this.communitiesService.remove(id);
      // For HTMX requests, return empty response
      if (res.req.headers['hx-request']) {
        return res.status(HttpStatus.OK).send('');
      }
      return res.redirect('/communities?success=Community deleted successfully');
    } catch (error) {
      if (res.req.headers['hx-request']) {
        return res.status(HttpStatus.BAD_REQUEST).send(error.message);
      }
      return res.redirect('/communities?error=' + encodeURIComponent(error.message));
    }
  }

  // API endpoint for HTMX table updates
  @Get('api/table')
  @Render('communities/partials/table')
  async getTable(
    @Query('page') page?: string,
    @Query('search') search?: string,
  ) {
    const pageNum = parseInt(page || '1', 10);
    const limit = 10;

    const result = await this.communitiesService.findAll(pageNum, limit, search);

    // Generate truncated pagination array
    const pages2: Array<{ number: number; active: boolean; ellipsis?: boolean }> = [];
    const totalPg2 = result.totalPages;
    const current2 = result.page;
    if (totalPg2 <= 7) {
      for (let i = 1; i <= totalPg2; i++) {
        pages2.push({ number: i, active: i === current2 });
      }
    } else {
      pages2.push({ number: 1, active: current2 === 1 });
      if (current2 > 3) pages2.push({ number: 0, active: false, ellipsis: true });
      const start = Math.max(2, current2 - 1);
      const end = Math.min(totalPg2 - 1, current2 + 1);
      for (let i = start; i <= end; i++) {
        pages2.push({ number: i, active: i === current2 });
      }
      if (current2 < totalPg2 - 2) pages2.push({ number: 0, active: false, ellipsis: true });
      pages2.push({ number: totalPg2, active: current2 === totalPg2 });
    }

    return {
      communities: result.data,
      pagination: {
        page: result.page,
        totalPages: result.totalPages,
        total: result.total,
        limit: result.limit,
        pages: pages2,
        hasNext: result.page < result.totalPages,
        hasPrev: result.page > 1,
        prevPage: result.page - 1,
        nextPage: result.page + 1,
      },
      search: search || '',
      layout: false,
    };
  }
}

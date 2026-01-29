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
import { SubCommunitiesService } from './sub-communities.service';
import type {
  CreateSubCommunityDto,
  UpdateSubCommunityDto,
} from './sub-communities.service';

@Controller('sub-communities')
export class SubCommunitiesController {
  constructor(private readonly subCommunitiesService: SubCommunitiesService) {}

  @Get()
  @Render('sub-communities/list')
  async list(
    @Query('page') page?: string,
    @Query('search') search?: string,
    @Query('community_id') communityId?: string,
  ) {
    const pageNum = parseInt(page || '1', 10);
    const limit = 10;
    const communityIdNum = communityId ? parseInt(communityId, 10) : undefined;

    const result = await this.subCommunitiesService.findAll(
      pageNum,
      limit,
      search,
      communityIdNum,
    );

    const communities = await this.subCommunitiesService.getAllCommunities();

    // Generate truncated pagination array
    const pages: Array<{ number: number; active: boolean; ellipsis?: boolean }> = [];
    const totalPg = result.totalPages;
    const current = result.page;
    if (totalPg <= 7) {
      for (let i = 1; i <= totalPg; i++) pages.push({ number: i, active: i === current });
    } else {
      pages.push({ number: 1, active: current === 1 });
      if (current > 3) pages.push({ number: 0, active: false, ellipsis: true });
      const s = Math.max(2, current - 1), e = Math.min(totalPg - 1, current + 1);
      for (let i = s; i <= e; i++) pages.push({ number: i, active: i === current });
      if (current < totalPg - 2) pages.push({ number: 0, active: false, ellipsis: true });
      pages.push({ number: totalPg, active: current === totalPg });
    }

    return {
      title: 'Sub-Communities',
      subCommunities: result.data,
      communities,
      pagination: {
        page: result.page,
        totalPages: result.totalPages,
        total: result.total,
        limit: result.limit,
        pages,
        hasNext: result.page < result.totalPages,
        hasPrev: result.page > 1,
        nextPage: result.page + 1,
        prevPage: result.page - 1,
      },
      filters: {
        search: search || '',
        community_id: communityIdNum,
      },
    };
  }

  @Get('create')
  @Render('sub-communities/create')
  async createForm() {
    const communities = await this.subCommunitiesService.getAllCommunities();

    return {
      title: 'Create Sub-Community',
      communities,
    };
  }

  @Post()
  async create(@Body() createDto: CreateSubCommunityDto, @Res() res: Response) {
    try {
      // Parse numeric values
      if (createDto.community_id) {
        createDto.community_id = Number(createDto.community_id);
      }

      await this.subCommunitiesService.create(createDto);
      return res.redirect(
        '/sub-communities?success=Sub-Community created successfully',
      );
    } catch (error) {
      return res.redirect(
        '/sub-communities/create?error=' + encodeURIComponent(error.message),
      );
    }
  }

  @Get(':id')
  @Render('sub-communities/view')
  async view(@Param('id', ParseIntPipe) id: number) {
    const subCommunity = await this.subCommunitiesService.findOne(id);

    return {
      title: subCommunity.name,
      subCommunity,
    };
  }

  @Get(':id/edit')
  @Render('sub-communities/edit')
  async editForm(@Param('id', ParseIntPipe) id: number) {
    const subCommunity = await this.subCommunitiesService.findOne(id);
    const communities = await this.subCommunitiesService.getAllCommunities();

    return {
      title: `Edit ${subCommunity.name}`,
      subCommunity,
      communities,
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateSubCommunityDto,
    @Res() res: Response,
  ) {
    try {
      // Parse numeric values
      if (updateDto.community_id) {
        updateDto.community_id = Number(updateDto.community_id);
      }

      await this.subCommunitiesService.update(id, updateDto);
      return res.redirect(
        `/sub-communities/${id}?success=Sub-Community updated successfully`,
      );
    } catch (error) {
      return res.redirect(
        `/sub-communities/${id}/edit?error=` + encodeURIComponent(error.message),
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    try {
      await this.subCommunitiesService.remove(id);
      // For HTMX requests, return empty response
      if (res.req.headers['hx-request']) {
        return res.status(HttpStatus.OK).send('');
      }
      return res.redirect(
        '/sub-communities?success=Sub-Community deleted successfully',
      );
    } catch (error) {
      if (res.req.headers['hx-request']) {
        return res.status(HttpStatus.BAD_REQUEST).send(error.message);
      }
      return res.redirect(
        '/sub-communities?error=' + encodeURIComponent(error.message),
      );
    }
  }

  // API endpoint for HTMX table updates
  @Get('api/table')
  @Render('sub-communities/partials/table')
  async getTable(
    @Query('page') page?: string,
    @Query('search') search?: string,
    @Query('community_id') communityId?: string,
  ) {
    const pageNum = parseInt(page || '1', 10);
    const limit = 10;
    const communityIdNum = communityId ? parseInt(communityId, 10) : undefined;

    const result = await this.subCommunitiesService.findAll(
      pageNum,
      limit,
      search,
      communityIdNum,
    );

    const pages2: Array<{ number: number; active: boolean; ellipsis?: boolean }> = [];
    const tp = result.totalPages;
    const cp = result.page;
    if (tp <= 7) {
      for (let i = 1; i <= tp; i++) pages2.push({ number: i, active: i === cp });
    } else {
      pages2.push({ number: 1, active: cp === 1 });
      if (cp > 3) pages2.push({ number: 0, active: false, ellipsis: true });
      const s = Math.max(2, cp - 1), e = Math.min(tp - 1, cp + 1);
      for (let i = s; i <= e; i++) pages2.push({ number: i, active: i === cp });
      if (cp < tp - 2) pages2.push({ number: 0, active: false, ellipsis: true });
      pages2.push({ number: tp, active: cp === tp });
    }

    return {
      subCommunities: result.data,
      pagination: {
        page: result.page,
        totalPages: result.totalPages,
        total: result.total,
        limit: result.limit,
        pages: pages2,
        hasNext: result.page < result.totalPages,
        hasPrev: result.page > 1,
        nextPage: result.page + 1,
        prevPage: result.page - 1,
      },
      filters: {
        search: search || '',
        community_id: communityIdNum,
      },
      layout: false,
    };
  }

}

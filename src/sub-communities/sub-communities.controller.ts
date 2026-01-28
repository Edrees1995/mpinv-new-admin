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

    // Build pagination range
    const range = this.buildPaginationRange(result.page, result.totalPages);

    return {
      title: 'Sub-Communities',
      subCommunities: result.data,
      communities,
      pagination: {
        page: result.page,
        totalPages: result.totalPages,
        total: result.total,
        limit: result.limit,
        hasNext: result.page < result.totalPages,
        hasPrev: result.page > 1,
        nextPage: result.page + 1,
        prevPage: result.page - 1,
        range,
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

    const range = this.buildPaginationRange(result.page, result.totalPages);

    return {
      subCommunities: result.data,
      pagination: {
        page: result.page,
        totalPages: result.totalPages,
        total: result.total,
        limit: result.limit,
        hasNext: result.page < result.totalPages,
        hasPrev: result.page > 1,
        nextPage: result.page + 1,
        prevPage: result.page - 1,
        range,
      },
      filters: {
        search: search || '',
        community_id: communityIdNum,
      },
      layout: false,
    };
  }

  private buildPaginationRange(
    currentPage: number,
    totalPages: number,
  ): Array<{ page?: number; isEllipsis?: boolean; isCurrent?: boolean }> {
    const range: Array<{
      page?: number;
      isEllipsis?: boolean;
      isCurrent?: boolean;
    }> = [];
    const delta = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push({ page: i, isCurrent: i === currentPage });
      } else if (range.length > 0 && !range[range.length - 1].isEllipsis) {
        range.push({ isEllipsis: true });
      }
    }

    return range;
  }
}

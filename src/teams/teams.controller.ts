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
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  @Render('teams/list')
  async list(
    @Query('page') page?: string,
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('team_type') teamType?: string,
  ) {
    const currentPage = parseInt(page || '1', 10);
    const result = await this.teamsService.findAll(
      currentPage,
      20,
      search,
      status,
      teamType,
    );
    const teamTypes = await this.teamsService.getTeamTypes();

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
      title: 'Team Members',
      members: result.data,
      teamTypes,
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
        team_type: teamType || '',
      },
    };
  }

  @Get('create')
  @Render('teams/create')
  async createForm() {
    const teamTypes = await this.teamsService.getTeamTypes();
    return { title: 'Add Team Member', teamTypes };
  }

  @Get(':id')
  @Render('teams/view')
  async view(@Param('id', ParseIntPipe) id: number) {
    const member = await this.teamsService.findOne(id);
    return { title: member.title, member };
  }

  @Get(':id/edit')
  @Render('teams/edit')
  async editForm(@Param('id', ParseIntPipe) id: number) {
    const member = await this.teamsService.findOne(id);
    const teamTypes = await this.teamsService.getTeamTypes();
    return { title: `Edit: ${member.title}`, member, teamTypes };
  }

  @Post()
  async create(@Body() body: any, @Res() res) {
    const response = res as Response;
    try {
      const data: Partial<any> = {
        title: body.title,
        subtitle: body.subtitle || '',
        slug: body.slug || '',
        content: body.content || '',
        team_type: body.team_type || '',
        banner: body.banner || '',
        phone: body.phone || '',
        mobile: body.mobile || '',
        linked_in: body.linked_in || '',
        facebook: body.facebook || '',
        insta: body.insta || '',
        twitter: body.twitter || '',
        telegram: body.telegram || '',
        status: body.status || 'published',
        priority: body.priority ? parseInt(body.priority, 10) : 0,
        meta_title: body.meta_title || '',
        meta_description: body.meta_description || '',
      };

      const member = await this.teamsService.create(data);
      return response.redirect(`/teams/${member.id}`);
    } catch (error) {
      return response.redirect(
        '/teams/create?error=' + encodeURIComponent(error.message),
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
      if (body.subtitle !== undefined) data.subtitle = body.subtitle;
      if (body.slug !== undefined) data.slug = body.slug;
      if (body.content !== undefined) data.content = body.content;
      if (body.team_type !== undefined) data.team_type = body.team_type;
      if (body.banner !== undefined) data.banner = body.banner;
      if (body.phone !== undefined) data.phone = body.phone;
      if (body.mobile !== undefined) data.mobile = body.mobile;
      if (body.linked_in !== undefined) data.linked_in = body.linked_in;
      if (body.facebook !== undefined) data.facebook = body.facebook;
      if (body.insta !== undefined) data.insta = body.insta;
      if (body.twitter !== undefined) data.twitter = body.twitter;
      if (body.telegram !== undefined) data.telegram = body.telegram;
      if (body.status !== undefined) data.status = body.status;
      if (body.priority !== undefined)
        data.priority = parseInt(body.priority, 10);
      if (body.meta_title !== undefined) data.meta_title = body.meta_title;
      if (body.meta_description !== undefined)
        data.meta_description = body.meta_description;

      await this.teamsService.update(id, data);
      return response.redirect(`/teams/${id}`);
    } catch (error) {
      return response.redirect(
        `/teams/${id}/edit?error=` + encodeURIComponent(error.message),
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
      await this.teamsService.remove(id);
      if (response.req.headers['hx-request']) {
        return response.status(HttpStatus.OK).send('');
      }
      return response.redirect('/teams');
    } catch (error) {
      if (response.req.headers['hx-request']) {
        return response.status(HttpStatus.BAD_REQUEST).send(error.message);
      }
      return response.redirect(
        '/teams?error=' + encodeURIComponent(error.message),
      );
    }
  }
}

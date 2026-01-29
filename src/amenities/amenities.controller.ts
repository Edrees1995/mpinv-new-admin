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
import { AmenitiesService } from './amenities.service';
import type {
  CreateAmenityDto,
  UpdateAmenityDto,
} from './amenities.service';

@Controller('amenities')
export class AmenitiesController {
  constructor(private readonly amenitiesService: AmenitiesService) {}

  @Get()
  @Render('amenities/list')
  async list(
    @Query('page') page?: string,
    @Query('search') search?: string,
  ) {
    const pageNum = parseInt(page || '1', 10);
    const limit = 10;

    const result = await this.amenitiesService.findAll(pageNum, limit, search);

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
      title: 'Amenities',
      amenities: result.data,
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
      },
    };
  }

  @Get('create')
  @Render('amenities/create')
  createForm() {
    return { title: 'Create Amenity' };
  }

  @Post()
  async create(@Body() createDto: CreateAmenityDto, @Res() res: Response) {
    try {
      await this.amenitiesService.create(createDto);
      return res.redirect('/amenities?success=Amenity created successfully');
    } catch (error) {
      return res.redirect('/amenities/create?error=' + encodeURIComponent(error.message));
    }
  }

  @Get(':id')
  @Render('amenities/view')
  async view(@Param('id', ParseIntPipe) id: number) {
    const amenity = await this.amenitiesService.findOne(id);
    return { title: amenity.name, amenity };
  }

  @Get(':id/edit')
  @Render('amenities/edit')
  async editForm(@Param('id', ParseIntPipe) id: number) {
    const amenity = await this.amenitiesService.findOne(id);
    return { title: `Edit ${amenity.name}`, amenity };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateAmenityDto,
    @Res() res: Response,
  ) {
    try {
      await this.amenitiesService.update(id, updateDto);
      return res.redirect(`/amenities/${id}?success=Amenity updated successfully`);
    } catch (error) {
      return res.redirect(`/amenities/${id}/edit?error=` + encodeURIComponent(error.message));
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    try {
      await this.amenitiesService.remove(id);
      if (res.req.headers['hx-request']) {
        return res.status(HttpStatus.OK).send('');
      }
      return res.redirect('/amenities?success=Amenity deleted successfully');
    } catch (error) {
      if (res.req.headers['hx-request']) {
        return res.status(HttpStatus.BAD_REQUEST).send(error.message);
      }
      return res.redirect('/amenities?error=' + encodeURIComponent(error.message));
    }
  }
}

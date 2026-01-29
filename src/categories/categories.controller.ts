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
import { CategoriesService } from './categories.service';
import type {
  CreateCategoryDto,
  UpdateCategoryDto,
} from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @Render('categories/list')
  async list(
    @Query('page') page?: string,
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    const pageNum = parseInt(page || '1', 10);
    const limit = 10;

    const result = await this.categoriesService.findAll(
      pageNum,
      limit,
      search,
      status,
    );

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
      title: 'Categories',
      categories: result.data,
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
        status: status || '',
      },
    };
  }

  @Get('create')
  @Render('categories/create')
  createForm() {
    return {
      title: 'Create Category',
    };
  }

  @Post()
  async create(@Body() createDto: CreateCategoryDto, @Res() res: Response) {
    try {
      await this.categoriesService.create(createDto);
      return res.redirect(
        '/categories?success=Category created successfully',
      );
    } catch (error) {
      return res.redirect(
        '/categories/create?error=' + encodeURIComponent(error.message),
      );
    }
  }

  @Get(':id')
  @Render('categories/view')
  async view(@Param('id', ParseIntPipe) id: number) {
    const category = await this.categoriesService.findOne(id);
    const subcategories = await this.categoriesService.getSubcategories(id);

    return {
      title: category.name,
      category,
      subcategories,
    };
  }

  @Get(':id/edit')
  @Render('categories/edit')
  async editForm(@Param('id', ParseIntPipe) id: number) {
    const category = await this.categoriesService.findOne(id);

    return {
      title: `Edit ${category.name}`,
      category,
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateCategoryDto,
    @Res() res: Response,
  ) {
    try {
      await this.categoriesService.update(id, updateDto);
      return res.redirect(
        `/categories/${id}?success=Category updated successfully`,
      );
    } catch (error) {
      return res.redirect(
        `/categories/${id}/edit?error=` + encodeURIComponent(error.message),
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    try {
      await this.categoriesService.remove(id);
      if (res.req.headers['hx-request']) {
        return res.status(HttpStatus.OK).send('');
      }
      return res.redirect(
        '/categories?success=Category deleted successfully',
      );
    } catch (error) {
      if (res.req.headers['hx-request']) {
        return res.status(HttpStatus.BAD_REQUEST).send(error.message);
      }
      return res.redirect(
        '/categories?error=' + encodeURIComponent(error.message),
      );
    }
  }
}

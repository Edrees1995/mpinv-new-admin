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
import { SubcategoriesService } from './subcategories.service';
import type {
  CreateSubcategoryDto,
  UpdateSubcategoryDto,
} from './subcategories.service';

@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) {}

  @Get()
  @Render('subcategories/list')
  async list(
    @Query('page') page?: string,
    @Query('search') search?: string,
    @Query('category_id') categoryId?: string,
  ) {
    const pageNum = parseInt(page || '1', 10);
    const limit = 10;
    const categoryIdNum = categoryId ? parseInt(categoryId, 10) : undefined;

    const result = await this.subcategoriesService.findAll(
      pageNum,
      limit,
      search,
      categoryIdNum,
    );

    const categories = await this.subcategoriesService.getAllCategories();

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
      title: 'Subcategories',
      subcategories: result.data,
      categories,
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
        category_id: categoryIdNum,
      },
    };
  }

  @Get('create')
  @Render('subcategories/create')
  async createForm() {
    const categories = await this.subcategoriesService.getAllCategories();
    return {
      title: 'Create Subcategory',
      categories,
    };
  }

  @Post()
  async create(@Body() createDto: CreateSubcategoryDto, @Res() res: Response) {
    try {
      if (createDto.category_id) {
        createDto.category_id = Number(createDto.category_id);
      }
      await this.subcategoriesService.create(createDto);
      return res.redirect('/subcategories?success=Subcategory created successfully');
    } catch (error) {
      return res.redirect('/subcategories/create?error=' + encodeURIComponent(error.message));
    }
  }

  @Get(':id')
  @Render('subcategories/view')
  async view(@Param('id', ParseIntPipe) id: number) {
    const subcategory = await this.subcategoriesService.findOne(id);
    return {
      title: subcategory.name,
      subcategory,
    };
  }

  @Get(':id/edit')
  @Render('subcategories/edit')
  async editForm(@Param('id', ParseIntPipe) id: number) {
    const subcategory = await this.subcategoriesService.findOne(id);
    const categories = await this.subcategoriesService.getAllCategories();
    return {
      title: `Edit ${subcategory.name}`,
      subcategory,
      categories,
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateSubcategoryDto,
    @Res() res: Response,
  ) {
    try {
      if (updateDto.category_id) {
        updateDto.category_id = Number(updateDto.category_id);
      }
      await this.subcategoriesService.update(id, updateDto);
      return res.redirect(`/subcategories/${id}?success=Subcategory updated successfully`);
    } catch (error) {
      return res.redirect(`/subcategories/${id}/edit?error=` + encodeURIComponent(error.message));
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    try {
      await this.subcategoriesService.remove(id);
      if (res.req.headers['hx-request']) {
        return res.status(HttpStatus.OK).send('');
      }
      return res.redirect('/subcategories?success=Subcategory deleted successfully');
    } catch (error) {
      if (res.req.headers['hx-request']) {
        return res.status(HttpStatus.BAD_REQUEST).send(error.message);
      }
      return res.redirect('/subcategories?error=' + encodeURIComponent(error.message));
    }
  }
}

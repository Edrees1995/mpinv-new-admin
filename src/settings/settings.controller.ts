import {
  Controller,
  Get,
  Post,
  Delete,
  Query,
  Body,
  Render,
  Res,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  @Render('settings/list')
  async list() {
    const categories = await this.settingsService.getCategories();
    const totalSettings = categories.reduce((sum, c) => sum + c.count, 0);
    return {
      title: 'Settings',
      categories,
      totalSettings,
    };
  }

  @Get('category')
  @Render('settings/category')
  async viewCategory(
    @Query('name') category: string,
    @Query('search') search?: string,
  ) {
    const settings = await this.settingsService.getCategorySettings(
      category,
      search,
    );
    const label = this.settingsService.getCategoryLabel(category);
    return {
      title: label,
      category,
      categoryLabel: label,
      settings,
      totalSettings: settings.length,
      filters: { search: search || '' },
    };
  }

  @Post('update')
  async updateSetting(
    @Body('category') category: string,
    @Body('key') key: string,
    @Body('value') value: string,
    @Res() res,
  ) {
    const response = res as Response;
    try {
      await this.settingsService.updateSetting(category, key, value || '');
      if (response.req.headers['hx-request']) {
        return response.status(HttpStatus.OK).send('');
      }
      return response.redirect(
        `/settings/category?name=${encodeURIComponent(category)}`,
      );
    } catch (error) {
      if (response.req.headers['hx-request']) {
        return response.status(HttpStatus.BAD_REQUEST).send(error.message);
      }
      return response.redirect(
        `/settings/category?name=${encodeURIComponent(category)}&error=${encodeURIComponent(error.message)}`,
      );
    }
  }

  @Post('create')
  async createSetting(
    @Body('category') category: string,
    @Body('key') key: string,
    @Body('value') value: string,
    @Res() res,
  ) {
    const response = res as Response;
    try {
      await this.settingsService.createSetting(category, key, value || '');
      return response.redirect(
        `/settings/category?name=${encodeURIComponent(category)}`,
      );
    } catch (error) {
      return response.redirect(
        `/settings/category?name=${encodeURIComponent(category)}&error=${encodeURIComponent(error.message)}`,
      );
    }
  }

  @Delete('delete')
  async removeSetting(
    @Body('category') category: string,
    @Body('key') key: string,
    @Res() res,
  ) {
    const response = res as Response;
    try {
      await this.settingsService.removeSetting(category, key);
      if (response.req.headers['hx-request']) {
        return response.status(HttpStatus.OK).send('');
      }
      return response.redirect(
        `/settings/category?name=${encodeURIComponent(category)}`,
      );
    } catch (error) {
      if (response.req.headers['hx-request']) {
        return response.status(HttpStatus.BAD_REQUEST).send(error.message);
      }
      return response.redirect(
        `/settings/category?name=${encodeURIComponent(category)}&error=${encodeURIComponent(error.message)}`,
      );
    }
  }
}

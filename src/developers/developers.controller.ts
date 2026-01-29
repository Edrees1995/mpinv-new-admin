import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  Render,
  Res,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import { DevelopersService } from './developers.service';
import type { DeveloperFilters } from './developers.service';

// HTML escape function to prevent XSS
function escapeHtml(text: string | null | undefined): string {
  if (!text) return '';
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return String(text).replace(/[&<>"']/g, (char) => htmlEntities[char]);
}

@Controller('developers')
export class DevelopersController {
  constructor(private readonly developersService: DevelopersService) {}

  @Get()
  @Render('developers/list')
  async list(@Query() query: DeveloperFilters) {
    const page = query.page ? parseInt(String(query.page), 10) : 1;
    const limit = query.limit ? parseInt(String(query.limit), 10) : 20;

    const result = await this.developersService.findAll({
      ...query,
      page,
      limit,
    });

    // Generate truncated pagination array for template
    const pages: Array<{
      number: number;
      active: boolean;
      ellipsis?: boolean;
    }> = [];
    const total = result.totalPages;
    const current = result.page;

    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push({ number: i, active: i === current });
      }
    } else {
      // Always show first page
      pages.push({ number: 1, active: current === 1 });

      if (current > 3) {
        pages.push({ number: 0, active: false, ellipsis: true });
      }

      // Pages around current
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);
      for (let i = start; i <= end; i++) {
        pages.push({ number: i, active: i === current });
      }

      if (current < total - 2) {
        pages.push({ number: 0, active: false, ellipsis: true });
      }

      // Always show last page
      pages.push({ number: total, active: current === total });
    }

    return {
      title: 'Developers',
      developers: result.data,
      pagination: {
        ...result,
        pages,
        hasPrev: result.page > 1,
        hasNext: result.page < result.totalPages,
        prevPage: result.page - 1,
        nextPage: result.page + 1,
      },
      filters: {
        search: query.search || '',
        status: query.status || '',
        featured: query.featured || '',
      },
    };
  }

  @Get('create')
  @Render('developers/create')
  createForm() {
    return {
      title: 'Create Developer',
    };
  }

  @Get(':id')
  @Render('developers/view')
  async view(@Param('id', ParseIntPipe) id: number) {
    const developer = await this.developersService.findOne(id);

    return {
      title: developer.name,
      developer,
    };
  }

  @Get(':id/edit')
  @Render('developers/edit')
  async editForm(@Param('id', ParseIntPipe) id: number) {
    const developer = await this.developersService.findOne(id);

    return {
      title: `Edit ${developer.name}`,
      developer,
    };
  }

  @Post()
  async create(@Body() body: any, @Res() res: Response) {
    const slug = body.slug || this.developersService.generateSlug(body.name);

    await this.developersService.create({
      name: body.name,
      description: body.description,
      logo: body.logo,
      website: body.website,
      slug,
      featured: body.featured || undefined,
      priority: body.priority ? parseInt(body.priority, 10) : undefined,
      phone: body.phone,
      email: body.email,
      address: body.address,
      show_on_home: body.show_on_home || undefined,
      status: body.status || 'A',
    });

    // Check if it's an HTMX request
    if (res.req.headers['hx-request']) {
      res.set('HX-Redirect', '/developers');
      return res.status(HttpStatus.OK).send();
    }

    return res.redirect('/developers');
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
    @Res() res: Response,
  ) {
    const slug =
      body.slug || this.developersService.generateSlug(body.name);

    await this.developersService.update(id, {
      name: body.name,
      description: body.description,
      logo: body.logo,
      website: body.website,
      slug,
      featured: body.featured || undefined,
      priority: body.priority ? parseInt(body.priority, 10) : undefined,
      phone: body.phone,
      email: body.email,
      address: body.address,
      show_on_home: body.show_on_home || undefined,
      status: body.status || 'A',
    });

    // Check if it's an HTMX request
    if (res.req.headers['hx-request']) {
      res.set('HX-Redirect', '/developers');
      return res.status(HttpStatus.OK).send();
    }

    return res.redirect('/developers');
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    await this.developersService.delete(id);

    // Check if it's an HTMX request
    if (res.req.headers['hx-request']) {
      res.set('HX-Redirect', '/developers');
      return res.status(HttpStatus.OK).send();
    }

    return res.redirect('/developers');
  }

  // API endpoints for HTMX
  @Get('api/search')
  async search(@Query() query: DeveloperFilters, @Res() res: Response) {
    const page = query.page ? parseInt(String(query.page), 10) : 1;
    const limit = query.limit ? parseInt(String(query.limit), 10) : 20;

    const result = await this.developersService.findAll({
      ...query,
      page,
      limit,
    });

    // Return partial HTML for HTMX
    let html = '';

    if (result.data.length === 0) {
      html = `
        <tr>
          <td colspan="7" class="px-6 py-12 text-center text-gray-500">
            No developers found matching your criteria.
          </td>
        </tr>
      `;
    } else {
      result.data.forEach((developer) => {
        const safeName = escapeHtml(developer.name);
        const safeLogo = escapeHtml(developer.logo);
        const safeEmail = escapeHtml(developer.email);
        const safePhone = escapeHtml(developer.phone);

        html += `
          <tr class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                ${
                  developer.logo
                    ? `<img src="${safeLogo}" alt="${safeName}" class="w-10 h-10 rounded-lg object-cover mr-3" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                       <div class="w-10 h-10 bg-purple-100 rounded-lg items-center justify-center mr-3" style="display:none">
                        <span class="text-purple-600 font-medium">${escapeHtml(developer.name?.charAt(0))}</span>
                       </div>`
                    : `<div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                        <span class="text-purple-600 font-medium">${escapeHtml(developer.name?.charAt(0))}</span>
                      </div>`
                }
                <div>
                  <a href="/developers/${developer.id}" class="font-medium text-gray-900 hover:text-purple-600">${safeName}</a>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              ${safeEmail || '-'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              ${safePhone || '-'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 py-1 text-xs font-medium rounded-full ${
                developer.status === 'A'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }">
                ${developer.status === 'A' ? 'Active' : 'Inactive'}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 py-1 text-xs font-medium rounded-full ${
                developer.featured === '1'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-gray-100 text-gray-600'
              }">
                ${developer.featured === '1' ? 'Featured' : 'Regular'}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              ${developer.projects?.length || 0}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div class="flex items-center justify-end space-x-2">
                <a href="/developers/${developer.id}" class="text-blue-600 hover:text-blue-800" title="View">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                </a>
                <a href="/developers/${developer.id}/edit" class="text-yellow-600 hover:text-yellow-800" title="Edit">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </a>
                <button
                  hx-delete="/developers/${developer.id}"
                  hx-confirm="Are you sure you want to delete ${safeName}?"
                  class="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        `;
      });
    }

    res.set('Content-Type', 'text/html');
    return res.send(html);
  }
}

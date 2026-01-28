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
import { ProjectsService } from './projects.service';
import type { CreateProjectDto, UpdateProjectDto } from './projects.service';

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

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @Render('projects/list')
  async list(
    @Query('page') page?: string,
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    const pageNum = parseInt(page || '1', 10);
    const result = await this.projectsService.findAll(pageNum, 12, search, status);
    const stats = await this.projectsService.getStats();

    return {
      title: 'Offplan Projects',
      projects: result.data,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
        hasNext: result.page < result.totalPages,
        hasPrev: result.page > 1,
      },
      stats,
      filters: {
        search: search || '',
        status: status || '',
      },
    };
  }

  @Get('create')
  @Render('projects/create')
  async createForm() {
    const developers = await this.projectsService.getAllDevelopers();

    return {
      title: 'Create Project',
      developers,
    };
  }

  @Get(':id')
  @Render('projects/view')
  async view(@Param('id', ParseIntPipe) id: number) {
    const project = await this.projectsService.findOne(id);

    // Parse JSON fields if they exist
    let listData: unknown = null;
    let propertyData: unknown = null;

    try {
      if (project.list) {
        listData = JSON.parse(project.list);
      }
    } catch {
      listData = project.list;
    }

    try {
      if (project.property) {
        propertyData = JSON.parse(project.property);
      }
    } catch {
      propertyData = project.property;
    }

    return {
      title: project.name,
      project,
      listData,
      propertyData,
    };
  }

  @Get(':id/edit')
  @Render('projects/edit')
  async editForm(@Param('id', ParseIntPipe) id: number) {
    const project = await this.projectsService.findOne(id);
    const developers = await this.projectsService.getAllDevelopers();

    return {
      title: `Edit ${project.name}`,
      project,
      developers,
    };
  }

  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @Res() res: Response,
  ) {
    try {
      const project = await this.projectsService.create(createProjectDto);

      // Check if this is an HTMX request
      if (res.req.headers['hx-request']) {
        res.setHeader('HX-Redirect', `/projects/${project.id}`);
        return res.status(HttpStatus.OK).send();
      }

      return res.redirect(`/projects/${project.id}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      // If HTMX request, return error message
      if (res.req.headers['hx-request']) {
        return res.status(HttpStatus.BAD_REQUEST).send(`
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error creating project: ${errorMessage}
          </div>
        `);
      }

      return res.redirect('/projects/create?error=1');
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
    @Res() res: Response,
  ) {
    try {
      await this.projectsService.update(id, updateProjectDto);

      // Check if this is an HTMX request
      if (res.req.headers['hx-request']) {
        res.setHeader('HX-Redirect', `/projects/${id}`);
        return res.status(HttpStatus.OK).send();
      }

      return res.redirect(`/projects/${id}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      if (res.req.headers['hx-request']) {
        return res.status(HttpStatus.BAD_REQUEST).send(`
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error updating project: ${errorMessage}
          </div>
        `);
      }

      return res.redirect(`/projects/${id}/edit?error=1`);
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    try {
      await this.projectsService.remove(id);

      // Check if this is an HTMX request
      if (res.req.headers['hx-request']) {
        res.setHeader('HX-Redirect', '/projects');
        return res.status(HttpStatus.OK).send();
      }

      return res.redirect('/projects');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      if (res.req.headers['hx-request']) {
        return res.status(HttpStatus.BAD_REQUEST).send(`
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error deleting project: ${errorMessage}
          </div>
        `);
      }

      return res.redirect('/projects?error=1');
    }
  }

  // API endpoint for HTMX partial updates
  @Get('api/list')
  async apiList(
    @Query('page') page?: string,
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Res() res?: Response,
  ) {
    const pageNum = parseInt(page || '1', 10);
    const result = await this.projectsService.findAll(pageNum, 12, search, status);

    // Return just the table rows for HTMX updates
    let html = '';
    for (const project of result.data) {
      const safeName = escapeHtml(project.name);
      const safeImage = escapeHtml(project.featured_image);
      const safeDeveloperName = escapeHtml(project.developer?.name);

      html += `
        <tr class="hover:bg-gray-50">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                ${project.featured_image ? `<img src="${safeImage}" alt="${safeName}" class="w-full h-full object-cover">` : ''}
              </div>
              <div class="ml-4">
                <div class="text-sm font-medium text-gray-900">${safeName}</div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="text-sm text-gray-600">${safeDeveloperName || 'N/A'}</span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 py-1 text-xs font-medium rounded-full ${
              project.status === 'A'
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'
            }">
              ${project.status === 'A' ? 'Active' : 'Inactive'}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            ${project.created_at ? new Date(project.created_at).toLocaleDateString() : 'N/A'}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <a href="/projects/${project.id}" class="text-blue-600 hover:text-blue-900 mr-3">View</a>
            <a href="/projects/${project.id}/edit" class="text-indigo-600 hover:text-indigo-900 mr-3">Edit</a>
            <button
              hx-delete="/projects/${project.id}"
              hx-confirm="Are you sure you want to delete ${safeName}?"
              hx-target="closest tr"
              hx-swap="outerHTML"
              class="text-red-600 hover:text-red-900"
            >Delete</button>
          </td>
        </tr>
      `;
    }

    return res?.send(html);
  }
}

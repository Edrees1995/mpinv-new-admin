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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import type { Response } from 'express';
import { ProjectsService } from './projects.service';
import type { CreateProjectDto, UpdateProjectDto } from './projects.service';

// Configure multer storage for property type images - NEW ADMIN SEPARATE
const propertyTypeStorage = diskStorage({
  destination: '/var/www/new-admin.mpinv.cloud/public/uploads/ads',
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname).toLowerCase();
    callback(null, `pt_${uniqueSuffix}${ext}`);
  },
});

// New admin image base URL
const NEW_ADMIN_IMAGE_URL = 'https://new-admin.mpinv.cloud/uploads/ads/';

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
    @Query('featured') featured?: string,
  ) {
    const pageNum = parseInt(page || '1', 10);
    const result = await this.projectsService.findAll(pageNum, 12, search, status, featured);
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
        featured: featured || '',
      },
    };
  }

  @Get('trashed')
  @Render('projects/trashed')
  async trashed(@Query('page') page?: string) {
    const pageNum = parseInt(page || '1', 10);
    const result = await this.projectsService.findTrashed(pageNum, 12);

    return {
      title: 'Trashed Projects',
      projects: result.data,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
        hasNext: result.page < result.totalPages,
        hasPrev: result.page > 1,
      },
    };
  }

  @Get('create')
  @Render('projects/create')
  async createForm() {
    const [developers, communities, subCommunities, categories, subcategories] = await Promise.all([
      this.projectsService.getAllDevelopers(),
      this.projectsService.getAllCommunities(),
      this.projectsService.getAllSubCommunities(),
      this.projectsService.getAllCategories(),
      this.projectsService.getAllSubcategories(),
    ]);

    return {
      title: 'Create Project',
      developers,
      communities,
      subCommunities,
      categories,
      subcategories,
    };
  }

  @Get('verify')
  @Render('projects/verify')
  async verify(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = parseInt(page || '1', 10);
    const limitNum = parseInt(limit || '10', 10);
    const result = await this.projectsService.findAll(pageNum, limitNum);

    // Calculate field completeness for each project
    const fieldsToCheck = [
      'name', 'slug', 'description', 'featured_image', 'price', 'bedrooms', 'bathrooms',
      'size', 'developer_id', 'community_id', 'sub_community_id', 'latitude', 'longitude',
      'handover_date', 'completion_year', 'project_status', 'category_id', 'sub_category_id',
      'type_of_project', 'off_plan', 'listing_type', 'launch_date', 'possession',
      'completion_date', 'sale_status', 'pay_plan', 'payment_plan', 'rera', 'ref_no',
      'agent_name', 'agent_phone', 'agent_email', 'meta_title', 'meta_description',
      'bg_img', 'parking', 'furnished',
    ];

    const projectsWithCompleteness = result.data.map((project: any) => {
      let filled = 0;
      for (const field of fieldsToCheck) {
        if (project[field] !== null && project[field] !== undefined && project[field] !== '') {
          filled++;
        }
      }
      const completeness = Math.round((filled / fieldsToCheck.length) * 100);
      return { ...project, completeness };
    });

    return {
      title: 'Verify Projects',
      projects: projectsWithCompleteness,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
        hasNext: result.page < result.totalPages,
        hasPrev: result.page > 1,
      },
    };
  }

  @Get(':id/compare')
  @Render('projects/compare')
  async compare(@Param('id', ParseIntPipe) id: number) {
    const project = await this.projectsService.findOne(id);

    return {
      title: `Compare: ${project.name}`,
      project,
      slug: project.slug,
    };
  }

  @Get(':id')
  @Render('projects/view')
  async view(@Param('id', ParseIntPipe) id: number) {
    const project = await this.projectsService.findOne(id);

    // Parse highlights JSON if exists
    let highlightsData: unknown = null;
    try {
      if (project.highlights) {
        highlightsData = JSON.parse(project.highlights);
      }
    } catch {
      highlightsData = project.highlights;
    }

    // Parse payment_plan JSON if exists
    let paymentPlanData: unknown = null;
    try {
      if (project.payment_plan) {
        paymentPlanData = JSON.parse(project.payment_plan);
      }
    } catch {
      paymentPlanData = project.payment_plan;
    }

    return {
      title: project.name,
      project,
      highlightsData,
      paymentPlanData,
    };
  }

  @Get(':id/edit')
  @Render('projects/edit')
  async editForm(@Param('id', ParseIntPipe) id: number) {
    const [project, developers, communities, subCommunities, categories, subcategories] = await Promise.all([
      this.projectsService.findOne(id),
      this.projectsService.getAllDevelopers(),
      this.projectsService.getAllCommunities(),
      this.projectsService.getAllSubCommunities(),
      this.projectsService.getAllCategories(),
      this.projectsService.getAllSubcategories(),
    ]);

    return {
      title: `Edit ${project.name}`,
      project,
      developers,
      communities,
      subCommunities,
      categories,
      subcategories,
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
            Error creating project: ${escapeHtml(errorMessage)}
          </div>
        `);
      }

      return res.redirect('/projects/create?error=1');
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
    @Res() res: Response,
  ) {
    try {
      // Extract property types from body
      const { propertyTypes, ...updateProjectDto } = body;

      // Update the project
      await this.projectsService.update(id, updateProjectDto as UpdateProjectDto);

      // Update property types if provided
      if (propertyTypes) {
        await this.projectsService.updatePropertyTypes(id, propertyTypes);
      }

      // Check if this is an HTMX request
      if (res.req.headers['hx-request']) {
        return res.status(HttpStatus.OK).send(`
          <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Project updated successfully!
          </div>
        `);
      }

      return res.redirect(`/projects/${id}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      if (res.req.headers['hx-request']) {
        return res.status(HttpStatus.BAD_REQUEST).send(`
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error updating project: ${escapeHtml(errorMessage)}
          </div>
        `);
      }

      return res.redirect(`/projects/${id}/edit?error=1`);
    }
  }

  @Delete('property-types/:id')
  async deletePropertyType(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    try {
      await this.projectsService.deletePropertyType(id);
      return res.status(HttpStatus.OK).json({ success: true });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: errorMessage,
      });
    }
  }

  @Post('property-types/upload')
  @UseInterceptors(FileInterceptor('file', { storage: propertyTypeStorage }))
  async uploadPropertyTypeImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('propertyTypeId') propertyTypeId: string,
    @Body('imageType') imageType: string,
    @Res() res: Response,
  ) {
    try {
      if (!file) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          error: 'No file uploaded',
        });
      }

      // If propertyTypeId is provided and not empty, update the database
      if (propertyTypeId && propertyTypeId !== '' && propertyTypeId !== 'undefined') {
        await this.projectsService.updatePropertyTypeImage(
          parseInt(propertyTypeId),
          imageType,
          file.filename,
        );
      }

      return res.status(HttpStatus.OK).json({
        success: true,
        filename: file.filename,
        fullUrl: NEW_ADMIN_IMAGE_URL + file.filename,
        originalName: file.originalname,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: errorMessage,
      });
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
            Error deleting project: ${escapeHtml(errorMessage)}
          </div>
        `);
      }

      return res.redirect('/projects?error=1');
    }
  }

  @Post(':id/restore')
  async restore(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    try {
      await this.projectsService.restore(id);

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
            Error restoring project: ${escapeHtml(errorMessage)}
          </div>
        `);
      }

      return res.redirect('/projects/trashed?error=1');
    }
  }

  // API endpoint for HTMX partial updates
  @Get('api/list')
  async apiList(
    @Query('page') page?: string,
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('featured') featured?: string,
    @Res() res?: Response,
  ) {
    const pageNum = parseInt(page || '1', 10);
    const result = await this.projectsService.findAll(pageNum, 12, search, status, featured);

    // Return just the table rows for HTMX updates
    let html = '';
    for (const project of result.data) {
      const safeName = escapeHtml(project.name);
      const safeImage = escapeHtml(project.featured_image);
      const safeDeveloperName = escapeHtml(project.developer_name || project.developer?.name);

      html += `
        <tr class="hover:bg-gray-50">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                ${project.featured_image ? `<img src="${safeImage}" alt="${safeName}" class="w-full h-full object-cover">` : ''}
              </div>
              <div class="ml-4">
                <div class="text-sm font-medium text-gray-900">${safeName}</div>
                ${project.featured === 'Y' ? '<span class="text-xs text-yellow-600">Featured</span>' : ''}
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

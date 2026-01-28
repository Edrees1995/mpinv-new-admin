import { Controller, Get, Param, Query, Render, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { PropertiesService, PropertyFilters } from './properties.service';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Get()
  @Render('properties/list')
  async list(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Query('search') search?: string,
    @Query('category_id') categoryId?: string,
    @Query('subcategory_id') subcategoryId?: string,
    @Query('community_id') communityId?: string,
    @Query('purpose') purpose?: string,
    @Query('status') status?: string,
  ) {
    const filters: PropertyFilters = {
      search,
      category_id: categoryId ? parseInt(categoryId, 10) : undefined,
      subcategory_id: subcategoryId ? parseInt(subcategoryId, 10) : undefined,
      community_id: communityId ? parseInt(communityId, 10) : undefined,
      purpose,
      status,
    };

    const [result, categories, subcategories, communities] = await Promise.all([
      this.propertiesService.findAll(page, limit, filters),
      this.propertiesService.getCategories(),
      this.propertiesService.getSubcategories(),
      this.propertiesService.getCommunities(),
    ]);

    // Format properties for display
    const properties = result.data.map((property) => ({
      ...property,
      formattedPrice: this.propertiesService.formatPrice(Number(property.price)),
      purposeLabel: this.propertiesService.getPurposeLabel(property.purpose),
      statusLabel: this.propertiesService.getStatusLabel(property.status),
      isActive: property.status === 'A',
    }));

    // Generate pagination range
    const paginationRange = this.generatePaginationRange(
      result.page,
      result.totalPages,
    );

    return {
      title: 'Properties',
      properties,
      pagination: {
        ...result,
        hasPrev: page > 1,
        hasNext: page < result.totalPages,
        prevPage: page - 1,
        nextPage: page + 1,
        range: paginationRange,
      },
      filters: {
        search: search || '',
        category_id: categoryId || '',
        subcategory_id: subcategoryId || '',
        community_id: communityId || '',
        purpose: purpose || '',
        status: status || '',
      },
      categories,
      subcategories,
      communities,
      bitrixNote: 'Properties are synced from Bitrix24 XML feeds. This is a read-only view.',
    };
  }

  @Get(':id')
  @Render('properties/view')
  async view(@Param('id', ParseIntPipe) id: number) {
    const property = await this.propertiesService.findOne(id);

    if (!property) {
      return {
        title: 'Property Not Found',
        error: 'The requested property was not found.',
        property: null,
      };
    }

    const [images, amenities] = await Promise.all([
      this.propertiesService.getPropertyImages(id),
      this.propertiesService.getPropertyAmenities(id),
    ]);

    // Format property for display
    const formattedProperty = {
      ...property,
      formattedPrice: this.propertiesService.formatPrice(Number(property.price)),
      purposeLabel: this.propertiesService.getPurposeLabel(property.purpose),
      statusLabel: this.propertiesService.getStatusLabel(property.status),
      isActive: property.status === 'A',
      formattedDate: property.created_at
        ? new Date(property.created_at).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })
        : 'N/A',
    };

    // Get featured image
    const featuredImage = images.find((img) => img.is_featured === 1) || images[0];

    return {
      title: property.title,
      property: formattedProperty,
      images,
      featuredImage,
      amenities: amenities.map((pa) => pa.amenity).filter(Boolean),
      bitrixNote: 'This property is synced from Bitrix24. Editing is disabled.',
    };
  }

  private generatePaginationRange(
    currentPage: number,
    totalPages: number,
  ): Array<{ page: number; isCurrent: boolean } | { isEllipsis: boolean }> {
    const range: Array<{ page: number; isCurrent: boolean } | { isEllipsis: boolean }> = [];
    const delta = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push({ page: i, isCurrent: i === currentPage });
      } else if (range.length > 0 && !('isEllipsis' in range[range.length - 1])) {
        range.push({ isEllipsis: true });
      }
    }

    return range;
  }
}

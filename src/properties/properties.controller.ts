import {
  Controller,
  Get,
  Param,
  Query,
  Render,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
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
    @Query('property_type') propertyType?: string,
    @Query('offering_type') offeringType?: string,
    @Query('city') city?: string,
    @Query('community') community?: string,
    @Query('bedrooms') bedrooms?: string,
  ) {
    const filters: PropertyFilters = {
      search,
      property_type: propertyType,
      offering_type: offeringType,
      city,
      community,
      bedrooms,
    };

    const [result, filterOptions] = await Promise.all([
      this.propertiesService.findAll(page, limit, filters),
      this.propertiesService.getFilterOptions(),
    ]);

    // Format properties for display
    const properties = result.data.map((property) => ({
      ...property,
      formattedPrice: this.propertiesService.formatPrice(property.price),
      photos: this.propertiesService.getPhotos(property),
      firstPhoto: this.propertiesService.getPhotos(property)[0] || null,
    }));

    // Generate truncated pagination array
    const pages: Array<{
      number: number;
      active: boolean;
      ellipsis?: boolean;
    }> = [];
    const totalPg = result.totalPages;
    const current = result.page;

    if (totalPg <= 7) {
      for (let i = 1; i <= totalPg; i++) {
        pages.push({ number: i, active: i === current });
      }
    } else {
      pages.push({ number: 1, active: current === 1 });
      if (current > 3) {
        pages.push({ number: 0, active: false, ellipsis: true });
      }
      const start = Math.max(2, current - 1);
      const end = Math.min(totalPg - 1, current + 1);
      for (let i = start; i <= end; i++) {
        pages.push({ number: i, active: i === current });
      }
      if (current < totalPg - 2) {
        pages.push({ number: 0, active: false, ellipsis: true });
      }
      pages.push({ number: totalPg, active: current === totalPg });
    }

    return {
      title: 'Properties (Bitrix)',
      properties,
      pagination: {
        ...result,
        pages,
        hasPrev: page > 1,
        hasNext: page < result.totalPages,
        prevPage: page - 1,
        nextPage: page + 1,
      },
      filters: {
        search: search || '',
        property_type: propertyType || '',
        offering_type: offeringType || '',
        city: city || '',
        community: community || '',
        bedrooms: bedrooms || '',
      },
      filterOptions,
      bitrixNote:
        'Properties are fetched live from Bitrix24 XML feed. This is a read-only view.',
    };
  }

  @Get(':ref')
  @Render('properties/view')
  async view(@Param('ref') ref: string) {
    const property = await this.propertiesService.findOne(ref);

    if (!property) {
      return {
        title: 'Property Not Found',
        error: 'The requested property was not found.',
        property: null,
      };
    }

    const photos = this.propertiesService.getPhotos(property);
    const floorPlans = this.propertiesService.getFloorPlans(property);
    const amenities = this.propertiesService.getAmenities(property);

    // Format property for display
    const formattedProperty = {
      ...property,
      formattedPrice: this.propertiesService.formatPrice(property.price),
      formattedSize: property.size ? `${property.size} sq.ft` : 'N/A',
      formattedPlotSize: property.plot_size
        ? `${property.plot_size} sq.ft`
        : null,
    };

    return {
      title: property.title_en,
      property: formattedProperty,
      photos,
      featuredPhoto: photos[0] || null,
      floorPlans,
      amenities,
      bitrixNote: 'This property is synced from Bitrix24. Editing is disabled.',
    };
  }

}

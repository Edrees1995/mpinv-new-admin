import { Injectable } from '@nestjs/common';
import { XMLParser } from 'fast-xml-parser';

const XML_FEED_URL = 'https://masterpiece.hirevam.com/Website.xml';
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes cache

export interface BitrixProperty {
  reference_number: string;
  permit_number?: string;
  offering_type: string;
  property_type: string;
  size: string;
  plot_size?: string;
  bedroom: string;
  bathroom: string;
  service_charge?: string;
  title_en: string;
  description_en: string;
  completion_status?: string;
  city: string;
  community: string;
  sub_community?: string;
  property_name?: string;
  developer?: string;
  floor?: string;
  parking?: string;
  furnished?: string;
  photo?: { url: string | string[] };
  floor_plan?: { url: string | string[] };
  agent?: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  private_amenities?: string;
  commercial_amenities?: string;
  price: string;
  last_update?: string;
}

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PropertyFilters {
  search?: string;
  property_type?: string;
  offering_type?: string;
  city?: string;
  community?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: string;
}

// In-memory cache
let cachedListings: BitrixProperty[] | null = null;
let cacheTimestamp: number = 0;

@Injectable()
export class PropertiesService {
  async fetchFromBitrix(): Promise<BitrixProperty[]> {
    const now = Date.now();

    // Return cached data if still valid
    if (cachedListings && now - cacheTimestamp < CACHE_TTL_MS) {
      return cachedListings;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(XML_FEED_URL, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`XML feed request failed: ${response.status}`);
      }

      const xmlData = await response.text();
      const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '',
        textNodeName: 'value',
        trimValues: true,
      });
      const parsedData = parser.parse(xmlData);

      let listings: BitrixProperty[] = [];
      if (parsedData?.list?.property) {
        listings = Array.isArray(parsedData.list.property)
          ? parsedData.list.property
          : [parsedData.list.property];
      }

      // Update cache
      cachedListings = listings;
      cacheTimestamp = now;

      return listings;
    } catch (error: any) {
      console.error('Failed to fetch from Bitrix:', error.message);

      // Return stale cache if available
      if (cachedListings) {
        return cachedListings;
      }

      return [];
    }
  }

  async findAll(
    page = 1,
    limit = 20,
    filters: PropertyFilters = {},
  ): Promise<PaginationResult<BitrixProperty>> {
    let listings = await this.fetchFromBitrix();

    // Apply filters
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      listings = listings.filter(
        (p) =>
          p.title_en?.toLowerCase().includes(searchLower) ||
          p.reference_number?.toLowerCase().includes(searchLower) ||
          p.property_name?.toLowerCase().includes(searchLower) ||
          p.community?.toLowerCase().includes(searchLower),
      );
    }

    if (filters.property_type) {
      listings = listings.filter(
        (p) =>
          p.property_type?.toLowerCase() === filters.property_type?.toLowerCase(),
      );
    }

    if (filters.offering_type) {
      const offeringLower = filters.offering_type.toLowerCase();
      listings = listings.filter((p) =>
        p.offering_type?.toLowerCase().includes(offeringLower),
      );
    }

    if (filters.city) {
      listings = listings.filter(
        (p) => p.city?.toLowerCase() === filters.city?.toLowerCase(),
      );
    }

    if (filters.community) {
      listings = listings.filter(
        (p) => p.community?.toLowerCase() === filters.community?.toLowerCase(),
      );
    }

    if (filters.bedrooms) {
      listings = listings.filter((p) => p.bedroom === filters.bedrooms);
    }

    if (filters.minPrice) {
      listings = listings.filter(
        (p) => parseFloat(p.price) >= filters.minPrice!,
      );
    }

    if (filters.maxPrice) {
      listings = listings.filter(
        (p) => parseFloat(p.price) <= filters.maxPrice!,
      );
    }

    // Calculate pagination
    const total = listings.length;
    const totalPages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;
    const data = listings.slice(skip, skip + limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages,
    };
  }

  async findOne(referenceNumber: string): Promise<BitrixProperty | null> {
    const listings = await this.fetchFromBitrix();
    return (
      listings.find((p) => p.reference_number === referenceNumber) || null
    );
  }

  async count(): Promise<number> {
    const listings = await this.fetchFromBitrix();
    return listings.length;
  }

  // Get unique values for filters
  async getFilterOptions(): Promise<{
    propertyTypes: string[];
    offeringTypes: string[];
    cities: string[];
    communities: string[];
    bedrooms: string[];
  }> {
    const listings = await this.fetchFromBitrix();

    const propertyTypes = [
      ...new Set(listings.map((p) => p.property_type).filter(Boolean)),
    ].sort();
    const offeringTypes = [
      ...new Set(listings.map((p) => p.offering_type).filter(Boolean)),
    ].sort();
    const cities = [
      ...new Set(listings.map((p) => p.city).filter(Boolean)),
    ].sort();
    const communities = [
      ...new Set(listings.map((p) => p.community).filter(Boolean)),
    ].sort();
    const bedrooms = [
      ...new Set(listings.map((p) => p.bedroom).filter(Boolean)),
    ].sort((a, b) => {
      if (a === 'Studio') return -1;
      if (b === 'Studio') return 1;
      return parseInt(a) - parseInt(b);
    });

    return {
      propertyTypes,
      offeringTypes,
      cities,
      communities,
      bedrooms,
    };
  }

  // Helper methods
  getPhotos(property: BitrixProperty): string[] {
    if (!property.photo?.url) return [];
    return Array.isArray(property.photo.url)
      ? property.photo.url
      : [property.photo.url];
  }

  getFloorPlans(property: BitrixProperty): string[] {
    if (!property.floor_plan?.url) return [];
    return Array.isArray(property.floor_plan.url)
      ? property.floor_plan.url
      : [property.floor_plan.url];
  }

  formatPrice(price: string | number): string {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (!numPrice || isNaN(numPrice)) return 'Price on Request';
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numPrice);
  }

  getAmenities(property: BitrixProperty): string[] {
    const amenities: string[] = [];
    if (property.private_amenities) {
      amenities.push(
        ...property.private_amenities.split(',').map((a) => a.trim()),
      );
    }
    if (property.commercial_amenities) {
      amenities.push(
        ...property.commercial_amenities.split(',').map((a) => a.trim()),
      );
    }
    return [...new Set(amenities)]; // Remove duplicates
  }

  clearCache(): void {
    cachedListings = null;
    cacheTimestamp = 0;
  }
}
